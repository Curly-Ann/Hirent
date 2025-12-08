// Frontend API Configuration
// Centralized endpoint and configuration for all API calls

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API Endpoints - Organized by domain
export const ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    GOOGLE: '/auth/google',
    GOOGLE_CALLBACK: '/auth/google/callback'
  },

  // Items/Products
  ITEMS: {
    GET_ALL: '/items',
    GET_ONE: (id) => `/items/${id}`,
    SEARCH: '/items/search',
    FEATURED: '/items/featured',
    BY_OWNER: (ownerId) => `/items/owner/${ownerId}`,
    CREATE: '/items',
    UPDATE: (id) => `/items/${id}`,
    DELETE: (id) => `/items/${id}`
  },

  // Homepage & Discovery
  HOMEPAGE: {
    FEATURED_CATEGORIES: '/homepage/categories/featured',
    CATEGORY_ITEMS: (slug) => `/homepage/categories/${slug}/items`,
    FEATURED_ITEMS: '/homepage/items/featured',
    SEARCH: '/homepage/search',
    PERSONALIZED: '/homepage/personalized'
  },

  // Cart
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    REMOVE: (itemId) => `/cart/remove/${itemId}`,
    UPDATE: '/cart/update'
  },

  // Wishlist
  WISHLIST: {
    GET: '/wishlist',
    ADD: '/wishlist',
    REMOVE: (itemId) => `/wishlist/${itemId}`
  },

  // Bookings
  BOOKINGS: {
    GET_MY: '/bookings/me',
    CREATE: '/bookings',
    GET_ONE: (id) => `/bookings/${id}`,
    CANCEL: (id) => `/bookings/${id}/cancel`,
    UPDATE_STATUS: (id) => `/bookings/${id}/status`,
    OWNER_BOOKINGS: '/bookings/owner'
  },

  // Users
  USERS: {
    GET_ALL: '/users',
    CREATE: '/users',
    GET_PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile'
  },

  // Locations
  LOCATIONS: {
    ADD: '/locations',
    NEARBY: '/locations/nearby'
  }
};

// Helper function to make API calls with authentication
export const makeAPICall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (!response.ok && response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export default API_URL;
