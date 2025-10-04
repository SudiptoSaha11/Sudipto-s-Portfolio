// Navbar.jsx
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <>
      {/* Make navbar fixed at top */}
      <nav className="fixed top-0 left-0 w-full z-50 py-6 bg-white">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-white">WELCOME</a>

          {/* Desktop Navigation */}
          <div className={`${isMobile ? 'hidden' : 'flex'} space-x-8`}>
            {["HOME", "LINKS", "ABOUT", "CONTACT"].map(item => (
              <a
                key={item}
                href="#"
                className="text-white hover:text-gray-300 transition duration-300 py-2"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              className="text-white focus:outline-none z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="relative w-full h-full">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-4 z-50 text-white text-3xl font-bold hover:text-gray-300 transition duration-300"
            >
              ×
            </button>

            <div className="pt-20 px-6">
              <nav className="flex flex-col space-y-6">
                {["HOME", "ABOUT", "TEAM", "SERVICE", "PORTFOLIO", "CONTACT"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white text-xl font-medium py-3 px-4 hover:bg-white hover:bg-opacity-10 rounded-lg transition duration-300 border-b border-white border-opacity-10"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
