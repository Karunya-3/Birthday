import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Heart } from 'lucide-react';
import { siteConfig } from '../data/config';

const navItems = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'questions', label: 'Questions' },
  { id: 'roast', label: 'Roast' },
  { id: 'cards', label: 'Cards' },
  { id: 'surprise', label: 'Surprise' },
];

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-pink-100/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => scrollTo('welcome')}
          className="flex items-center gap-2 group text-left"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-400 to-rose-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="font-semibold text-slate-800 text-lg tracking-tight block">
              For {siteConfig.sisterName} ✨
            </span>
            <span className="text-xs text-pink-500 font-handwriting text-base -mt-1 block">
              Birthday Edition
            </span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-100/80 shadow-sm">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-pink-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-pink-600 hover:bg-pink-50/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white/80 backdrop-blur-md border border-pink-100 text-slate-700 hover:bg-pink-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-white/95 backdrop-blur-xl border-b border-pink-100 shadow-xl px-6 py-6 transition-all">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-pink-500 text-white font-semibold shadow-sm'
                      : 'text-slate-700 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
