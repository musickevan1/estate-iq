import React, { useState, useEffect } from 'react';
import { optimizeListing } from '../utils/aiService';
import type { AIProvider } from '../utils/aiService';

interface ListingOptimizerProps {
  provider: AIProvider;
}

interface OptimizationResult {
  improvedDescription: string;
  seoSuggestions: string[];
  missingFeatures: string[];
  engagementTips: string[];
}

export default function ListingOptimizer({ provider }: ListingOptimizerProps) {
  const [currentListing, setCurrentListing] = useState('');
  const [targetKeywords, setTargetKeywords] = useState('');
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await optimizeListing(currentListing, targetKeywords, {
        provider,
      });
      setOptimizationResult(result);
    } catch (error) {
      console.error('Error optimizing listing:', error);
      setOptimizationResult({
        improvedDescription: 'Error optimizing listing. Please try again.',
        seoSuggestions: [],
        missingFeatures: [],
        engagementTips: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">Listing Optimizer</h2>
      <p className="text-gray-600 mb-8">Enhance your property listing with AI-powered optimization for better engagement and SEO.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Listing Description</label>
          <textarea
            value={currentListing}
            onChange={(e) => setCurrentListing(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-900 shadow-sm transition-all hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-none"
            rows={6}
            placeholder="Paste your current listing description here"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Target Keywords (Optional)</label>
          <input
            type="text"
            value={targetKeywords}
            onChange={(e) => setTargetKeywords(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-900 shadow-sm transition-all hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            placeholder="Enter keywords separated by commas"
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg shadow-blue-500/20 transition-all transform hover:shadow-xl hover:shadow-blue-500/30 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 ${isLoading ? 'cursor-not-allowed' : 'hover:scale-[1.02]'}`}
          disabled={isLoading}
        >
          <span className="flex items-center justify-center">
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Optimizing...
              </>
            ) : (
              'Optimize Listing'
            )}
          </span>
        </button>
      </form>

      {optimizationResult && (
        <div className="mt-8 space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Improved Description</h3>
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{optimizationResult.improvedDescription}</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => navigator.clipboard.writeText(optimizationResult.improvedDescription)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  <span>Copy to clipboard</span>
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">SEO Suggestions</h3>
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
              <ul className="list-disc list-inside space-y-2">
                {optimizationResult.seoSuggestions.map((suggestion, index) => (
                  <li key={index} className="text-gray-700">{suggestion}</li>
                ))}
              </ul>
            </div>
          </div>

          {optimizationResult.missingFeatures.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Missing Key Features</h3>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                <ul className="list-disc list-inside space-y-2">
                  {optimizationResult.missingFeatures.map((feature, index) => (
                    <li key={index} className="text-gray-700">{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Engagement Tips</h3>
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
              <ul className="list-disc list-inside space-y-2">
                {optimizationResult.engagementTips.map((tip, index) => (
                  <li key={index} className="text-gray-700">{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
