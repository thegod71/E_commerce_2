import React, { useState, useEffect } from 'react';
import { Check, Calendar } from 'lucide-react';
import { api } from '../services/api';
import { useUI } from '../context/UIContext';

export const GardenServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openEnquiry } = useUI();

  useEffect(() => {
    api.getGardenServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-10 sm:py-14 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Header */}
      <div className="pb-6 border-b border-stone-200 mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full">
          Option 2 • Atelier Landscape &amp; Upkeep
        </span>
        <h2 className="font-serif text-3xl font-bold text-stone-900 mt-2">
          Professional Gardening Services
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
          From apartment balcony transformations to rooftop gardens and bi-weekly plant health doctor visits.
        </p>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="py-16 text-center text-stone-400">
          <div className="w-8 h-8 border-3 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <span className="text-xs">Loading garden services...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Service Photo */}
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  {srv.hindiTitle && (
                    <span className="text-xs font-serif text-amber-300 block mb-0.5">
                      {srv.hindiTitle}
                    </span>
                  )}
                  <h3 className="font-serif text-lg font-bold leading-tight">
                    {srv.title}
                  </h3>
                </div>
              </div>

              {/* Service Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {srv.description}
                  </p>

                  <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-100 mb-5">
                    <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-2">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-stone-600">
                      {srv.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price & Enquiry CTA */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase font-medium">Starting from</span>
                    <span className="font-serif text-xl font-bold text-stone-900">
                      ₹{srv.priceStartingFrom.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => openEnquiry('Garden Services')}
                    className="flex items-center gap-1.5 bg-emerald-900 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-amber-300" />
                    <span>Enquire Now</span>
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
