import React, { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { FloralArrangementStudio } from '../components/FloralArrangementStudio';
import { ProductCard } from '../components/ProductCard';
import { api } from '../services/api';
import { useUI } from '../context/UIContext';

export const HomePage = () => {
  const { setActiveSection } = useUI();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    setLoading(true);
    api.getProducts().then((data) => {
      if (activeFilter === 'all') {
        setProducts(data);
      } else {
        setProducts(data.filter((p) => p.category === activeFilter));
      }
      setLoading(false);
    });
  }, [activeFilter]);

  return (
    <div>
      {/* 1. Airy Minimalist Hero with Floating Photo Cards */}
      <Hero />

      {/* 2. Main Curation Section */}
      <section className="py-10 sm:py-14 max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Interactive Floral Studio */}
        <FloralArrangementStudio />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-stone-200 gap-4 mb-8">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-stone-500 font-bold uppercase block mb-1">
              OPTION 01 • CURATED BOTANICAL INVENTORY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">
              Featured Flowers, Plants &amp; Artisanal Pots
            </h2>
            <p className="text-xs text-stone-500 mt-1 max-w-xl">
              Handpicked artisanal curations ready for same-day dispatch. Click any item to inspect specifications or buy now.
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Curations' },
              { id: 'flowers', label: '🌸 Flowers' },
              { id: 'plants', label: '🌿 Plants' },
              { id: 'pots', label: '🪴 Pots' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
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

        {/* Products Grid */}
        {loading ? (
          <div className="py-20 text-center text-stone-400">
            <div className="w-8 h-8 border-2 border-stone-900 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <span className="text-xs tracking-wider uppercase">Loading artisanal inventory...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
