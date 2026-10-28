import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext(undefined);

export const UIProvider = ({ children }) => {
  const [activeSection, setActiveSectionState] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryDefaultType, setEnquiryDefaultType] = useState('General');
  const [toasts, setToasts] = useState([]);

  const setActiveSection = (sec) => {
    setSelectedProduct(null); // Return from product detail back to page
    setActiveSectionState(sec);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const openEnquiry = (type = 'General') => {
    setEnquiryDefaultType(type);
    setIsEnquiryOpen(true);
  };

  const closeEnquiry = () => {
    setIsEnquiryOpen(false);
  };

  const showToast = (message, type = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <UIContext.Provider
      value={{
        activeSection,
        setActiveSection,
        selectedProduct,
        openProductDetail,
        closeProductDetail,
        isEnquiryOpen,
        enquiryDefaultType,
        openEnquiry,
        closeEnquiry,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within UIProvider');
  return context;
};
