import React, { useState, useEffect } from 'react';
import { Check, Building2 } from 'lucide-react';
import { api } from '../services/api';
import { useUI } from '../context/UIContext';

export const CorporateGifting = () => {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openEnquiry } = useUI();

  useEffect(() => {
    api.getCorporateGifts().then((data) => {
      setGifts(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-10 sm:py-14 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Header */}
      <div className="pb-6 border-b border-stone-200 mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full">
          Option 3 • Corporate &amp; Bulk Green Gifting
        </span>
        <h2 className="font-serif text-3xl font-bold text-stone-900 mt-2">
          Sustainable Corporate Gifting &amp; Hampers
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
          Replace plastic swag with living desk plants, handcrafted Moradabad brass diyas, and preserved floral trunks with GST invoicing.
        </p>
      </div>

      {/* Gifts Grid */}
      {loading ? (
        <div className="py-16 text-center text-stone-400">
          <div className="w-8 h-8 border-3 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <span className="text-xs">Loading corporate packages...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {gifts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-white/95 text-stone-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  Min. {item.minOrderQuantity} Units
                </span>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-serif text-lg font-bold leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-100 mb-5">
                    <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-2">
                      Corporate Inclusions:
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

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase font-medium">Estimated</span>
                    <span className="font-serif text-xl font-bold text-stone-900">
                      ₹{item.pricePerUnit.toLocaleString('en-IN')}{' '}
                      <span className="text-xs font-normal text-stone-500">/ unit</span>
                    </span>
                  </div>

                  <button
                    onClick={() => openEnquiry('Corporate Gifting')}
                    className="flex items-center gap-1.5 bg-emerald-900 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>Get Quote</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
