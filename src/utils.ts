import { CountryData, TaxBracket, TaxCalculation } from './types';

export const formatCurrency = (amount: number, country: CountryData): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: country.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateTax = (
  income: number,
  country: CountryData,
  state?: string
): TaxCalculation => {
  let remainingIncome = income;
  let totalTax = 0;
  const breakdown: TaxCalculation['breakdown'] = [];

  for (const bracket of country.brackets) {
    const bracketMin = bracket.min;
    const bracketMax = bracket.max ?? Infinity;
    const bracketSize = bracketMax - bracketMin;
    
    const taxableInThisBracket = Math.min(
      Math.max(0, remainingIncome),
      bracketSize
    );
    
    const taxForBracket = (taxableInThisBracket * bracket.rate) / 100;
    
    if (taxableInThisBracket > 0) {
      breakdown.push({
        bracket,
        taxAmount: taxForBracket
      });
    }
    
    totalTax += taxForBracket;
    remainingIncome -= bracketSize;
    
    if (remainingIncome <= 0) break;
  }

  // Add state tax if applicable
  if (state && country.states?.[state]) {
    const stateTax = (income * country.states[state].additionalRate!) / 100;
    totalTax += stateTax;
    breakdown.push({
      bracket: { min: 0, max: null, rate: country.states[state].additionalRate! },
      taxAmount: stateTax
    });
  }

  return {
    grossIncome: income,
    totalTax,
    netIncome: income - totalTax,
    effectiveRate: (totalTax / income) * 100,
    breakdown
  };
};