import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { api } from '../services/api';

export const EnquiryModal = () => {
  const { isEnquiryOpen, closeEnquiry, enquiryDefaultType, showToast } = useUI();
  const [loading, setLoading] = useState(false);
  const [confirmedRef, setConfirmedRef] = useState(null);

  const [formData, setFormData] = useState({
    name: 'Vikram Mehta',
    phone: '9845098450',
    email: 'vikram.mehta@example.com',
    type: enquiryDefaultType || 'General',
    message: 'Looking for consultation on balcony makeover and potted flowering plants.'
  });

  // Sync default type when opened
  useEffect(() => {
    if (enquiryDefaultType) {
      setFormData((prev) => ({ ...prev, type: enquiryDefaultType }));
    }
  }, [enquiryDefaultType]);

  if (!isEnquiryOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      showToast('Please provide your name, phone and message.', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await api.submitEnquiry(formData);
      if (res.success) {
        setConfirmedRef(res.enquiryRef);
        showToast(res.message, 'success');
      }
    } catch {
      showToast('Error sending enquiry. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setConfirmedRef(null);
    closeEnquiry();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/65 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-100 overflow-hidden relative">
        
        {/* Header */}
        <div className="p-5 bg-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-300" />
            <h3 className="font-serif text-lg font-bold">
              {confirmedRef ? 'Enquiry Received' : 'Direct Service & Product Enquiry'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-stone-300 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {confirmedRef ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-stone-900">
                Thank You, {formData.name}!
              </h4>
              <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                Reference ID: <strong className="font-mono text-emerald-900">{confirmedRef}</strong>. Our botanical specialist will call you directly at <strong>+91 {formData.phone}</strong> within 2 hours.
              </p>
              <button
                onClick={handleClose}
                className="bg-emerald-900 text-white text-xs font-semibold px-6 py-2.5 rounded-xl cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full py-2 px-3 border border-stone-200 rounded-xl bg-stone-50 focus:bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Phone Number (+91) *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full py-2 px-3 border border-stone-200 rounded-xl bg-stone-50 focus:bg-white font-mono text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full py-2 px-3 border border-stone-200 rounded-xl bg-stone-50 focus:bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Requirement Category</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full py-2 px-3 border border-stone-200 rounded-xl bg-stone-50 text-xs"
                  >
                    <option value="Garden Services">🏡 Garden Services (Balcony / Terrace)</option>
                    <option value="Corporate Gifting">🎁 Corporate Gifting &amp; Bulk Hampers</option>
                    <option value="Bulk Plants & Flowers">🌸 Bulk Plants, Flowers &amp; Pots</option>
                    <option value="General">🌿 General Questions</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Your Message or Custom Request *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your space size, required plant varieties, or corporate quantity..."
                  className="w-full p-2.5 border border-stone-200 rounded-xl bg-stone-50 focus:bg-white text-xs resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-emerald-900 hover:bg-emerald-800 text-white font-semibold py-2.5 px-6 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-60"
                >
                  {loading ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5 text-amber-300" />
                  )}
                  <span>Submit Enquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
