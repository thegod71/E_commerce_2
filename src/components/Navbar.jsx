import React, { useState } from 'react';
import { ShoppingBag, MessageSquare, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';

export const Navbar = () => {
  const { totalItemsCount, openCart } = useCart();
  const { activeSection, setActiveSection, openEnquiry } = useUI();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      
      {/* 1. Minimalist Announcement Bar */}
      <div className="bg-stone-900 text-stone-200 text-[10px] sm:text-[11px] font-medium py-1.5 px-4 text-center tracking-widest uppercase border-b border-stone-800">
        <span>SAME-DAY DELIVERY ACROSS INDIA • ORDER BY 2 PM • ARTISANAL FLOWERS, PLANTS &amp; POTS</span>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => handleNav('all')}
          >
            <div className="w-9 h-9 rounded-full bg-stone-900 text-amber-300 font-serif font-bold text-base flex items-center justify-center border border-amber-400/30 group-hover:scale-105 transition-transform shadow-xs">
              पु
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-stone-900 block leading-tight">
                KVITKA BHARAT
              </span>
              <span className="text-[9px] tracking-[0.26em] text-stone-500 font-medium uppercase block -mt-0.5">
                FLOWERS • PLANTS • POTS • ATELIER
              </span>
            </div>
          </div>

          {/* Desktop Navigation: Direct Dedicated Pages for Home, Flowers, Plants, Pots, Services, Corporate */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
            <button
              onClick={() => handleNav('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeSection === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('flowers')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeSection === 'flowers'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              🌸 Flowers
            </button>

            <button
              onClick={() => handleNav('plants')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeSection === 'plants'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              🌿 Plants
            </button>

            <button
              onClick={() => handleNav('pots')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeSection === 'pots'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              🪴 Pots
            </button>

            <button
              onClick={() => handleNav('services')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeSection === 'services'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              🏡 Garden Services
            </button>

            <button
              onClick={() => handleNav('corporate')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeSection === 'corporate'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              🎁 Corporate
            </button>
          </nav>

          {/* Right Action Icons: Enquiry & Direct Cart */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <button
              onClick={() => openEnquiry()}
              className="hidden sm:flex items-center gap-1.5 border border-stone-300 hover:border-stone-900 text-stone-800 hover:text-stone-950 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Enquire</span>
            </button>

            <button
              onClick={openCart}
              className="relative flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all shadow-xs cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Bag</span>
              {totalItemsCount > 0 && (
                <span className="bg-amber-400 text-stone-900 font-bold px-1.5 py-0.5 rounded-full text-[10px]">
                  {totalItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-800 hover:bg-stone-100 rounded-lg"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white p-4 space-y-2">
          <button
            onClick={() => handleNav('all')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider ${
              activeSection === 'all' ? 'bg-stone-900 text-white' : 'text-stone-800 hover:bg-stone-100'
            }`}
          >
            🏠 Home Atelier
          </button>
          <button
            onClick={() => handleNav('flowers')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider ${
              activeSection === 'flowers' ? 'bg-stone-900 text-white' : 'text-stone-800 hover:bg-stone-100'
            }`}
          >
            🌸 Fresh Flowers Page
          </button>
          <button
            onClick={() => handleNav('plants')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider ${
              activeSection === 'plants' ? 'bg-stone-900 text-white' : 'text-stone-800 hover:bg-stone-100'
            }`}
          >
            🌿 Living Plants Page
          </button>
          <button
            onClick={() => handleNav('pots')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider ${
              activeSection === 'pots' ? 'bg-stone-900 text-white' : 'text-stone-800 hover:bg-stone-100'
            }`}
          >
            🪴 Pots &amp; Planters Page
          </button>
          <button
            onClick={() => handleNav('services')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider ${
              activeSection === 'services' ? 'bg-stone-900 text-white' : 'text-stone-800 hover:bg-stone-100'
            }`}
          >
            🏡 Garden Services Page
          </button>
          <button
            onClick={() => handleNav('corporate')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider ${
              activeSection === 'corporate' ? 'bg-stone-900 text-white' : 'text-stone-800 hover:bg-stone-100'
            }`}
          >
            🎁 Corporate Gifting Page
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openEnquiry();
            }}
            className="w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider border border-stone-300 text-stone-900 flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Direct Enquiry</span>
          </button>
        </div>
      )}
    </div>
  );
};
