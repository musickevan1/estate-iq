'use client';

   import { useState, useEffect } from 'react';
   import PropertyDescriptionGenerator from './components/PropertyDescriptionGenerator';
   import MarketAnalysisTool from './components/MarketAnalysisTool';
   import ListingOptimizer from './components/ListingOptimizer';
   import type { AIProvider } from './utils/aiService';
   import Header from './components/Header';

   export default function Home() {
     const [selectedModel, setSelectedModel] = useState('openai');
     const [activeSection, setActiveSection] = useState('hero');
     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

     useEffect(() => {
       const handleScroll = () => {
         const sections = ['hero', 'description', 'market', 'optimizer'];
         const scrollPosition = window.scrollY + window.innerHeight / 2;
         
         for (const section of sections) {
           const element = document.getElementById(section);
           if (element && scrollPosition > element.offsetTop) {
             setActiveSection(section);
           }
         }
       };

       window.addEventListener('scroll', handleScroll);
       return () => window.removeEventListener('scroll', handleScroll);
     }, []);

     const scrollToSection = (id: string) => {
       document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
     };

     return (
       <div className="scroll-smooth">
         <Header />
         {/* Navigation */}
         <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex justify-between items-center h-16">
               <div className="flex items-center space-x-4 md:space-x-8">
                 <button 
                   onClick={() => scrollToSection('hero')}
                   className="text-gray-800 hover:text-blue-600 transition-colors"
                 >
                   <h1 className="text-xl font-bold">
                     Estate<span className="text-blue-600">IQ</span>
                   </h1>
                 </button>
                 {/* Mobile menu button */}
                 <button
                   onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                   className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                 >
                   <span className="sr-only">Open main menu</span>
                   {isMobileMenuOpen ? (
                     <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                     </svg>
                   ) : (
                     <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                     </svg>
                   )}
                 </button>
                 <div className="hidden md:flex space-x-6">
                   <button
                     onClick={() => scrollToSection('description')}
                     className={`text-sm font-medium ${
                       activeSection === 'description' 
                         ? 'text-blue-600' 
                         : 'text-gray-600 hover:text-gray-800'
                     } transition-colors`}
                   >
                     Description Generator
                   </button>
                   <button
                     onClick={() => scrollToSection('market')}
                     className={`text-sm font-medium ${
                       activeSection === 'market' 
                         ? 'text-blue-600' 
                         : 'text-gray-600 hover:text-gray-800'
                     } transition-colors`}
                   >
                     Market Analysis
                   </button>
                   <button
                     onClick={() => scrollToSection('optimizer')}
                     className={`text-sm font-medium ${
                       activeSection === 'optimizer' 
                         ? 'text-blue-600' 
                         : 'text-gray-600 hover:text-gray-800'
                     } transition-colors`}
                   >
                     Listing Optimizer
                   </button>
                 </div>
               </div>
               <div className="hidden md:flex items-center">
                 <div className="relative">
                   <select
                     value={selectedModel}
                     onChange={(e) => setSelectedModel(e.target.value)}
                     className="appearance-none bg-white pl-4 pr-10 py-2 text-sm rounded-lg border border-gray-200 shadow-sm hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                   >
                     <option value="openai">🤖 OpenAI GPT-4</option>
                     <option value="anthropic">🌟 Anthropic Claude</option>
                     <option value="gemini">🎯 Google Gemini</option>
                     <option value="llama">🦙 Meta Llama 2</option>
                     <option value="deepseek">🔍 DeepSeek</option>
                   </select>
                   <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                     <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           
           {/* Mobile menu */}
           <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white border-t border-gray-100`}>
             <div className="px-2 pt-2 pb-3 space-y-1">
               <button
                 onClick={() => {
                   scrollToSection('description');
                   setIsMobileMenuOpen(false);
                 }}
                 className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                   activeSection === 'description' 
                     ? 'text-primary bg-primary/5' 
                     : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                 } transition-colors`}
               >
                 Description Generator
               </button>
               <button
                 onClick={() => {
                   scrollToSection('market');
                   setIsMobileMenuOpen(false);
                 }}
                 className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                   activeSection === 'market' 
                     ? 'text-primary bg-primary/5' 
                     : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                 } transition-colors`}
               >
                 Market Analysis
               </button>
               <button
                 onClick={() => {
                   scrollToSection('optimizer');
                   setIsMobileMenuOpen(false);
                 }}
                 className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                   activeSection === 'optimizer' 
                     ? 'text-primary bg-primary/5' 
                     : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                 } transition-colors`}
               >
                 Listing Optimizer
               </button>
               <div className="px-3 py-2">
                 <select
                   value={selectedModel}
                   onChange={(e) => setSelectedModel(e.target.value)}
                   className="w-full appearance-none bg-white px-4 py-2 text-sm rounded-lg border border-gray-200 shadow-sm hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                 >
                   <option value="openai">🤖 OpenAI GPT-4</option>
                   <option value="anthropic">🌟 Anthropic Claude</option>
                   <option value="gemini">🎯 Google Gemini</option>
                   <option value="llama">🦙 Meta Llama 2</option>
                   <option value="deepseek">🔍 DeepSeek</option>
                 </select>
               </div>
             </div>
           </div>
         </nav>

         {/* Hero Section */}
         <section 
           id="hero"
           className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white"
         >
           <div className="max-w-4xl text-center px-4">
             <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
               Transform Your Real Estate Business
               <span className="text-blue-600">.</span>
             </h1>
             <p className="text-xl text-gray-600 mb-8">
               AI-powered tools for smarter property marketing, market analysis, and listing optimization
             </p>
             <div className="flex justify-center space-x-4">
               <button 
                 onClick={() => scrollToSection('description')}
                 className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg shadow-lg shadow-primary/20 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
               >
                 Get Started
               </button>
               <button 
                 onClick={() => scrollToSection('market')}
                 className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg shadow-md transition-all hover:shadow-lg"
               >
                 Explore Tools
               </button>
             </div>
           </div>
         </section>

         {/* Description Generator Section */}
         <section 
           id="description"
           className="min-h-screen flex items-center bg-white"
         >
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
             <div className="text-center mb-12">
               <h2 className="text-4xl font-bold text-gray-900 mb-4">
                 AI-Powered Property Descriptions
               </h2>
               <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                 Generate compelling property listings in seconds with our advanced AI models
               </p>
             </div>
             <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all hover:shadow-xl">
               <PropertyDescriptionGenerator provider={selectedModel as AIProvider} />
             </div>
           </div>
         </section>

         {/* Market Analysis Section */}
         <section 
           id="market"
           className="min-h-screen flex items-center bg-gray-50"
         >
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
             <div className="text-center mb-12">
               <h2 className="text-4xl font-bold text-gray-900 mb-4">
                 Comprehensive Market Analysis
               </h2>
               <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                 Get detailed market insights and trends to make informed decisions
               </p>
             </div>
             <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all hover:shadow-xl">
               <MarketAnalysisTool provider={selectedModel as AIProvider} />
             </div>
           </div>
         </section>

         {/* Listing Optimizer Section */}
         <section 
           id="optimizer"
           className="min-h-screen flex items-center bg-white"
         >
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
             <div className="text-center mb-12">
               <h2 className="text-4xl font-bold text-gray-900 mb-4">
                 Smart Listing Optimization
               </h2>
               <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                 Maximize your property's appeal with AI-driven optimization
               </p>
             </div>
             <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all hover:shadow-xl">
               <ListingOptimizer provider={selectedModel as AIProvider} />
             </div>
           </div>
         </section>

         {/* Footer */}
         <footer className="bg-gray-900 text-white py-12">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
               <h2 className="text-xl font-bold mb-2">
                 Estate<span className="text-blue-400">IQ</span>
               </h2>
               <p className="text-gray-400">
                 Part of the Code Everyday Challenge - Day 8
               </p>
               <p className="mt-2">
                 <a
                   href="https://github.com/yourusername/code-everyday-challenge"
                   className="text-blue-400 hover:text-blue-300"
                   target="_blank"
                   rel="noopener noreferrer"
                 >
                   View on GitHub
                 </a>
               </p>
           </div>
         </footer>
       </div>
     );
   }
