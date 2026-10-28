import React, { useState } from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';

export const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { showToast, openProductDetail } = useUI();

  const hasSecondary = Boolean(product.secondaryImage);
  const currentImg = isHovered && product.secondaryImage ? product.secondaryImage : product.image;

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`Added ${product.name} to bag. Instant checkout open!`, 'success');
  };

  return (
    <div
      onClick={() => openProductDetail(product)}
      onMouseEnter={() => hasSecondary && setIsHovered(true)}
      onMouseLeave={() => hasSecondary && setIsHovered(false)}
      className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-stone-400 shadow-soft hover:shadow-luxury transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Visual Canvas with Dual Image Angle Hover */}
      <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
        <img
          src={currentImg}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          <span className="bg-stone-900 text-amber-300 text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded shadow-xs">
            {product.arrangementStyle}
          </span>
          {product.tag && (
            <span className="bg-white/95 text-stone-900 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
              {product.tag}
            </span>
          )}
        </div>

        {/* Quick View Pill on Hover */}
        <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/90 backdrop-blur-md text-stone-900 text-xs font-semibold px-4 py-2 rounded-xl shadow-md flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </span>
        </div>

        {hasSecondary && (
          <span className="absolute bottom-2.5 right-2.5 bg-black/50 backdrop-blur-xs text-white text-[9px] font-medium px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Hover Angle
          </span>
        )}
      </div>

      {/* Details & Composition */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Arrangement Details Pill */}
          <div className="flex items-center justify-between text-[10px] tracking-wider text-stone-500 uppercase font-semibold mb-1">
            <span>{product.stemCount || product.potType}</span>
            <span className="text-emerald-700 font-medium">Ready for Dispatch</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug group-hover:text-stone-700 transition-colors">
            {product.name}
          </h3>
          {product.hindiName && (
            <p className="text-xs font-serif text-amber-800 font-medium mb-2">
              {product.hindiName}
            </p>
          )}

          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>

          {/* Composition Chips */}
          {product.bloomsComposition && product.bloomsComposition.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {product.bloomsComposition.map((comp, idx) => (
                <span
                  key={idx}
                  className="bg-stone-50 border border-stone-200 text-[10px] text-stone-600 px-2 py-0.5 rounded"
                >
                  {comp}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price & Immediate Buy Now Button */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-xl font-bold text-stone-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-400 block -mt-0.5">Taxes included</span>
          </div>

          <button
            onClick={handleBuyNow}
            className="flex items-center gap-1.5 bg-stone-900 hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-xs cursor-pointer group-hover:bg-black"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
