import React, { useState, useEffect, useRef } from 'react';
import { Globe2, Calculator, TrendingUp, Clock, Zap, Moon, Sun, Menu, X, MapPin, ArrowUp, ArrowDown, FileDown } from 'lucide-react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { taxData } from './taxData';
import { calculateTax, formatCurrency } from './utils';
import { CountryData } from './types';
import { getTaxRecommendations } from './recommendations';

// PDF styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#374151',
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  summaryCard: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#EFF6FF',
    borderRadius: 6,
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    color: '#4B5563',
  },
  bold: {
    fontWeight: 'bold',
    color: '#1F2937',
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    minHeight: 35,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#F3F4F6',
  },
  tableCol: {
    width: '25%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  tableCell: {
    fontSize: 10,
    color: '#4B5563',
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
  },
  footer: {
    marginTop: 'auto',
    borderTop: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
  },
});

const formatPDFCurrency = (amount: number, country: CountryData): string => {
  if (country.currency === 'INR') {
    return `INR ${amount.toLocaleString('en-IN')}`;
  }
  if (country.currency === 'KRW') {
    return `KRW ${amount.toLocaleString('ko-KR')}`;
  }
  return formatCurrency(amount, country);
};

const TaxReport = ({ result, country, state, fullName }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Tax Calculation Report</Text>
        <Text style={styles.text}>Generated for: {fullName}</Text>
        <Text style={styles.text}>Date: {new Date().toLocaleDateString()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Location Details</Text>
        <Text style={styles.text}>Country: {country.name}</Text>
        {state && country.states?.[state] && (
          <Text style={styles.text}>State: {country.states[state].name}</Text>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subtitle}>Income Summary</Text>
        <View style={styles.summaryCard}>
          <Text style={[styles.text, styles.bold]}>Gross Income: {formatPDFCurrency(result.grossIncome, country)}</Text>
          <Text style={[styles.text, styles.bold]}>Total Tax: {formatPDFCurrency(result.totalTax, country)}</Text>
          <Text style={[styles.text, styles.bold]}>Net Income: {formatPDFCurrency(result.netIncome, country)}</Text>
          <Text style={[styles.text, styles.bold]}>Effective Tax Rate: {result.effectiveRate.toFixed(2)}%</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Tax Bracket Breakdown</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Income Range</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Tax Rate</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Taxable Amount</Text>
            </View>
            <View style={[styles.tableCol, { borderRightWidth: 0 }]}>
              <Text style={styles.tableCellHeader}>Tax</Text>
            </View>
          </View>

          {result.breakdown.map((item, index) => (
            <View key={index} style={[styles.tableRow, index === result.breakdown.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {item.bracket.max
                    ? `${formatPDFCurrency(item.bracket.min, country)} - ${formatPDFCurrency(item.bracket.max, country)}`
                    : `Above ${formatPDFCurrency(item.bracket.min, country)}`}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.bracket.rate}%</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {formatPDFCurrency(
                    item.bracket.max
                      ? Math.min(result.grossIncome - item.bracket.min, item.bracket.max - item.bracket.min)
                      : result.grossIncome - item.bracket.min,
                    country
                  )}
                </Text>
              </View>
              <View style={[styles.tableCol, { borderRightWidth: 0 }]}>
                <Text style={[styles.tableCell, styles.bold]}>{formatPDFCurrency(item.taxAmount, country)}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Generated by Global Tax Calculator • {new Date().getFullYear()}</Text>
      </View>
    </Page>
  </Document>
);

function App() {
  const [country, setCountry] = useState<string>('');
  const [income, setIncome] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string>('');
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const locationTimeoutRef = useRef<number | null>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const storedTheme = localStorage.getItem('theme');
      return storedTheme === 'dark' || (storedTheme === null && systemPrefersDark);
    }
    return false;
  });

  const selectedCountry = country ? taxData[country] : null;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === null) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
      checkScrollability();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const checkScrollability = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    setCanScrollUp(scrollPosition > 50);
    setCanScrollDown(scrollPosition + windowHeight < documentHeight - 50);
    setShowScrollButtons(documentHeight > windowHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollability);
    checkScrollability();
    return () => window.removeEventListener('scroll', checkScrollability);
  }, []);

  useEffect(() => {
    return () => {
      if (locationTimeoutRef.current) {
        window.clearTimeout(locationTimeoutRef.current);
      }
    };
  }, []);

  const scrollToCalculator = () => {
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const detectLocation = async () => {
    if (locationTimeoutRef.current) {
      window.clearTimeout(locationTimeoutRef.current);
    }

    setIsLocating(true);
    setLocationError('');

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      
      if (!response.ok) {
        throw new Error('Failed to get location data');
      }

      const data = await response.json();
      const countryCode = data.countryCode;
      
      const matchingCountry = Object.keys(taxData).find(
        code => code.toUpperCase() === countryCode
      );

      if (matchingCountry) {
        setCountry(matchingCountry);
        setState('');
      } else {
        setLocationError('Tax data not available for your location');
      }
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Please enable location access');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information unavailable');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out');
            break;
          default:
            setLocationError('Failed to detect location');
        }
      } else {
        setLocationError('Failed to detect location');
      }
    } finally {
      setIsLocating(false);
      locationTimeoutRef.current = window.setTimeout(() => {
        setLocationError('');
      }, 5000);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCalculate = () => {
    if (!income || !selectedCountry) return;
    return calculateTax(Number(income), selectedCountry, state);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
    setIncome('');
    setFullName('');
    setState('');
    setLocationError('');
  };

  const handleRefresh = () => {
    setCountry('');
    setIncome('');
    setFullName('');
    setState('');
    setLocationError('');
    setIsLocating(false);
    if (locationTimeoutRef.current) {
      window.clearTimeout(locationTimeoutRef.current);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const result = income && selectedCountry ? handleCalculate() : null;
  const recommendations = result ? getTaxRecommendations(selectedCountry, result.grossIncome, state) : null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 transition-colors duration-200">
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMenu} />
      )}

      {showScrollButtons && (
        <div className="fixed right-6 bottom-6 z-30 flex flex-col gap-2">
          {canScrollUp && (
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-800/80 text-white transition-all duration-200 backdrop-blur-sm opacity-0 animate-fade-in"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          )}
          {canScrollDown && (
            <button
              onClick={scrollToBottom}
              className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-800/80 text-white transition-all duration-200 backdrop-blur-sm opacity-0 animate-fade-in"
              aria-label="Scroll to bottom"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                className="group transition-transform duration-200 hover:scale-110"
                aria-label="Clear form"
              >
                <Globe2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400 transition-colors duration-200 group-hover:text-indigo-500" />
              </button>
              <h1 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white">
                Global Tax Calculator
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-amber-500" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600" />
                )}
              </button>
              
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 md:hidden"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h2>
          <nav className="space-y-2">
            <button
              onClick={scrollToCalculator}
              className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculator</span>
            </button>
            {result && (
              <>
                <a
                  href="#breakdown"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Tax Breakdown
                </a>
                {recommendations && recommendations[0].recommendations.length > 0 && (
                  <a
                    href="#recommendations"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    Recommendations
                  </a>
                )}
              </>
            )}
          </nav>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div ref={calculatorRef} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Country
                </label>
                <div className="relative">
                  <select
                    className="w-full p-3 md:p-2 border border-gray-300 dark:border-gray-600 rounded-lg md:rounded-md text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700"
                    value={country}
                    onChange={handleCountryChange}
                  >
                    <option value="" className="text-gray-400 dark:text-gray-500">Select country</option>
                    {Object.keys(taxData).map((code) => (
                      <option key={code} value={code}>
                        {taxData[code].name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={detectLocation}
                    disabled={isLocating}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                    title="Detect location"
                  >
                    <MapPin className="w-5 h-5" />
                  </button>
                </div>
                {locationError && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{locationError}</p>
                )}
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 md:p-2 border border-gray-300 dark:border-gray-600 rounded-lg md:rounded-md text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              {selectedCountry?.states && (
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    State
                  </label>
                  <select
                    className="w-full p-3 md:p-2 border border-gray-300 dark:border-gray-600 rounded-lg md:rounded-md text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="" className="text-gray-400 dark:text-gray-500">Select state</option>
                    {Object.entries(selectedCountry.states).map(([code, data]) => (
                      <option key={code} value={code}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Annual Income {selectedCountry ? `(${selectedCountry.symbol})` : ''}
                </label>
                <input
                  type="number"
                  className="w-full p-3 md:p-2 border border-gray-300 dark:border-gray-600 rounded-lg md:rounded-md text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="Enter annual income"
                />
              </div>
            </div>
          </div>

          {result && (
            <div className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Gross Income</h3>
                  <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(result.grossIncome, selectedCountry)}
                  </p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Tax</h3>
                  <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(result.totalTax, selectedCountry)}
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Net Income</h3>
                  <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(result.netIncome, selectedCountry)}
                  </p>
                </div>
              </div>

              <div id="breakdown" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tax Breakdown</h3>
                  {fullName && result && selectedCountry && (
                    <PDFDownloadLink
                      document={<TaxReport result={result} country={selectedCountry} state={state} fullName={fullName} />}
                      fileName={`tax-report-${selectedCountry.name.toLowerCase()}.pdf`}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>Export as PDF</span>
                    </PDFDownloadLink>
                  )}
                </div>
                <div className="space-y-3">
                  {result.breakdown.map((item, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {item.bracket.max
                              ? `${selectedCountry.symbol}${item.bracket.min.toLocaleString()} - ${selectedCountry.symbol}${item.bracket.max.toLocaleString()}`
                              : `Above ${selectedCountry.symbol}${item.bracket.min.toLocaleString()}`}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Rate: {item.bracket.rate}%</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatCurrency(item.taxAmount, selectedCountry)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Effective Tax Rate:{' '}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {result.effectiveRate.toFixed(2)}%
                    </span>
                  </p>
                </div>
              </div>

              {recommendations && recommendations[0].recommendations.length > 0 && (
                <div id="recommendations" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6">
                  <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
                    <TrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                    Tax Saving Recommendations
                  </h3>
                  <div className="space-y-6">
                    {recommendations.map((category, index) => (
                      category.recommendations.length > 0 && (
                        <div key={index}>
                          <h4 className="text-lg font-medium mb-4 flex items-center text-gray-900 dark:text-white">
                            {category.title === 'Immediate Actions' ? (
                              <Zap className="w-5 h-5 text-amber-500 dark:text-amber-400 mr-2" />
                            ) : (
                              <Clock className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2" />
                            )}
                            {category.title}
                          </h4>
                          <div className="grid gap-4">
                            {category.recommendations.map((rec, recIndex) => (
                              <div key={recIndex} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 shadow-sm">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                                  <h5 className="text-base font-medium text-gray-900 dark:text-white">{rec.title}</h5>
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    rec.impact === 'High' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                                    rec.impact === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                                    'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                                  }`}>
                                    {rec.impact} Impact
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300  mb-2">{rec.description}</p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                                  <span className={`${
                                    rec.difficulty === 'Easy' ? 'text-green-600 dark:text-green-400' :
                                    rec.difficulty === 'Medium' ? 'text-yellow-600 dark:text-yellow-400' :
                                    'text-red-600 dark:text-red-400'
                                  }`}>
                                    {rec.difficulty} to implement
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="mt-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center font-inter text-sm font-medium tracking-wide text-gray-600 dark:text-gray-400">
            ©2025 GLOBAL TAX CALCULATOR
          </div>
        </div>
      </footer>
    
    </div>
  );
}

export default App;