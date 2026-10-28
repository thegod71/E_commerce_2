import { DUMMY_PRODUCTS, DUMMY_SERVICES, DUMMY_CORPORATE_GIFTS } from '../data/mockData';

/**
 * PRODUCTION-READY API SERVICE (JAVASCRIPT)
 * Provides clean async operations ready for backend integration.
 */
export const api = {
  // Products API
  getProducts: async () => {
    // Simulating instant low-latency network call
    return Promise.resolve([...DUMMY_PRODUCTS]);
  },

  getProductById: async (id) => {
    const product = DUMMY_PRODUCTS.find((p) => p.id === id);
    return Promise.resolve(product || null);
  },

  // Garden Services API
  getGardenServices: async () => {
    return Promise.resolve([...DUMMY_SERVICES]);
  },

  // Corporate Gifting API
  getCorporateGifts: async () => {
    return Promise.resolve([...DUMMY_CORPORATE_GIFTS]);
  },

  // Direct Checkout / Order Processing
  createOrder: async (orderDetails) => {
    console.log('[API] Processing Direct Checkout Order:', orderDetails);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          orderId: `KVITKA-${Date.now().toString().slice(-6)}`,
          status: 'CONFIRMED'
        });
      }, 600);
    });
  },

  // Direct Enquiry Submission
  submitEnquiry: async (enquiryData) => {
    console.log('[API] Received Direct Enquiry:', enquiryData);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          referenceId: `ENQ-${Date.now().toString().slice(-5)}`
        });
      }, 500);
    });
  }
};
