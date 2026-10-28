import React, { useState, useEffect } from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { FloralArrangementStudio } from './FloralArrangementStudio';

export const ProductCatalog = () => {
  const { activeSection, setActiveSection, addToCart, showToast, openProductDetail } = {
    ...useUI(),
    ...useCart()
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeHoverImage, setActiveHoverImage] = useState({});

  // Sync internal selectedCategory with activeSection from global UIContext
  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (activeSection === 'flowers' || activeSection === 'plants' || activeSection === 'pots') {
      return activeSection;
    }
    return 'all';
  });

  useEffect(() => {
    if (activeSection === 'flowers' || activeSection === 'plants' || activeSection === 'pots') {
      setSelectedCategory(activeSection);
    } else if (activeSection === 'all') {
      setSelectedCategory('all');
    }
  }, [activeSection]);

  useEffect(() => {
    setLoading(true);
    api.getProducts().then((data) => {
      if (selectedCategory === 'all') {
        setProducts(data);
      } else if (selectedCategory === 'plants' || selectedCategory === 'flowers' || selectedCategory === 'pots') {
        setProducts(data.filter((p) => p.category === selectedCategory));
      } else {
        // Filter by arrangement style
        setProducts(data.filter((p) => p.arrangementStyle === selectedCategory));
      }
      setLoading(false);
    });
  }, [selectedCategory]);

  const handleTabClick = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'flowers' || catId === 'plants' || catId === 'pots' || catId === 'all') {
      setActiveSection(catId);
    }
  };

  const handleBuyNow = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`Added ${product.name} to bag. Instant checkout open!`, 'success');
  };

  const CATEGORY_TABS = [
    { id: 'all', label: 'All Curations' },
    { id: 'flowers', label: '🌸 Fresh Flowers' },
    { id: 'plants', label: '🌿 Living Plants' },
    { id: 'pots', label: '🪴 Pots & Planters' },
    { id: 'Signature Hat Box', label: 'Hat Box Arrangements' },
    { id: 'Brass Urli & Bowl', label: 'Brass Urli & Bowls' },
    { id: 'Hand-Tied Bouquet', label: 'Hand-Tied Wraps' },
  ];

  // Dynamic Header depending on current opened page
  const getPageInfo = () => {
    switch (selectedCategory) {
      case 'flowers':
        return {
          badge: 'OPTION 01 • FRESH FLOWER ATELIER',
          title: '🌸 Artisanal Fresh Flower Arrangements',
          desc: 'Velvety Dutch roses in Parisian suede hat boxes, holy marigold & rajnigandha brass urlis, and hand-tied Korean paper wraps with same-day delivery.',
          crumb: 'Fresh Flowers'
        };
      case 'plants':
        return {
          badge: 'OPTION 01 • BOTANICAL GREENS',
          title: '🌿 Living Indoor Plants & Vastu Greens',
          desc: 'NASA-approved air purifying snake plants, lucky jade succulents in antique brass, and mature 6-year ginseng bonsai trees.',
          crumb: 'Living Plants'
        };
      case 'pots':
        return {
          badge: 'OPTION 01 • ARTISANAL VESSELS',
          title: '🪴 Handcrafted Pots & Artisan Planters',
          desc: 'Rajasthan wheel-thrown porous terracotta, solid hand-chiseled Moradabad brass vessels, and Scandinavian fluted ceramic cachepots.',
          crumb: 'Pots & Planters'
        };
      default:
        return {
          badge: 'OPTION 01 • SIGNATURE CURATIONS',
          title: 'Artisanal Flower Arrangements, Plants & Pots',
          desc: 'Explore our complete botanical collection. Click any flower, plant, or pot to inspect detailed specifications, arrangement sizes, and checkout instantly.',
          crumb: 'All Curations'
        };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <section id="catalog-section" className="py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* 1. Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
        <button 
          onClick={() => handleTabClick('all')} 
          className="hover:text-stone-900 transition-colors"
        >
          Home
        </button>
        <span>/</span>
        <span className="font-semibold text-stone-900">{pageInfo.crumb}</span>
        <span className="ml-auto text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          ● Live Stock Ready to Dispatch
        </span>
      </div>

      {/* 2. Creative UI: Interactive Floral & Planter Arrangement Studio (Shown when exploring all or flowers) */}
      {(selectedCategory === 'all' || selectedCategory === 'flowers') && (
        <FloralArrangementStudio />
      )}

      {/* 3. Signature Catalog Header with Dynamic Title & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-stone-200 gap-4 mb-8">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-stone-500 font-bold uppercase block mb-1">
            {pageInfo.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">
            {pageInfo.title}
          </h2>
          <p className="text-xs text-stone-500 mt-1 max-w-xl leading-relaxed">
            {pageInfo.desc}
          </p>
        </div>

        {/* Clean Arrangement Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORY_TABS.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleTabClick(cat.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Products Grid with Click to Open Detail Page */}
      {loading ? (
        <div className="py-20 text-center text-stone-400">
          <div className="w-8 h-8 border-2 border-stone-900 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <span className="text-xs tracking-wider uppercase">Loading artisanal inventory...</span>
        </div>
      ) : products.length === 0 ? (
        <div className="py-16 text-center text-stone-500 text-xs tracking-wider uppercase">
          No arrangements found in this style.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((item) => {
            const hasSecondary = Boolean(item.secondaryImage);
            const isHovered = activeHoverImage[item.id];
            const currentImg = isHovered && item.secondaryImage ? item.secondaryImage : item.image;

            return (
              <div
                key={item.id}
                onClick={() => openProductDetail(item)}
                onMouseEnter={() => hasSecondary && setActiveHoverImage((p) => ({ ...p, [item.id]: true }))}
                onMouseLeave={() => hasSecondary && setActiveHoverImage((p) => ({ ...p, [item.id]: false }))}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-stone-400 shadow-soft hover:shadow-luxury transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Visual Canvas with Dual Image on Hover */}
                <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
                  <img
                    src={currentImg}
                    alt={item.name}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    <span className="bg-stone-900 text-amber-300 text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded shadow-xs">
                      {item.arrangementStyle}
                    </span>
                    {item.tag && (
                      <span className="bg-white/95 text-stone-900 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
                        {item.tag}
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
                      <span>{item.stemCount || item.potType}</span>
                      <span className="text-emerald-700 font-medium">Ready for Dispatch</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug group-hover:text-stone-700 transition-colors">
                      {item.name}
                    </h3>
                    {item.hindiName && (
                      <p className="text-xs font-serif text-amber-800 font-medium mb-2">
                        {item.hindiName}
                      </p>
                    )}

                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {/* Flower Composition Chips */}
                    {item.bloomsComposition && item.bloomsComposition.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.bloomsComposition.map((comp, idx) => (
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
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-stone-400 line-through">
                            ₹{item.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-400 block -mt-0.5">Taxes included</span>
                    </div>

                    <button
                      onClick={(e) => handleBuyNow(e, item)}
                      className="flex items-center gap-1.5 bg-stone-900 hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-xs cursor-pointer group-hover:bg-black"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
