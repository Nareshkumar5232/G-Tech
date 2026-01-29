import { User, Product, Order, Address, TrackingEvent } from '@/types';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const STORAGE_KEYS = {
  USER: 'gtech_current_user',
  TOKEN: 'gtech_token',
  CART: 'gtech_cart',
  WISHLIST: 'gtech_wishlist'
};

// Helper to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// --- Auth Functions ---

export const login = async (email: string, password: string): Promise<User | null> => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { mail: email, password });
    if (res.data.token && res.data.user) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, res.data.token);

      const user: User = {
        id: res.data.user.id || res.data.user._id,
        email: res.data.user.email || res.data.user.mail,
        name: res.data.user.name,
        phone: res.data.user.mobileno || '',
      };

      setCurrentUser(user);
      return user;
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
  return null;
};

export const register = async (email: string, password: string, name: string, phone: string): Promise<User | null> => {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, { mail: email, password, name, mobileno: phone });
    // Updated authController returns token and user now
    if (res.data.token && res.data.user) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, res.data.token);

      const user: User = {
        id: res.data.user.id || res.data.user._id,
        email: res.data.user.email || res.data.user.mail,
        name: res.data.user.name,
        phone: phone,
      };

      setCurrentUser(user);
      return user;
    }
  } catch (error) {
    console.error("Registration failed:", error);
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

// --- Product Functions ---

export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await axios.get(`${API_URL}/product`);
    console.log("API Response:", res.data); // Debug log

    const data = res.data;
    const items = Array.isArray(data) ? data : (data.products || []);

    if (!items.length) {
      console.warn("No products found in response");
      return [];
    }

    return items.map((p: any) => ({
      ...p,
      id: p._id || p.id,
      category: p.category || 'New Laptops',
      condition: p.condition || 'New',
      images: p.images || [],
      brand: p.brand || 'Other',
      location: p.location || 'Chennai', // Default location
      createdAt: p.createdAt || new Date().toISOString(),
      specs: p.specs || [],
    }));
  } catch (error) {
    console.error("Fetch products failed:", error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    const res = await axios.get(`${API_URL}/product/${id}`);
    const p = res.data.product;
    if (!p) return undefined;
    return {
      ...p,
      id: p._id,
    };
  } catch (error) {
    console.error("Fetch product failed:", error);
    return undefined;
  }
};

// --- Order Functions ---

export const getOrders = async (): Promise<Order[]> => {
  try {
    const res = await axios.get<any[]>(`${API_URL}/orders/myorders`, { headers: getAuthHeader() });

    return res.data.map((o: any) => ({
      id: o._id,
      userId: o.user,
      userName: '',
      userEmail: '',
      userPhone: '',
      productId: o.items?.[0]?.product?._id || '',
      productName: o.items?.[0]?.product?.name || 'Multiple Items',
      productPrice: 0,
      quantity: o.items?.[0]?.quantity || 0,
      totalAmount: o.totalAmount,
      status: o.status,
      address: {
        fullName: 'Unknown',
        phoneNumber: '',
        addressLine1: o.address,
        city: '', state: '', pincode: ''
      },
      trackingHistory: [],
      createdAt: o.createdAt,
      updatedAt: o.updatedAt || o.createdAt
    }));
  } catch (error) {
    console.error("Fetch orders failed:", error);
    return [];
  }
};

export const createOrder = async (
  user: User,
  product: Product,
  quantity: number,
  address: Address
): Promise<Order | null> => {
  try {
    const addressString = `${address.addressLine1}, ${address.city}, ${address.state} - ${address.pincode}`;

    const payload = {
      products: [{ productId: product.id, quantity }],
      totalAmount: product.price * quantity,
      address: addressString
    };

    const res = await axios.post(`${API_URL}/orders/neworder`, payload, { headers: getAuthHeader() });
    const o = res.data.order;

    if (o) {
      return {
        id: o._id,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone,
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        quantity,
        totalAmount: o.totalAmount,
        status: o.status,
        address: address,
        trackingHistory: [],
        createdAt: o.createdAt,
        updatedAt: o.updatedAt || o.createdAt
      };
    }
  } catch (error) {
    console.error("Create order failed:", error);
  }
  return null;
};

// --- Wishlist & Cart (Keep LocalStorage implementation) ---

export const getWishlist = (): string[] => {
  const wishlistStr = localStorage.getItem(STORAGE_KEYS.WISHLIST);
  return wishlistStr ? JSON.parse(wishlistStr) : [];
};

export const toggleWishlist = (productId: string): void => {
  const wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  if (index === -1) wishlist.push(productId);
  else wishlist.splice(index, 1);
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
};

export const isInWishlist = (productId: string): boolean => {
  const wishlist = getWishlist();
  return wishlist.includes(productId);
};

export const getCart = (): string[] => {
  const cartStr = localStorage.getItem(STORAGE_KEYS.CART);
  return cartStr ? JSON.parse(cartStr) : [];
};

export const addToCart = (productId: string): void => {
  const cart = getCart();
  if (!cart.includes(productId)) {
    cart.push(productId);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }
};

export const removeFromCart = (productId: string): void => {
  const cart = getCart();
  const index = cart.indexOf(productId);
  if (index !== -1) {
    cart.splice(index, 1);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }
};

export const isInCart = (productId: string): boolean => {
  const cart = getCart();
  return cart.includes(productId);
};

export const clearCart = (): void => {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
};

export const getCartProducts = async (): Promise<Product[]> => {
  const cartIds = getCart();
  const allProducts = await getProducts();
  return allProducts.filter(p => cartIds.includes(p.id));
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const allProducts = await getProducts();
  // Assuming 'featured' is a property, or just return first 4 for now if not available in backend model yet
  return allProducts.slice(0, 4);
};

export const getOrdersByUserId = async (userId: string): Promise<Order[]> => {
  // Since we use /myorders which gets orders for the logged in user, 
  // we can just call getOrders() and filter if really needed, but generally getOrders() is enough.
  return await getOrders();
};

export const cancelOrder = async (orderId: string, reason: string): Promise<Order | null> => {
  try {
    const res = await axios.post(`${API_URL}/orders/cancelorder`, { orderid: orderId }, { headers: getAuthHeader() });
    if (res.data.order_update) {
      // Map back to frontend Order type if needed, or just return a mock success
      // Simulating return for now based on what we have
      const o = res.data.order_update;
      return {
        id: o._id,
        userId: o.user,
        userName: '',
        userEmail: '',
        userPhone: '',
        productId: o.items?.[0]?.product || '',
        productName: 'Refreshed Item',
        productPrice: 0,
        quantity: 0,
        totalAmount: o.totalAmount,
        status: o.status,
        address: { fullName: '', phoneNumber: '', addressLine1: o.address, city: '', state: '', pincode: '' },
        trackingHistory: [],
        createdAt: o.createdAt,
        updatedAt: o.updatedAt
      };
    }
  } catch (e) {
    console.error("Cancel order failed", e);
  }
  return null;
};
