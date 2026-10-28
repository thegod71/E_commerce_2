import React from 'react';
import { UIProvider, useUI } from './context/UIContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { DirectCheckoutDrawer } from './components/DirectCheckoutDrawer';
import { ProductDetailPage } from './components/ProductDetailPage';
import { EnquiryModal } from './components/EnquiryModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

// Dedicated Modular Pages
import { HomePage } from './pages/HomePage';
import { FlowersPage } from './pages/FlowersPage';
import { PlantsPage } from './pages/PlantsPage';
import { PotsPage } from './pages/PotsPage';
import { GardenServicesPage } from './pages/GardenServicesPage';
import { CorporateGiftingPage } from './pages/CorporateGiftingPage';

import botanicalBg from './assets/botanical_luxury_bg.jpg';

const MainLayout = () => {
  const { activeSection } = useUI();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 font-sans antialiased selection:bg-amber-200 selection:text-stone-900 relative overflow-x-hidden">
      
      {/* 1. Global Ambient Botanical Leaf Shadow Texture */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat opacity-15 mix-blend-multiply"
        style={{ backgroundImage: `url(${botanicalBg})` }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#FAF8F5]/70 via-transparent to-[#FAF8F5]/85" />

      {/* 2. Header Navigation */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* 3. Dedicated Category Pages with Individual Backgrounds & Clean UI */}
      <main id="main-content" className="flex-1 relative z-10">
        {activeSection === 'all' && <HomePage />}
        {activeSection === 'flowers' && <FlowersPage />}
        {activeSection === 'plants' && <PlantsPage />}
        {activeSection === 'pots' && <PotsPage />}
        {activeSection === 'services' && <GardenServicesPage />}
        {activeSection === 'corporate' && <CorporateGiftingPage />}
      </main>

      {/* 4. Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* 5. Direct Cart & Instant Payment Drawer */}
      <DirectCheckoutDrawer />

      {/* 6. Dedicated Product Detail Page View / Modal */}
      <ProductDetailPage />

      {/* 7. Simple Direct Enquiry Modal */}
      <EnquiryModal />

      {/* 8. Action Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <UIProvider>
      <CartProvider>
        <MainLayout />
      </CartProvider>
    </UIProvider>
  );
}
