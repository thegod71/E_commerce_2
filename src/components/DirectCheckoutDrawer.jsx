import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ShieldCheck, CheckCircle2, Smartphone, CreditCard, Banknote } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { api } from '../services/api';

export const DirectCheckoutDrawer = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    total
  } = useCart();
  const { showToast } = useUI();

  const [loading, setLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  // Direct checkout customer form
  const [customerName, setCustomerName] = useState('Ananya Sharma');
  const [phone, setPhone] = useState('9876543210');
  const [address, setAddress] = useState('Flat 402, Green Glen Layout, Bellandur');
  const [city, setCity] = useState('Bengaluru');
  const [pincode, setPincode] = useState('560103');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('ananya@okhdfcbank');

  if (!isCartOpen) return null;

  const handleDirectPay = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!customerName || !phone || !address || !pincode) {
      showToast('Please enter your full delivery address and contact number.', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await api.placeDirectOrder({
        customerName,
        phone,
        address,
        city,
        pincode,
        items,
        subtotal,
        deliveryFee,
        total,
        paymentMethod
      });

      if (res.success) {
        setOrderConfirmed(res.orderId);
        clearCart();
        showToast('Payment initiated! Order placed successfully.', 'success');
      }
    } catch {
      showToast('Could not process order. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOrderConfirmed(null);
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dim backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-900" />
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {orderConfirmed ? 'Order Confirmed' : 'Direct Cart & Instant Payment'}
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
            {orderConfirmed ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-stone-900">
                  Payment Successful!
                </h4>
                <p className="text-xs text-stone-600">
                  Order Reference: <strong className="font-mono text-emerald-900">{orderConfirmed}</strong>
                </p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  We have dispatched confirmation to +91 {phone}. Your fresh plants and pots are being hand-packed.
                </p>
                <button
                  onClick={handleClose}
                  className="bg-emerald-900 text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 text-stone-500 text-sm">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                Your basket is empty. Browse our plants, flowers, and pots!
              </div>
            ) : (
              <>
                {/* 1. Items in Basket */}
                <div>
                  <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-2">
                    Selected Items ({items.reduce((s, i) => s + i.quantity, 0)})
                  </span>
                  <div className="divide-y divide-stone-100">
                    {items.map(({ product, quantity }) => (
                      <div key={product.id} className="py-2.5 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg border border-stone-200"
                          />
                          <div>
                            <h4 className="font-semibold text-xs text-stone-900 line-clamp-1">
                              {product.name}
                            </h4>
                            <span className="text-[11px] text-stone-500 font-mono">
                              ₹{product.price.toLocaleString('en-IN')} each
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-stone-200 rounded-lg text-xs bg-stone-50">
                            <button
                              onClick={() => updateQuantity(product.id, -1)}
                              className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 font-bold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-1.5 font-semibold">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(product.id, 1)}
                              className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 font-bold cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Direct Shipping Form */}
                <form id="direct-pay-form" onSubmit={handleDirectPay} className="space-y-3 pt-3 border-t border-stone-100">
                  <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block">
                    Direct Delivery Address:
                  </span>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] font-semibold text-stone-600 mb-0.5">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full py-1.5 px-2.5 border border-stone-200 rounded-lg bg-stone-50 focus:bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-stone-600 mb-0.5">Phone (+91) *</label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full py-1.5 px-2.5 border border-stone-200 rounded-lg bg-stone-50 focus:bg-white font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block text-[10px] font-semibold text-stone-600 mb-0.5">Full Street Address *</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Flat, building, street, area"
                      className="w-full py-1.5 px-2.5 border border-stone-200 rounded-lg bg-stone-50 focus:bg-white text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] font-semibold text-stone-600 mb-0.5">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full py-1.5 px-2.5 border border-stone-200 rounded-lg bg-stone-50 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-stone-600 mb-0.5">Pincode *</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full py-1.5 px-2.5 border border-stone-200 rounded-lg bg-stone-50 font-mono text-xs"
                      />
                    </div>
                  </div>

                  {/* 3. Direct Payment Gateway Options */}
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                      Select Payment Mode:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          paymentMethod === 'upi'
                            ? 'border-emerald-900 bg-emerald-950 text-white font-semibold'
                            : 'border-stone-200 bg-stone-50 text-stone-700'
                        }`}
                      >
                        <Smartphone className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                        <span className="text-[10px] block leading-tight">Instant UPI</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          paymentMethod === 'card'
                            ? 'border-emerald-900 bg-emerald-950 text-white font-semibold'
                            : 'border-stone-200 bg-stone-50 text-stone-700'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                        <span className="text-[10px] block leading-tight">Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          paymentMethod === 'cod'
                            ? 'border-emerald-900 bg-emerald-950 text-white font-semibold'
                            : 'border-stone-200 bg-stone-50 text-stone-700'
                        }`}
                      >
                        <Banknote className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                        <span className="text-[10px] block leading-tight">Pay on Delivery</span>
                      </button>
                    </div>

                    {paymentMethod === 'upi' && (
                      <div className="mt-2 text-xs">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="your-upi-id@bank"
                          className="w-full py-1.5 px-2.5 border border-stone-200 rounded-lg text-xs font-mono"
                        />
                      </div>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer & Direct Pay Button */}
          {!orderConfirmed && items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              <div className="space-y-1 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Express Delivery</span>
                  <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-1.5 border-t border-stone-200">
                  <span>Total Amount</span>
                  <span className="font-serif text-base text-emerald-950">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="submit"
                form="direct-pay-form"
                disabled={loading}
                className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-semibold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                )}
                <span>Direct Pay &amp; Place Order (₹{total.toLocaleString('en-IN')})</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
