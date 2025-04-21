export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

export interface StateData {
  name: string;
  additionalRate?: number;
}

export interface CountryData {
  name: string;
  currency: string;
  symbol: string;
  brackets: TaxBracket[];
  states?: Record<string, StateData>;
}

export interface TaxCalculation {
  grossIncome: number;
  totalTax: number;
  netIncome: number;
  effectiveRate: number;
  breakdown: {
    bracket: TaxBracket;
    taxAmount: number;
  }[];
}

export interface TaxRecommendation {
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  timeframe: 'Immediate' | 'Long-term';
  difficulty: 'Easy' | 'Medium' | 'Complex';
}

export interface RecommendationCategory {
  title: string;
  recommendations: TaxRecommendation[];
}