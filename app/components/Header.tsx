'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun, LayoutDashboard, Flower } from 'lucide-react';
import Link from 'next/link';

function Header() {
  const [currentPath, setCurrentPath] = useState('/');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialMode = storedTheme === 'dark' || (storedTheme === null && prefersDark);
    setIsDarkMode(initialMode);
    if (initialMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const navLinkClass = (href: string) =>
    `text-lg font-semibold transition-all duration-500 transform hover:scale-105 relative group ${currentPath === href
      ? 'text-[#fdd835] dark:text-[#fbc02d]'
      : 'text-white hover:text-[#fdd835] dark:text-gray-200 dark:hover:text-[#fbc02d]'
    } before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-[#fdd835] dark:before:bg-[#fbc02d] before:scale-x-0 group-hover:before:scale-x-100 before:transition-transform before:duration-300`;

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  return (
    <header className="bg-gradient-to-r from-[#32CD32]/40 to-[#fdd835]/40 backdrop-blur-xl dark:from-gray-900/40 dark:to-gray-700/40 shadow-xl p-4 sticky top-0 z-50 border-b-2 border-[#32CD32] dark:border-gray-700 transition-all duration-500">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
        .bloomwatch-logo-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 2.5rem;
          line-height: 1;
        }
        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: transform 0.3s ease-in-out;
        }
        .logo-container:hover {
          transform: scale(1.05);
        }

        /* Animation for the flower icon color change */
        @keyframes flower-color-change {
          0%, 50% { color: #fdd835; } /* Yellow for the first 50% of the duration */
          51%, 100% { color: #32CD32; } /* Green for the second 50% of the duration */
        }
        .animate-flower-color {
          animation: flower-color-change 20s infinite alternate;
        }

        /* Animation for the 'Bloom' text color change (inverse of flower) */
        @keyframes bloom-text-color-change {
          0%, 50% { color: #32CD32; } /* Green for the first 50% of the duration */
          51%, 100% { color: #fdd835; } /* Yellow for the second 50% of the duration */
        }
        .animate-bloom-text-color {
          animation: bloom-text-color-change 20s infinite alternate;
        }
      `}</style>
      <nav className="container mx-auto flex justify-between items-center">
        {/* رابط اللوجو يوجه إلى الصفحة الرئيسية */}
        <Link href="/" className="logo-container">
          <Flower size={40} className="animate-flower-color" />
          <span className="bloomwatch-logo-text dark:text-green-400">
            <span className="animate-bloom-text-color">Bloom</span>
            <span className="text-white dark:text-white">Track</span>
          </span>
        </Link>
        <div className="flex space-x-6 md:space-x-10 items-center">
          <Link href="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link href="/deep-bloom" className={navLinkClass("/deep-bloom")}>
            Deepbloom
          </Link>
          <Link href="/map" className={navLinkClass("/map")}>
            Map
          </Link>
          <Link href="/about" className={navLinkClass("/about")}>
            About
          </Link>
          {/* التعديل الرئيسي هنا: href="/" والنص "Add-bloom" */}
          <Link
            href="/add-bloom"
            className="px-5 py-2 text-lg font-bold rounded-full bg-[#fdd835] text-gray-900 shadow-lg hover:bg-[#fbc02d] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center gap-2"
          >
            <LayoutDashboard size={20} /> Add-bloom
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/30 text-white dark:bg-gray-700/30 dark:text-gray-200 backdrop-blur-md hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors duration-300 shadow-md"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;