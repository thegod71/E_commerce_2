import React, { useState, useEffect } from 'react';
import { Gift, Check, Building2, Truck, Receipt } from 'lucide-react';
import { api } from '../services/api';
import { useUI } from '../context/UIContext';
import flowersBg from '../assets/flowers_category_bg.jpg';
import botanicalBg from '../assets/botanical_luxury_bg.jpg';

export const CorporateGiftingPage = () => {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openEnquiry, setActiveSection } = useUI();

  useEffect(() => {
    api.getCorporateGifts().then((data) => {
      setGifts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen">
      
      {/* 1. Category Header with Split Editorial Layout: 100% Crisp Text on Left, Framed Gifting Showcase on Right */}
      <section className="relative py-10 sm:py-16 border-b border-stone-200/90 bg-[#FAF8F5] overflow-hidden">
        {/* Soft Ambient Leaf Shadow */}
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
            <span className="font-semibold text-stone-900">🎁 Corporate Gifting</span>
            <span className="ml-auto text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-medium">
              ● 18% GST Input Invoicing Included
            </span>
          </div>

          {/* 2-Column Split: Clean Left Panel + Right Image Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: 100% Crisp & High-Contrast Typography */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-stone-200 shadow-2xs mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                <span className="text-[10px] tracking-[0.25em] text-stone-700 font-bold uppercase">
                  OPTION 03 • CORPORATE &amp; BULK GREEN GIFTING
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-[1.15]">
                Sustainable Eco-Planters &amp; Luxury Corporate Hampers
              </h1>

              <p className="mt-4 text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xl">
                Replace plastic novelty merchandise with carbon-conscious living desk greens, Moradabad brass diyas, and everlasting preserved Ecuadorian roses. Precision laser-engraved with your enterprise logo.
              </p>

              {/* Reassurance Trust Pills */}
              <div className="flex flex-wrap items-center gap-3 mt-6 text-xs text-stone-700 font-medium">
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-2xs">
                  <Truck className="w-4 h-4 text-amber-700" />
                  <span>Pan-India Door-to-Door Delivery</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-2xs">
                  <Receipt className="w-4 h-4 text-emerald-700" />
                  <span>Official B2B GST Tax Invoicing</span>
                </span>
              </div>
            </div>

            {/* Right Column: High-Resolution Photographic Corporate Showcase */}
            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-3xl overflow-hidden bg-white shadow-luxury border border-stone-200/90 group">
                <img
                  src={flowersBg}
                  alt="Corporate Gifting Atelier"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="bg-white/95 backdrop-blur-md text-stone-900 text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                    Corporate Atelier
                  </span>
                  <span className="text-[11px] font-medium text-white/95 drop-shadow-sm">
                    Custom Laser Engraved
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Packages Grid */}
      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-6 border-b border-stone-200 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900">
              Curated Corporate Collections
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Available with personalized sleeve packaging and custom brand messaging cards.
            </p>
          </div>
          <button
            onClick={() => openEnquiry('Corporate Gifting')}
            className="self-start sm:self-auto bg-stone-900 hover:bg-black text-white text-xs font-semibold px-4 py-2.5 rounded-xl uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-xs"
          >
            <Building2 className="w-3.5 h-3.5 text-amber-300" />
            <span>Download Catalog PDF &amp; Quote</span>
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-stone-400">
            <div className="w-8 h-8 border-2 border-stone-900 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <span className="text-xs tracking-wider uppercase">Loading corporate hampers...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {gifts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-soft hover:shadow-luxury transition-all flex flex-col justify-between"
              >
                {/* Photo & Min Order Badge */}
                <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-white/95 text-stone-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                    Min. {item.minOrderQuantity} Units
                  </span>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-serif text-lg font-bold leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Features */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-100 mb-5">
                      <span className="text-[10px] font-bold text-stone-700 uppercase tracking-wider block mb-2">
                        Executive Inclusions:
                      </span>
                      <ul className="space-y-1.5 text-xs text-stone-600">
                        {item.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-stone-400 block uppercase font-medium">Per Unit</span>
                      <span className="font-serif text-xl font-bold text-stone-900">
                        ₹{item.pricePerUnit.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={() => openEnquiry('Corporate Gifting')}
                      className="bg-stone-900 hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Gift className="w-3.5 h-3.5 text-amber-300" />
                      <span>Order Samples</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
