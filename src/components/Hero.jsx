import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Clock } from 'lucide-react';
import { useUI } from '../context/UIContext';
import botanicalBg from '../assets/botanical_luxury_bg.jpg';

export const Hero = () => {
  const { activeSection, setActiveSection } = useUI();

  return (
    <section className="relative py-12 sm:py-16 border-b border-stone-200/80 bg-[#FAF8F5] overflow-hidden">
      
      {/* 1. Subtle Sunlit Botanical Shadow Wallpaper */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-multiply"
        style={{ backgroundImage: `url(${botanicalBg})` }}
      />
      
      {/* Ambient gradient softening */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#FAF8F5]/60 via-transparent to-[#FAF8F5]/90" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* 2. Editorial Headline in Pure Kvitkafa Style */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-2xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
            <span className="text-[10px] tracking-[0.25em] text-stone-700 font-bold uppercase">
              INDIAN BOTANICAL ATELIER • ESTD 2026
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-stone-900 tracking-tight leading-[1.14]">
            Premium Flowers, Living Plants &amp; Artisanal Pots.
          </h1>

          <p className="mt-4 text-stone-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Where contemporary luxury meets Indian botanical heritage. Explore handpicked indoor greens, fresh rose boxes in handcrafted pots, bespoke urban balcony makeovers, and corporate gifting.
          </p>

          {/* Guarantee Badges */}
          <div className="flex flex-wrap items-center justify-center gap-5 mt-5 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-stone-700">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Same-Day Delivery</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>100% Freshness Guarantee</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-stone-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Artisanal Crafted in India</span>
            </span>
          </div>
        </div>

        {/* 3. Floating Curated Photo Cards for Option 01: Flowers, Plants & Pots */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
          
          {/* Card 1: 🌸 Fresh Flowers */}
          <div
            onClick={() => setActiveSection('flowers')}
            className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-300 shadow-soft hover:shadow-luxury cursor-pointer flex flex-col justify-between ${
              activeSection === 'flowers'
                ? 'ring-2 ring-stone-900 border-stone-900'
                : 'border-stone-200/90 hover:border-stone-400'
            }`}
          >
            <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80"
                alt="Fresh Flowers"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-xs text-amber-300 text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded shadow-xs">
                Option 01 • Stems
              </span>
              <span className="absolute bottom-3 right-3 bg-white/95 text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs font-mono">
                From ₹1,899
              </span>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-amber-900 transition-colors">
                  🌸 Fresh Flowers
                </h3>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Velvety roses, hat boxes &amp; urlis
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-stone-100 group-hover:bg-stone-900 group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 2: 🌿 Living Plants */}
          <div
            onClick={() => setActiveSection('plants')}
            className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-300 shadow-soft hover:shadow-luxury cursor-pointer flex flex-col justify-between ${
              activeSection === 'plants'
                ? 'ring-2 ring-stone-900 border-stone-900'
                : 'border-stone-200/90 hover:border-stone-400'
            }`}
          >
            <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80"
                alt="Living Plants"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-xs text-amber-300 text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded shadow-xs">
                Option 01 • Greens
              </span>
              <span className="absolute bottom-3 right-3 bg-white/95 text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs font-mono">
                From ₹799
              </span>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-amber-900 transition-colors">
                  🌿 Living Plants
                </h3>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Vastu jade, snake plants &amp; bonsai
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-stone-100 group-hover:bg-stone-900 group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 3: 🪴 Artisanal Pots */}
          <div
            onClick={() => setActiveSection('pots')}
            className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-300 shadow-soft hover:shadow-luxury cursor-pointer flex flex-col justify-between ${
              activeSection === 'pots'
                ? 'ring-2 ring-stone-900 border-stone-900'
                : 'border-stone-200/90 hover:border-stone-400'
            }`}
          >
            <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80"
                alt="Artisanal Pots"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-xs text-amber-300 text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded shadow-xs">
                Option 01 • Vessels
              </span>
              <span className="absolute bottom-3 right-3 bg-white/95 text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs font-mono">
                From ₹899
              </span>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-amber-900 transition-colors">
                  🪴 Artisanal Pots
                </h3>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Terracotta clay &amp; Moradabad brass
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-stone-100 group-hover:bg-stone-900 group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>

        {/* 4. Sleek Options 02 & 03: Garden Services & Corporate Gifting */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Option 2: Garden Services */}
          <div
            onClick={() => setActiveSection('services')}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              activeSection === 'services'
                ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                : 'bg-white/80 hover:bg-white text-stone-800 border-stone-200/90 shadow-2xs hover:shadow-soft'
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  activeSection === 'services' ? 'text-amber-300' : 'text-stone-400'
                }`}>
                  Option 02
                </span>
                <span className={`text-[10px] px-2 py-0.2 rounded-full ${
                  activeSection === 'services' ? 'bg-stone-800 text-amber-300' : 'bg-stone-100 text-stone-600'
                }`}>
                  Turnkey Services
                </span>
              </div>
              <h4 className="font-serif font-bold text-base">
                🏡 Garden Services &amp; AMC Maintenance
              </h4>
              <p className={`text-xs mt-0.5 line-clamp-1 ${
                activeSection === 'services' ? 'text-stone-300' : 'text-stone-500'
              }`}>
                Balcony makeovers, terrace setup, and monthly horticulturist visits.
              </p>
            </div>
            <ArrowRight className={`w-4 h-4 shrink-0 ml-3 ${
              activeSection === 'services' ? 'text-amber-300' : 'text-stone-400'
            }`} />
          </div>

          {/* Option 3: Corporate Gifting */}
          <div
            onClick={() => setActiveSection('corporate')}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              activeSection === 'corporate'
                ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                : 'bg-white/80 hover:bg-white text-stone-800 border-stone-200/90 shadow-2xs hover:shadow-soft'
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  activeSection === 'corporate' ? 'text-amber-300' : 'text-stone-400'
                }`}>
                  Option 03
                </span>
                <span className={`text-[10px] px-2 py-0.2 rounded-full ${
                  activeSection === 'corporate' ? 'bg-stone-800 text-amber-300' : 'bg-stone-100 text-stone-600'
                }`}>
                  Bulk Custom
                </span>
              </div>
              <h4 className="font-serif font-bold text-base">
                🎁 Corporate Botanical Gifting
              </h4>
              <p className={`text-xs mt-0.5 line-clamp-1 ${
                activeSection === 'corporate' ? 'text-stone-300' : 'text-stone-500'
              }`}>
                Eco-gift live succulent sets, laser-engraved pots, and luxury hampers.
              </p>
            </div>
            <ArrowRight className={`w-4 h-4 shrink-0 ml-3 ${
              activeSection === 'corporate' ? 'text-amber-300' : 'text-stone-400'
            }`} />
          </div>

        </div>

      </div>
    </section>
  );
};
