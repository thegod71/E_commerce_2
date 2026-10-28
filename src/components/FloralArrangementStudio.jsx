import React, { useState } from 'react';
import { Sparkles, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';

const FLORAL_CHOICES = [
  {
    id: 'roses',
    name: 'Velvety Crimson Dutch Roses',
    hindiName: 'शाही लाल गुलाब',
    stems: '30 Long-Stem Roses + Eucalyptus',
    basePrice: 1999,
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'marigold',
    name: 'Vaidika Marigold & Rajnigandha',
    hindiName: 'गेंदा व रजनीगंधा',
    stems: '24 Tuberose Stems + Marigold Heads',
    basePrice: 1599,
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'pastel',
    name: 'Pastel Peach Roses & White Lilies',
    hindiName: 'पेस्टल गुलदस्ता',
    stems: '22 Fresh Farm Blooms',
    basePrice: 1699,
    image: 'https://images.unsplash.com/photo-1587556930799-8dca6a23dc41?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'jade',
    name: 'Auspicious Live Jade Plant',
    hindiName: 'कुबेर जेड पौधा',
    stems: 'Rooted 8-Inch Living Succulent',
    basePrice: 899,
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=500&q=80'
  }
];

const VESSEL_CHOICES = [
  {
    id: 'suede-box',
    name: 'Parisian Suede Hat Box',
    material: 'Luxury Ivory Suede with Hydration Sponge',
    extraPrice: 500,
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'brass-urli',
    name: 'Moradabad Pure Brass Urli',
    material: 'Hand-Chiseled Brass for Floating Stems',
    extraPrice: 400,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'korean-wrap',
    name: 'Korean Sculptural Matte Wrap',
    material: 'Double-Layer Waterproof Paper & Silk Ribbon',
    extraPrice: 300,
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'terracotta-urn',
    name: 'Handcrafted Terracotta Urn',
    material: 'Unglazed Porous Rajasthani Clay',
    extraPrice: 350,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80'
  }
];

export const FloralArrangementStudio = () => {
  const [selectedFloral, setSelectedFloral] = useState(FLORAL_CHOICES[0]);
  const [selectedVessel, setSelectedVessel] = useState(VESSEL_CHOICES[0]);
  const [sizeMultiplier, setSizeMultiplier] = useState('Standard');

  const { addToCart } = useCart();
  const { showToast } = useUI();

  const calculatedPrice = 
    sizeMultiplier === 'Standard'
      ? selectedFloral.basePrice + selectedVessel.extraPrice
      : Math.round((selectedFloral.basePrice + selectedVessel.extraPrice) * 1.45);

  const handleOrderCustomArrangement = () => {
    const customProduct = {
      id: `custom-${Date.now().toString().slice(-5)}`,
      name: `${selectedFloral.name} in ${selectedVessel.name}`,
      hindiName: `${selectedFloral.hindiName}`,
      category: selectedFloral.id === 'jade' ? 'plants' : 'flowers',
      arrangementStyle: selectedVessel.id === 'suede-box' 
        ? 'Signature Hat Box' 
        : selectedVessel.id === 'brass-urli' 
        ? 'Brass Urli & Bowl' 
        : 'Hand-Tied Bouquet',
      price: calculatedPrice,
      originalPrice: Math.round(calculatedPrice * 1.2),
      description: `Bespoke artisanal floral arrangement. Fresh ${selectedFloral.name} (${selectedFloral.stems}) custom-assembled in ${selectedVessel.name} (${selectedVessel.material}).`,
      image: selectedFloral.image,
      secondaryImage: selectedVessel.image,
      inStock: true,
      tag: 'Bespoke Arrangement',
      potType: selectedVessel.name,
      stemCount: selectedFloral.stems,
      bloomsComposition: [selectedFloral.name, selectedVessel.material]
    };

    addToCart(customProduct, 1);
    showToast(`Assembled custom arrangement: ${customProduct.name}! Direct payment open.`, 'success');
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 mb-12">
      
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-stone-900 text-amber-300 text-[10px] font-bold tracking-widest uppercase mb-2">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Interactive Floral &amp; Pot Atelier</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900">
            Design Your Floral &amp; Planter Arrangement
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Pair your preferred farm-fresh blooms or living green with an artisanal vessel or planter.
          </p>
        </div>

        {/* Size Tier Pill */}
        <div className="flex items-center bg-stone-100 p-1 rounded-xl self-start sm:self-auto text-xs font-semibold">
          <button
            onClick={() => setSizeMultiplier('Standard')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              sizeMultiplier === 'Standard' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Classic Size
          </button>
          <button
            onClick={() => setSizeMultiplier('Grand Luxe')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              sizeMultiplier === 'Grand Luxe' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Grand Luxe (+45% Stems)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
        
        {/* Step 1 & 2 Selectors */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Select Flora / Plant Base */}
          <div>
            <span className="text-[11px] font-bold tracking-wider text-stone-500 uppercase block mb-2.5">
              1. Choose Floral Stems or Living Plant:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {FLORAL_CHOICES.map((f) => {
                const isSelected = selectedFloral.id === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFloral(f)}
                    className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-stone-900 bg-stone-50/80 ring-1 ring-stone-900'
                        : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <img
                      src={f.image}
                      alt={f.name}
                      className="w-full h-16 object-cover rounded-lg mb-2"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-xs text-stone-900 line-clamp-1">
                        {f.name}
                      </h4>
                      <span className="text-[10px] text-stone-500 block truncate font-mono">
                        ₹{f.basePrice}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Vessel / Pot */}
          <div>
            <span className="text-[11px] font-bold tracking-wider text-stone-500 uppercase block mb-2.5">
              2. Choose Arrangement Vessel / Planter:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {VESSEL_CHOICES.map((v) => {
                const isSelected = selectedVessel.id === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVessel(v)}
                    className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-stone-900 bg-stone-50/80 ring-1 ring-stone-900'
                        : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <img
                      src={v.image}
                      alt={v.name}
                      className="w-full h-16 object-cover rounded-lg mb-2"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-xs text-stone-900 line-clamp-1">
                        {v.name}
                      </h4>
                      <span className="text-[10px] text-stone-500 block truncate font-mono">
                        +₹{v.extraPrice}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Assembled Arrangement Preview Card */}
        <div className="lg:col-span-5 bg-stone-50 rounded-2xl p-6 border border-stone-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 pb-3 border-b border-stone-200">
              <span className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                Live Assembled Preview
              </span>
              <span className="text-emerald-700 font-semibold text-[11px]">Freshness Guaranteed</span>
            </div>

            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-stone-200 border border-stone-300">
                <img
                  src={selectedFloral.image}
                  alt={selectedFloral.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden bg-stone-200 border border-stone-300">
                <img
                  src={selectedVessel.image}
                  alt={selectedVessel.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h4 className="font-serif text-lg font-bold text-stone-900">
              {selectedFloral.name}
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Vessel: <strong className="text-stone-800">{selectedVessel.name}</strong> • {sizeMultiplier}
            </p>
            <p className="text-[11px] text-stone-400 mt-1">
              {selectedFloral.stems} • {selectedVessel.material}
            </p>
          </div>

          <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3 mt-4">
            <div>
              <span className="text-[10px] text-stone-400 block uppercase">Total Arrangement Price</span>
              <span className="font-serif text-2xl font-bold text-stone-900">
                ₹{calculatedPrice.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={handleOrderCustomArrangement}
              className="bg-stone-900 hover:bg-black text-white px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
              <span>Direct Checkout</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
