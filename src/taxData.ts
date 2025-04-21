import { CountryData } from './types';

export const taxData: Record<string, CountryData> = {
  // Countries starting with A
  AD: {
    name: 'Andorra',
    currency: 'EUR',
    symbol: '€',
    brackets: [
      { min: 0, max: 24000, rate: 0 },
      { min: 24001, max: 40000, rate: 10 },
      { min: 40001, max: null, rate: 15 }
    ]
  },
  AF: {
    name: 'Afghanistan',
    currency: 'AFN',
    symbol: '؋',
    brackets: [
      { min: 0, max: 60000, rate: 2 },
      { min: 60001, max: 150000, rate: 10 },
      { min: 150001, max: 1200000, rate: 20 },
      { min: 1200001, max: null, rate: 32 }
    ]
  },
  AG: {
    name: 'Antigua and Barbuda',
    currency: 'XCD',
    symbol: '$',
    brackets: [
      { min: 0, max: 3000, rate: 0 },
      { min: 3001, max: 25000, rate: 10 },
      { min: 25001, max: 120000, rate: 25 },
      { min: 120001, max: null, rate: 30 }
    ]
  },
  AL: {
    name: 'Albania',
    currency: 'ALL',
    symbol: 'L',
    brackets: [
      { min: 0, max: 30000, rate: 0 },
      { min: 30001, max: 150000, rate: 13 },
      { min: 150001, max: null, rate: 23 }
    ]
  },
  AM: {
    name: 'Armenia',
    currency: 'AMD',
    symbol: '֏',
    brackets: [
      { min: 0, max: 60000, rate: 10 },
      { min: 60001, max: null, rate: 20 }
    ]
  },
  AO: {
    name: 'Angola',
    currency: 'AOA',
    symbol: 'Kz',
    brackets: [
      { min: 0, max: 34000, rate: 0 },
      { min: 34001, max: 150000, rate: 10 },
      { min: 150001, max: 300000, rate: 20 },
      { min: 300001, max: null, rate: 25 }
    ]
  },
  AU: {
    name: 'Australia',
    currency: 'AUD',
    symbol: '$',
    brackets: [
      { min: 0, max: 18200, rate: 0 },
      { min: 18201, max: 45000, rate: 19 },
      { min: 45001, max: 120000, rate: 32.5 },
      { min: 120001, max: 180000, rate: 37 },
      { min: 180001, max: null, rate: 45 }
    ]
  },
  AZ: {
    name: 'Azerbaijan',
    currency: 'AZN',
    symbol: '₼',
    brackets: [
      { min: 0, max: 2500, rate: 14 },
      { min: 2501, max: null, rate: 25 }
    ]
  },
  // Countries starting with B
  BH: {
    name: 'Bahrain',
    currency: 'BHD',
    symbol: '.د.ب',
    brackets: [
      { min: 0, max: null, rate: 0 }
    ]
  },
  BR: {
    name: 'Brazil',
    currency: 'BRL',
    symbol: 'R$',
    brackets: [
      { min: 0, max: 22847.76, rate: 0 },
      { min: 22847.77, max: 33919.80, rate: 7.5 },
      { min: 33919.81, max: 45012.60, rate: 15 },
      { min: 45012.61, max: 55976.16, rate: 22.5 },
      { min: 55976.17, max: null, rate: 27.5 }
    ]
  },
  BS: {
    name: 'Bahamas',
    currency: 'BSD',
    symbol: '$',
    brackets: [
      { min: 0, max: null, rate: 0 }
    ]
  },
  // Countries starting with C
  CA: {
    name: 'Canada',
    currency: 'CAD',
    symbol: '$',
    brackets: [
      { min: 0, max: 53359, rate: 15 },
      { min: 53360, max: 106717, rate: 20.5 },
      { min: 106718, max: 165430, rate: 26 },
      { min: 165431, max: 235675, rate: 29 },
      { min: 235676, max: null, rate: 33 }
    ]
  },
  CN: {
    name: 'China',
    currency: 'CNY',
    symbol: '¥',
    brackets: [
      { min: 0, max: 36000, rate: 3 },
      { min: 36001, max: 144000, rate: 10 },
      { min: 144001, max: 300000, rate: 20 },
      { min: 300001, max: 420000, rate: 25 },
      { min: 420001, max: 660000, rate: 30 },
      { min: 660001, max: 960000, rate: 35 },
      { min: 960001, max: null, rate: 45 }
    ]
  },
  // Countries starting with D
  DE: {
    name: 'Germany',
    currency: 'EUR',
    symbol: '€',
    brackets: [
      { min: 0, max: 10908, rate: 0 },
      { min: 10909, max: 15999, rate: 14 },
      { min: 16000, max: 62809, rate: 24 },
      { min: 62810, max: 277825, rate: 42 },
      { min: 277826, max: null, rate: 45 }
    ]
  },
  DZ: {
    name: 'Algeria',
    currency: 'DZD',
    symbol: 'د.ج',
    brackets: [
      { min: 0, max: 120000, rate: 0 },
      { min: 120001, max: 360000, rate: 20 },
      { min: 360001, max: 1440000, rate: 30 },
      { min: 1440001, max: null, rate: 35 }
    ]
  },
  // Countries starting with F
  FR: {
    name: 'France',
    currency: 'EUR',
    symbol: '€',
    brackets: [
      { min: 0, max: 10777, rate: 0 },
      { min: 10778, max: 27478, rate: 11 },
      { min: 27479, max: 78570, rate: 30 },
      { min: 78571, max: 168994, rate: 41 },
      { min: 168995, max: null, rate: 45 }
    ]
  },
  // Countries starting with I
  IN: {
    name: 'India',
    currency: 'INR',
    symbol: '₹',
    brackets: [
      { min: 0, max: 300000, rate: 0 },
      { min: 300001, max: 600000, rate: 5 },
      { min: 600001, max: 900000, rate: 10 },
      { min: 900001, max: 1200000, rate: 15 },
      { min: 1200001, max: 1500000, rate: 20 },
      { min: 1500001, max: null, rate: 30 }
    ]
  },
  IT: {
    name: 'Italy',
    currency: 'EUR',
    symbol: '€',
    brackets: [
      { min: 0, max: 15000, rate: 23 },
      { min: 15001, max: 28000, rate: 25 },
      { min: 28001, max: 50000, rate: 35 },
      { min: 50001, max: null, rate: 43 }
    ]
  },
  // Countries starting with J
  JP: {
    name: 'Japan',
    currency: 'JPY',
    symbol: '¥',
    brackets: [
      { min: 0, max: 1950000, rate: 5 },
      { min: 1950001, max: 3300000, rate: 10 },
      { min: 3300001, max: 6950000, rate: 20 },
      { min: 6950001, max: 9000000, rate: 23 },
      { min: 9000001, max: 18000000, rate: 33 },
      { min: 18000001, max: 40000000, rate: 40 },
      { min: 40000001, max: null, rate: 45 }
    ]
  },
  // Countries starting with K
  KR: {
    name: 'South Korea',
    currency: 'KRW',
    symbol: '₩',
    brackets: [
      { min: 0, max: 14000000, rate: 6 },
      { min: 14000001, max: 50000000, rate: 15 },
      { min: 50000001, max: 88000000, rate: 24 },
      { min: 88000001, max: 150000000, rate: 35 },
      { min: 150000001, max: 300000000, rate: 38 },
      { min: 300000001, max: 500000000, rate: 40 },
      { min: 500000001, max: null, rate: 42 }
    ]
  },
  // Countries starting with M
  MX: {
    name: 'Mexico',
    currency: 'MXN',
    symbol: '$',
    brackets: [
      { min: 0, max: 7735, rate: 1.92 },
      { min: 7736, max: 65651, rate: 6.4 },
      { min: 65652, max: 115375, rate: 10.88 },
      { min: 115376, max: 134119, rate: 16 },
      { min: 134120, max: 160577, rate: 17.92 },
      { min: 160578, max: 323862, rate: 21.36 },
      { min: 323863, max: 510451, rate: 23.52 },
      { min: 510452, max: 974535, rate: 30 },
      { min: 974536, max: 1299380, rate: 32 },
      { min: 1299381, max: 3898140, rate: 34 },
      { min: 3898141, max: null, rate: 35 }
    ]
  },
  // Countries starting with S
  SA: {
    name: 'Saudi Arabia',
    currency: 'SAR',
    symbol: '﷼',
    brackets: [
      { min: 0, max: null, rate: 0 }
    ]
  },
  // Countries starting with T
  TR: {
    name: 'Türkiye',
    currency: 'TRY',
    symbol: '₺',
    brackets: [
      { min: 0, max: 70000, rate: 15 },
      { min: 70001, max: 150000, rate: 20 },
      { min: 150001, max: 370000, rate: 27 },
      { min: 370001, max: 1900000, rate: 35 },
      { min: 1900001, max: null, rate: 40 }
    ]
  },
  // Countries starting with U
  UK: {
    name: 'United Kingdom',
    currency: 'GBP',
    symbol: '£',
    brackets: [
      { min: 0, max: 12570, rate: 0 },
      { min: 12571, max: 50270, rate: 20 },
      { min: 50271, max: 125140, rate: 40 },
      { min: 125141, max: null, rate: 45 }
    ]
  },
  US: {
    name: 'United States',
    currency: 'USD',
    symbol: '$',
    brackets: [
      { min: 0, max: 11000, rate: 10 },
      { min: 11001, max: 44725, rate: 12 },
      { min: 44726, max: 95375, rate: 22 },
      { min: 95376, max: 182100, rate: 24 },
      { min: 182101, max: 231250, rate: 32 },
      { min: 231251, max: 578125, rate: 35 },
      { min: 578126, max: null, rate: 37 }
    ],
    states: {
      CA: { name: 'California', additionalRate: 13.3 },
      NY: { name: 'New York', additionalRate: 10.9 },
      TX: { name: 'Texas', additionalRate: 0 },
      FL: { name: 'Florida', additionalRate: 0 }
    }
  },
  // Countries starting with Z
  ZA: {
    name: 'South Africa',
    currency: 'ZAR',
    symbol: 'R',
    brackets: [
      { min: 0, max: 237100, rate: 18 },
      { min: 237101, max: 370500, rate: 26 },
      { min: 370501, max: 512800, rate: 31 },
      { min: 512801, max: 673000, rate: 36 },
      { min: 673001, max: 857900, rate: 39 },
      { min: 857901, max: 1817000, rate: 41 },
      { min: 1817001, max: null, rate: 45 }
    ]
  }
};