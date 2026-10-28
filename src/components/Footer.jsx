import React from 'react';
import { Heart, MessageSquare } from 'lucide-react';
import { useUI } from '../context/UIContext';

export const Footer = () => {
  const { openEnquiry, setActiveSection } = useUI();

  return (
    <footer className="bg-emerald-950 text-stone-300 py-10 border-t border-emerald-900 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between pb-8 border-b border-emerald-900/60 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-900 border border-amber-400/30 text-amber-300 font-serif font-bold text-sm flex items-center justify-center">
              पु
            </div>
            <div>
              <span className="font-serif text-xl font-bold text-white tracking-widest">KVITKA BHARAT</span>
              <span className="text-[10px] tracking-widest text-amber-300/80 block uppercase">
                FLOWERS • PLANTS • POTS • ATELIER
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={() => { setActiveSection('flowers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-stone-300 hover:text-white cursor-pointer"
            >
              🌸 Flowers
            </button>
            <span>•</span>
            <button
              onClick={() => { setActiveSection('plants'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-stone-300 hover:text-white cursor-pointer"
            >
              🌿 Plants
            </button>
            <span>•</span>
            <button
              onClick={() => { setActiveSection('pots'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-stone-300 hover:text-white cursor-pointer"
            >
              🪴 Pots
            </button>
            <span>•</span>
            <button
              onClick={() => { setActiveSection('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-stone-300 hover:text-white cursor-pointer"
            >
              🏡 Garden Services
            </button>
            <span>•</span>
            <button
              onClick={() => { setActiveSection('corporate'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-stone-300 hover:text-white cursor-pointer"
            >
              🎁 Corporate
            </button>
            <span>•</span>
            <button
              onClick={() => openEnquiry()}
              className="text-amber-300 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <MessageSquare className="w-3 h-3" />
              <span>Direct Enquiry</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-2 text-center sm:text-left">
          <p>© {new Date().getFullYear()} KVITKA BHARAT. Production-ready botanical platform.</p>
          <p className="flex items-center gap-1">
            Handcrafted with <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> for Indian flora lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};
