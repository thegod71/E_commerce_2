import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, ShieldCheck, Clock, ArrowRight, Check } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { useCart } from '../context/CartContext';

export const ProductDetailPage = () => {
  const { selectedProduct, closeProductDetail, showToast } = useUI();
  const { addToCart } = useCart();
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeProductDetail();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeProductDetail]);

  if (!selectedProduct) return null;

  const images = [
    selectedProduct.image,
    ...(selectedProduct.secondaryImage ? [selectedProduct.secondaryImage] : [])
  ];

  const currentPrice = selectedProduct.sizes && selectedProduct.sizes.length > 0
    ? selectedProduct.sizes[selectedSizeIndex].price
    : selectedProduct.price;

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    showToast(`Added ${selectedProduct.name} to your bag! Instant payment drawer open.`, 'success');
    closeProductDetail();
  };

  const categoryLabel = 
    selectedProduct.category === 'flowers' ? 'Fresh Flowers' :
    selectedProduct.category === 'plants' ? 'Living Plants' : 'Pots & Planters';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      
      {/* Background shadow & ambient leaf vignette */}
      <div 
        onClick={closeProductDetail} 
        className="absolute inset-0 bg-gradient-to-tr from-stone-950/80 via-stone-900/60 to-stone-950/80" 
      />

      {/* Main Luxury Modal Card */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl max-w-4xl w-full my-4 sm:my-6 shadow-2xl border border-stone-200/80 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Top Back & Close Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-stone-100 bg-stone-50/60">
          <button
            onClick={closeProductDetail}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 uppercase tracking-wider transition-colors cursor-pointer"
          >
            <span>← Back to {categoryLabel}</span>
          </button>

          <button
            onClick={closeProductDetail}
            className="p-1.5 rounded-full bg-white hover:bg-stone-200 text-stone-600 hover:text-stone-900 shadow-xs transition-colors cursor-pointer"
            aria-label="Close page"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Image Canvas & Angle Thumbnails */}
          <div className="md:col-span-6 bg-stone-50/70 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-100">
            <div>
              <div className="relative aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden bg-white shadow-soft border border-stone-200/80 mb-4">
                <img
                  src={images[selectedImageIndex] || selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Arrangement Style Tag */}
                <span className="absolute top-3 left-3 bg-stone-900 text-amber-300 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-md shadow-xs">
                  {selectedProduct.arrangementStyle}
                </span>

                {selectedProduct.tag && (
                  <span className="absolute bottom-3 left-3 bg-white/95 text-stone-900 text-[10px] font-semibold px-2.5 py-1 rounded-md shadow-xs">
                    {selectedProduct.tag}
                  </span>
                )}
              </div>

              {/* Thumbnails if secondary image exists */}
              {images.length > 1 && (
                <div className="flex gap-2.5">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImageIndex === idx ? 'border-stone-900 scale-105 shadow-xs' : 'border-stone-200 opacity-60'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Delivery Guarantee Pill */}
            <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1.5 text-stone-700 font-medium">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Same-Day Dispatch</span>
              </span>
              <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>100% Freshness Guarantee</span>
              </span>
            </div>
          </div>

          {/* Right Column: Editorial Arrangement Details & Direct Purchase */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Arrangement */}
              <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-stone-400 uppercase mb-1">
                <span>{selectedProduct.category}</span>
                <span>{selectedProduct.stemCount || selectedProduct.potType}</span>
              </div>

              {/* Title & Hindi Script */}
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {selectedProduct.name}
              </h1>
              {selectedProduct.hindiName && (
                <p className="font-serif text-sm text-amber-800 font-medium mt-0.5 mb-3">
                  {selectedProduct.hindiName}
                </p>
              )}

              {/* Price Display */}
              <div className="flex items-baseline gap-2 pb-4 border-b border-stone-100">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-[11px] text-stone-400 ml-1">Inclusive of GST</span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed my-4">
                {selectedProduct.description}
              </p>

              {/* Composition Breakdown */}
              {selectedProduct.bloomsComposition && selectedProduct.bloomsComposition.length > 0 && (
                <div className="mb-4 bg-stone-50 p-3.5 rounded-2xl border border-stone-100">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
                    Arrangement &amp; Vessel Details:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProduct.bloomsComposition.map((comp, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-700 bg-white px-2.5 py-1 rounded-lg border border-stone-200"
                      >
                        <Check className="w-3 h-3 text-emerald-700" />
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Tiers (if applicable) */}
              {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
                    Choose Arrangement Size:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {selectedProduct.sizes.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedSizeIndex === idx
                            ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                            : 'border-stone-200 bg-stone-50 text-stone-800 hover:bg-stone-100'
                        }`}
                      >
                        <span className="text-[11px] font-semibold block">{s.name}</span>
                        <span className="text-xs font-mono font-bold block mt-0.5">
                          ₹{s.price.toLocaleString('en-IN')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-3 my-4">
                <span className="text-xs font-semibold text-stone-600">Quantity:</span>
                <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 text-xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 font-bold hover:bg-stone-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 font-semibold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 font-bold hover:bg-stone-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Pay Action Button */}
            <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-stone-900 hover:bg-black text-white font-semibold py-3.5 px-6 rounded-xl text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                <span>Buy Now &amp; Direct Pay • ₹{(currentPrice * quantity).toLocaleString('en-IN')}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
