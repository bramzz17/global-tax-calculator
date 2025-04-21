import {
  CountryData,
  TaxRecommendation,
  RecommendationCategory,
} from './types';

const getCommonRecommendations = (income: number): TaxRecommendation[] => [
  {
    title: 'Retirement Account Contributions',
    description:
      'Maximize contributions to tax-advantaged retirement accounts to reduce taxable income.',
    impact: 'High',
    timeframe: 'Immediate',
    difficulty: 'Easy',
  },
  {
    title: 'Tax-Loss Harvesting',
    description:
      'Consider selling investments at a loss to offset capital gains.',
    impact: 'Medium',
    timeframe: 'Immediate',
    difficulty: 'Complex',
  },
  {
    title: 'Charitable Donations',
    description:
      'Make charitable contributions to eligible organizations for tax deductions.',
    impact: 'Medium',
    timeframe: 'Immediate',
    difficulty: 'Easy',
  },
];

const getCountrySpecificRecommendations = (
  country: CountryData,
  income: number,
  state?: string
): TaxRecommendation[] => {
  const recommendations: TaxRecommendation[] = [];

  switch (country.name) {
    case 'United States':
      recommendations.push(
        {
          title: '401(k) Contributions',
          description:
            'Contribute to your 401(k) to reduce taxable income (2024 limit: $23,000).',
          impact: 'High',
          timeframe: 'Immediate',
          difficulty: 'Easy',
        },
        {
          title: 'IRA Contributions',
          description:
            'Consider traditional IRA contributions for additional tax deductions.',
          impact: 'Medium',
          timeframe: 'Immediate',
          difficulty: 'Easy',
        }
      );
      if (state === 'CA' || state === 'NY') {
        recommendations.push({
          title: 'State Tax Considerations',
          description:
            'Consider municipal bonds from your state for tax-free income at both federal and state levels.',
          impact: 'Medium',
          timeframe: 'Long-term',
          difficulty: 'Complex',
        });
      }
      break;

    case 'United Kingdom':
      recommendations.push(
        {
          title: 'ISA Utilization',
          description:
            'Maximize your ISA allowance (£20,000 for 2024/25) for tax-free savings and investments.',
          impact: 'High',
          timeframe: 'Immediate',
          difficulty: 'Easy',
        },
        {
          title: 'Pension Contributions',
          description:
            'Increase pension contributions to reduce taxable income.',
          impact: 'High',
          timeframe: 'Long-term',
          difficulty: 'Medium',
        }
      );
      break;

    case 'India':
      recommendations.push(
        {
          title: '80C Deductions',
          description:
            'Maximize Section 80C deductions through ELSS, PPF, or life insurance premiums.',
          impact: 'High',
          timeframe: 'Immediate',
          difficulty: 'Easy',
        },
        {
          title: 'NPS Investment',
          description:
            'Consider National Pension System (NPS) for additional tax benefits under Section 80CCD(1B).',
          impact: 'Medium',
          timeframe: 'Long-term',
          difficulty: 'Medium',
        }
      );
      break;

    case 'Canada':
      recommendations.push(
        {
          title: 'RRSP Contributions',
          description:
            'Contribute to your Registered Retirement Savings Plan (RRSP) to reduce taxable income.',
          impact: 'High',
          timeframe: 'Immediate',
          difficulty: 'Easy',
        },
        {
          title: 'TFSA Utilization',
          description:
            'Use your Tax-Free Savings Account (TFSA) for tax-free growth on investments.',
          impact: 'Medium',
          timeframe: 'Long-term',
          difficulty: 'Easy',
        }
      );
      break;

    case 'Australia':
      recommendations.push(
        {
          title: 'Superannuation Contributions',
          description:
            'Boost super contributions to benefit from tax concessions.',
          impact: 'High',
          timeframe: 'Immediate',
          difficulty: 'Medium',
        },
        {
          title: 'Franking Credits',
          description:
            'Use franking credits from dividends to reduce tax liability.',
          impact: 'Medium',
          timeframe: 'Long-term',
          difficulty: 'Complex',
        }
      );
      break;

    case 'Germany':
      recommendations.push({
        title: 'Riester Pension Plan',
        description:
          'Invest in Riester pension plans for tax advantages and government subsidies.',
        impact: 'Medium',
        timeframe: 'Long-term',
        difficulty: 'Medium',
      });
      break;

    case 'France':
      recommendations.push({
        title: 'PEA Account',
        description:
          'Invest through a Plan d\'Épargne en Actions (PEA) for tax-free capital gains after 5 years.',
        impact: 'Medium',
        timeframe: 'Long-term',
        difficulty: 'Medium',
      });
      break;

    case 'Italy':
      recommendations.push({
        title: 'PIR Investment Plan',
        description:
          'Utilize Piani Individuali di Risparmio (PIR) for tax-free capital gains after 5 years.',
        impact: 'Medium',
        timeframe: 'Long-term',
        difficulty: 'Medium',
      });
      break;

    case 'Japan':
      recommendations.push({
        title: 'NISA Accounts',
        description:
          'Invest via Nippon Individual Savings Accounts (NISA) for tax-free gains up to set limits.',
        impact: 'Medium',
        timeframe: 'Long-term',
        difficulty: 'Easy',
      });
      break;

    case 'South Korea':
      recommendations.push({
        title: 'ISA Account Usage',
        description:
          'Use Individual Savings Accounts (ISA) for tax exemption on capital gains.',
        impact: 'Medium',
        timeframe: 'Long-term',
        difficulty: 'Medium',
      });
      break;

    case 'Mexico':
      recommendations.push({
        title: 'Afore Retirement Fund',
        description:
          'Contribute to your Afore account for retirement savings with tax benefits.',
        impact: 'High',
        timeframe: 'Long-term',
        difficulty: 'Easy',
      });
      break;

    case 'Saudi Arabia':
    case 'United Arab Emirates':
    case 'Bahamas':
    case 'Andorra':
    case 'Bahrain':
      recommendations.push({
        title: 'No Personal Income Tax',
        description:
          'These countries do not levy personal income taxes, allowing tax-free salary income.',
        impact: 'High',
        timeframe: 'Immediate',
        difficulty: 'None',
      });
      break;

    case 'South Africa':
      recommendations.push({
        title: 'Retirement Annuity Contributions',
        description:
          'Contribute to retirement annuities to reduce your taxable income.',
        impact: 'High',
        timeframe: 'Immediate',
        difficulty: 'Easy',
      });
      break;

    case 'Brazil':
      recommendations.push({
        title: 'Previdência Privada (PGBL)',
        description:
          'Contribute to private pension plans (PGBL) for deductible contributions up to 12% of income.',
        impact: 'Medium',
        timeframe: 'Long-term',
        difficulty: 'Medium',
      });
      break;

    case 'China':
      recommendations.push({
        title: 'Tax-Free Allowances',
        description:
          'Utilize special tax deductions (e.g., housing, education, medical) available to residents.',
        impact: 'Medium',
        timeframe: 'Immediate',
        difficulty: 'Medium',
      });
      break;

    case 'Türkiye':
      recommendations.push({
        title: 'BES Contributions',
        description:
          'Contribute to the government-supported Private Pension System (BES) for state incentives.',
        impact: 'Medium',
        timeframe: 'Long-term',
        difficulty: 'Medium',
      });
      break;

    // Minimal placeholder recs for under-researched countries
    case 'Afghanistan':
    case 'Antigua and Barbuda':
    case 'Albania':
    case 'Armenia':
    case 'Angola':
    case 'Azerbaijan':
    case 'Algeria':
      recommendations.push({
        title: 'Basic Tax Compliance',
        description:
          'Ensure income is reported correctly and utilize any available local deductions.',
        impact: 'Low',
        timeframe: 'Immediate',
        difficulty: 'Easy',
      });
      break;
  }

  return recommendations;
};

export const getTaxRecommendations = (
  country: CountryData,
  income: number,
  state?: string
): RecommendationCategory[] => {
  const commonRecs = getCommonRecommendations(income);
  const countryRecs = getCountrySpecificRecommendations(country, income, state);

  const allRecs = [...commonRecs, ...countryRecs];

  return [
    {
      title: 'Immediate Actions',
      recommendations: allRecs.filter((rec) => rec.timeframe === 'Immediate'),
    },
    {
      title: 'Long-term Strategies',
      recommendations: allRecs.filter((rec) => rec.timeframe === 'Long-term'),
    },
  ];
};