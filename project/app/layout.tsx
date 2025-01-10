import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RealEstateAI Tool Suite',
  description: 'AI-powered tools for real estate professionals - Generate descriptions, analyze markets, and optimize listings',
  keywords: 'real estate, AI, property description, market analysis, listing optimization',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-gray-50 to-blue-50`}>
        <div className="min-h-screen">
          <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <div className="flex items-center">
                  <span className="text-xl font-semibold text-gray-900">
                    RealEstateAI
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <a
                    href="https://github.com/yourusername/code-everyday-challenge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Documentation
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <main className="py-8">
            {children}
          </main>
          <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-100 py-4 mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
              © 2024 RealEstateAI. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
