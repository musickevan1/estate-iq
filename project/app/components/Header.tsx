import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white hover:text-blue-100 cursor-pointer">
          RealEstate AI Assistant
        </h1>
        <nav className="mt-4">
          <Link href="/" className="text-white hover:text-blue-100 mr-4 px-4 py-2 rounded-lg hover:bg-white/10 transition-all">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
