import React, { useState, useEffect } from 'react';
import { ShieldCheck, Droplets, Sun, Wind, Sprout } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { api } from '../services/api';
import { useUI } from '../context/UIContext';
import plantsBg from '../assets/plants_category_bg.jpg';
import botanicalBg from '../assets/botanical_luxury_bg.jpg';

export const PlantsPage = () => {
  const { setActiveSection } = useUI();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    setLoading(true);
    api.getProducts().then((data) => {
      const plants = data.filter((p) => p.category === 'plants');
      if (activeFilter === 'all') {
        setProducts(plants);
      } else {
        setProducts(plants.filter((p) => p.tag?.toLowerCase().includes(activeFilter.toLowerCase())));
      }
      setLoading(false);
    });
  }, [activeFilter]);

  const PLANT_TABS = [
    { id: 'all', label: 'All Living Plants' },
    { id: 'Vastu', label: '🌿 Vastu & Auspicious Greens' },
    { id: 'Air Purifier', label: '🍃 NASA Air Purifiers' },
    { id: 'Art', label: '🎋 Bonsai & Living Sculptures' },
  ];

  return (
    <div className="min-h-screen">
      
      {/* 1. Category Header with Split Editorial Layout: 100% Crisp Text on Left, Framed Conservatory on Right */}
      <section className="relative py-10 sm:py-16 border-b border-stone-200/90 bg-[#FAF8F5] overflow-hidden">
        {/* Soft Ambient Leaf Shadow (Same as Home Page) */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat opacity-15 mix-blend-multiply"
          style={{ backgroundImage: `url(${botanicalBg})` }}
        />
        <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#FAF8F5]/60 via-transparent to-[#FAF8F5]/90" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
            <button 
              onClick={() => setActiveSection('all')} 
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="font-semibold text-stone-900">🌿 Living Plants</span>
            <span className="ml-auto text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-medium">
              ● Rooted in Organic Vermicompost
            </span>
          </div>

          {/* 2-Column Split: Clean Left Panel + Right Image Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: 100% Crisp & High-Contrast Typography */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-stone-200 shadow-2xs mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-[10px] tracking-[0.25em] text-stone-700 font-bold uppercase">
                  OPTION 01 • BOTANICAL LIVING GREENS
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-[1.15]">
                Living Indoor Plants &amp; Vastu Sanctuaries
              </h1>

              <p className="mt-4 text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xl">
                Carefully acclimated, oxygenating indoor greens potted in handcrafted brass cachepots and breathable ceramic trays. Consecrated with natural vermicompost to flourish inside modern Indian homes.
              </p>

              {/* Reassurance Trust Pills */}
              <div className="flex flex-wrap items-center gap-3 mt-6 text-xs text-stone-700 font-medium">
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>30-Day Plant Health Guarantee</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-2xs">
                  <Wind className="w-4 h-4 text-amber-600" />
                  <span>NASA-Tested Air Purifiers</span>
                </span>
              </div>
            </div>

            {/* Right Column: High-Resolution Photographic Conservatory Showcase */}
            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-3xl overflow-hidden bg-white shadow-luxury border border-stone-200/90 group">
                <img
                  src={plantsBg}
                  alt="Living Plants Conservatory"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="bg-white/95 backdrop-blur-md text-stone-900 text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                    Greenhouse Conservatory
                  </span>
                  <span className="text-[11px] font-medium text-white/95 drop-shadow-sm">
                    Acclimated Botanicals
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Main Plants Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        
        {/* Style Filter Tabs Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900">
              Explore Living Plants
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Filtered for air purification, prosperity, and sculptural indoor beauty.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {PLANT_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Plants Grid */}
        {loading ? (
          <div className="py-20 text-center text-stone-400">
            <div className="w-8 h-8 border-2 border-stone-900 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <span className="text-xs tracking-wider uppercase">Loading rooted greens...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center text-stone-500 text-xs tracking-wider uppercase">
            No plants found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* 3. Plant Doctor Living Care Guide */}
        <div className="mt-16 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-soft">
          <div className="flex items-center gap-2 mb-3">
            <Sprout className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Plant Doctor • Essential Upkeep Principles
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4 pt-4 border-t border-stone-100 text-xs text-stone-600">
            <div className="flex gap-3">
              <Droplets className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-stone-900 mb-0.5">The 2-Inch Soil Check</h4>
                <p>Only water when the top 2 inches of potting mix feel dry to touch. Overwatering causes root rot.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Sun className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-stone-900 mb-0.5">Filtered Bright Light</h4>
                <p>Place within 3–5 feet of an east or north window. Protect tender foliage from harsh midday sun.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Wind className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-stone-900 mb-0.5">Foliage Dusting</h4>
                <p>Wipe leaves with a damp cloth once every fortnight to maintain maximum photosynthesis &amp; gloss.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
