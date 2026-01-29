import { User, Product, Order, Address, TrackingEvent } from '@/types';
import { initialProducts } from './mockData';

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const STORAGE_KEYS = {
  USER: 'gtech_current_user',
  TOKEN: 'gtech_auth_token',
  PRODUCTS: 'gtech_products',
  ORDERS: 'gtech_orders',
  USERS: 'gtech_users',
  WISHLIST: 'gtech_wishlist'
};

// Auth Functions
export const login = async (email: string, password: string): Promise<User | null> => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { mail: email, password });
    if (res.data.token) {
      const token = res.data.token;
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);

      // Fetch user profile to get full details
      const profileRes = await axios.get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const user: User = {
        id: profileRes.data._id,
        email: profileRes.data.mail,
        name: profileRes.data.name,
        phone: profileRes.data.mobileno || '',
        // Add other fields if needed map from backend to frontend User type
      };

      setCurrentUser(user);
      return user;
    }
  } catch (error) {
    console.error("Login Error:", error);
    return null;
  }
  return null;
};

export const register = async (email: string, password: string, name: string, phone: string): Promise<User | null> => {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, {
      mail: email,
      password,
      name,
      mobileno: phone
    });

    if (res.status === 201) {
      // Auto login or return success indication? 
      // For now, let's auto-login to get the token and user obj
      return await login(email, password);
    }
  } catch (error) {
    console.error("Register Error:", error);
    return null;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(STORAGE_KEYS.USER);
  return userStr ? JSON.parse(userStr) : null;
};

export const setCurrentUser = (user: User) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getUsers = (): User[] => {
  // Not used in frontend typically, or maybe used for admin simulation previously. 
  // Returning empty or fetching from API if really needed (but typical user app shouldn't see all users)
  return [];
};

// Product Functions
export const getProducts = (): Product[] => {
  const productsStr = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (!productsStr) {
    // Initialize with default products
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
    return initialProducts;
  }
  return JSON.parse(productsStr);
};

export const getProductById = (id: string): Product | undefined => {
  const products = getProducts();
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  const products = getProducts();
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  const products = getProducts();
  return products.filter(p => p.featured);
};

export const addProduct = (product: Omit<Product, 'id'>): Product => {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: `product-${Date.now()}`
  };
  products.push(newProduct);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>): Product | null => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);

  if (index === -1) return null;

  products[index] = { ...products[index], ...updates };
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  return products[index];
};

export const deleteProduct = (id: string): boolean => {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);

  if (filtered.length === products.length) return false;

  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filtered));
  return true;
};

// Order Functions
export const getOrders = (): Order[] => {
  const ordersStr = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return ordersStr ? JSON.parse(ordersStr) : [];
};

export const getOrdersByUserId = (userId: string): Order[] => {
  const orders = getOrders();
  return orders.filter(o => o.userId === userId);
};

export const createOrder = (
  user: User,
  product: Product,
  quantity: number,
  address: Address
): Order => {
  const orders = getOrders();
  const now = new Date();
  const estimatedDelivery = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

  const initialTracking: TrackingEvent = {
    status: 'Pending',
    message: 'Order placed successfully',
    timestamp: now.toISOString()
  };

  const newOrder: Order = {
    id: `order-${Date.now()}`,
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    userPhone: user.phone,
    productId: product.id,
    productName: product.name,
    productPrice: product.price,
    quantity,
    totalAmount: product.price * quantity,
    status: 'Pending',
    address,
    trackingHistory: [initialTracking],
    estimatedDelivery: estimatedDelivery.toISOString(),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };

  orders.push(newOrder);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  return newOrder;
};

export const updateOrderStatus = (orderId: string, status: Order['status']): Order | null => {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === orderId);

  if (index === -1) return null;

  const statusMessages: Record<Order['status'], string> = {
    'Pending': 'Order is being reviewed',
    'Confirmed': 'Order confirmed and will be processed soon',
    'Processing': 'Order is being prepared for shipment',
    'Shipped': 'Order has been shipped',
    'Out for Delivery': 'Order is out for delivery',
    'Delivered': 'Order has been delivered successfully',
    'Cancelled': 'Order has been cancelled'
  };

  const newTrackingEvent: TrackingEvent = {
    status,
    message: statusMessages[status],
    timestamp: new Date().toISOString()
  };

  const existingHistory = orders[index].trackingHistory || [];

  orders[index] = {
    ...orders[index],
    status,
    trackingHistory: [...existingHistory, newTrackingEvent],
    updatedAt: new Date().toISOString()
  };

  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  return orders[index];
};

export const cancelOrder = (orderId: string, cancellationReason: string): Order | null => {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === orderId);

  if (index === -1) return null;

  // Only allow cancellation for Pending, Confirmed, or Processing orders
  if (orders[index].status !== 'Pending' && orders[index].status !== 'Confirmed' && orders[index].status !== 'Processing') {
    return null;
  }

  const cancellationEvent: TrackingEvent = {
    status: 'Cancelled',
    message: `Order cancelled: ${cancellationReason}`,
    timestamp: new Date().toISOString()
  };

  const existingHistory = orders[index].trackingHistory || [];

  orders[index] = {
    ...orders[index],
    status: 'Cancelled',
    cancellationReason,
    trackingHistory: [...existingHistory, cancellationEvent],
    updatedAt: new Date().toISOString()
  };

  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  return orders[index];
};

export const getPendingOrdersCount = (): number => {
  const orders = getOrders();
  return orders.filter(o => o.status === 'Pending').length;
};

// Wishlist Functions
export const getWishlist = (): string[] => {
  const wishlistStr = localStorage.getItem(STORAGE_KEYS.WISHLIST);
  return wishlistStr ? JSON.parse(wishlistStr) : [];
};

export const toggleWishlist = (productId: string): void => {
  const wishlist = getWishlist();
  const index = wishlist.indexOf(productId);

  if (index === -1) {
    wishlist.push(productId);
  } else {
    wishlist.splice(index, 1);
  }

  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
};

export const isInWishlist = (productId: string): boolean => {
  const wishlist = getWishlist();
  return wishlist.includes(productId);
};

export const getWishlistProducts = (): Product[] => {
  const wishlist = getWishlist();
  const products = getProducts();
  return products.filter(p => wishlist.includes(p.id));
};
