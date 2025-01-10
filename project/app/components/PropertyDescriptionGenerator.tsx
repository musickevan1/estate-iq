import React, { useState, useEffect } from 'react';
import { generatePropertyDescription } from '../utils/aiService';
import type { AIProvider } from '../utils/aiService';

interface PropertyDescriptionGeneratorProps {
  provider: AIProvider;
}

interface PropertyDetails {
  bedrooms: string;
  bathrooms: string;
  squareFeet: string;
  propertyType: string;
  features: string;
  tone: string;
}

export default function PropertyDescriptionGenerator({ provider }: PropertyDescriptionGeneratorProps) {
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails>({
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    propertyType: '',
    features: '',
    tone: 'professional'
  });
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await generatePropertyDescription(propertyDetails, {
        provider,
      });
      setGeneratedDescription(response.text);
    } catch (error) {
      console.error('Error generating description:', error);
      setGeneratedDescription('Error generating description. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">Property Description Generator</h2>
      <p className="text-gray-600 mb-8">Fill in the details below to generate an engaging property description.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
            <input
              type="number"
              value={propertyDetails.bedrooms}
              onChange={(e) => setPropertyDetails({...propertyDetails, bedrooms: e.target.value})}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-900 shadow-sm transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              min="0"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
            <input
              type="number"
              value={propertyDetails.bathrooms}
              onChange={(e) => setPropertyDetails({...propertyDetails, bathrooms: e.target.value})}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-900 shadow-sm transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              min="0"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Square Feet</label>
          <input
            type="number"
            value={propertyDetails.squareFeet}
            onChange={(e) => setPropertyDetails({...propertyDetails, squareFeet: e.target.value})}
            className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-900 shadow-sm transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Property Type</label>
          <select
            value={propertyDetails.propertyType}
            onChange={(e) => setPropertyDetails({...propertyDetails, propertyType: e.target.value})}
            className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-900 shadow-sm transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none appearance-none bg-white"
            required
          >
            <option value="">Select type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Key Features</label>
          <textarea
            value={propertyDetails.features}
            onChange={(e) => setPropertyDetails({...propertyDetails, features: e.target.value})}
            className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-900 shadow-sm transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none"
            rows={3}
            placeholder="Enter key features separated by commas"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tone</label>
          <select
            value={propertyDetails.tone}
            onChange={(e) => setPropertyDetails({...propertyDetails, tone: e.target.value})}
            className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-900 shadow-sm transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none appearance-none bg-white"
          >
            <option value="professional">Professional</option>
            <option value="luxury">Luxury</option>
            <option value="modern">Modern</option>
            <option value="family-friendly">Family Friendly</option>
          </select>
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
                Generating...
              </>
            ) : (
              'Generate Description'
            )}
          </span>
        </button>
      </form>

      {generatedDescription && (
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Generated Description</h3>
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{generatedDescription}</p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => navigator.clipboard.writeText(generatedDescription)}
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
