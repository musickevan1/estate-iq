import React, { useState, useEffect } from 'react';
import { analyzeMarketData } from '../utils/aiService';
import type { AIProvider } from '../utils/aiService';

interface MarketAnalysisToolProps {
  provider: AIProvider;
}

interface MarketAnalysis {
  address: string;
  propertyType: string;
  squareFeet: string;
  yearBuilt: string;
  condition: string;
  recentSales: boolean;
}

export default function MarketAnalysisTool({ provider }: MarketAnalysisToolProps) {
  const [marketDetails, setMarketDetails] = useState<MarketAnalysis>({
    address: '',
    propertyType: '',
    squareFeet: '',
    yearBuilt: '',
    condition: 'good',
    recentSales: true
  });
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await analyzeMarketData(marketDetails, {
        provider,
      });
      setAnalysisResult(response.text);
    } catch (error) {
      console.error('Error analyzing market data:', error);
      setAnalysisResult('Error analyzing market data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">Market Analysis Tool</h2>
      <p className="text-gray-600 mb-8">Get detailed market insights for your property with AI-powered analysis.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Property Address</label>
          <input
            type="text"
            value={marketDetails.address}
            onChange={(e) => setMarketDetails({...marketDetails, address: e.target.value})}
            className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-900 shadow-sm transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            required
            placeholder="Enter full property address"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Property Type</label>
            <select
              value={marketDetails.propertyType}
              onChange={(e) => setMarketDetails({...marketDetails, propertyType: e.target.value})}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-900 shadow-sm transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none appearance-none bg-white"
              required
            >
              <option value="">Select type</option>
              <option value="single-family">Single Family Home</option>
              <option value="multi-family">Multi-Family</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Square Feet</label>
            <input
              type="number"
              value={marketDetails.squareFeet}
              onChange={(e) => setMarketDetails({...marketDetails, squareFeet: e.target.value})}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-900 shadow-sm transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              min="0"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Year Built</label>
            <input
              type="number"
              value={marketDetails.yearBuilt}
              onChange={(e) => setMarketDetails({...marketDetails, yearBuilt: e.target.value})}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-900 shadow-sm transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              min="1800"
              max={new Date().getFullYear()}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Condition</label>
            <select
              value={marketDetails.condition}
              onChange={(e) => setMarketDetails({...marketDetails, condition: e.target.value})}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-900 shadow-sm transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none appearance-none bg-white"
            >
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="needs-work">Needs Work</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={marketDetails.recentSales}
              onChange={(e) => setMarketDetails({...marketDetails, recentSales: e.target.checked})}
              className="h-5 w-5 text-primary border-gray-300 rounded transition-colors focus:ring-primary/20"
            />
            <div className="ml-3">
              <label className="font-medium text-sm text-gray-700">
                Include recent sales in the area
              </label>
              <p className="text-xs text-gray-500 mt-0.5">
                Get comparative data from similar properties sold in the last 6 months
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full bg-primary text-white py-3 px-6 rounded-lg shadow-lg shadow-primary/20 transition-all transform hover:shadow-xl hover:shadow-primary/30 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 ${isLoading ? 'cursor-not-allowed' : 'hover:scale-[1.02]'}`}
          disabled={isLoading}
        >
          <span className="flex items-center justify-center">
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              'Generate Analysis'
            )}
          </span>
        </button>
      </form>

      {analysisResult && (
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Market Analysis Results</h3>
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{analysisResult}</p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => navigator.clipboard.writeText(analysisResult)}
              className="text-primary hover:text-primary/80 text-sm font-medium flex items-center space-x-1 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>Copy to clipboard</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
