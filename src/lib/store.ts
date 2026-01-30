import { User, Product, Order, Address, TrackingEvent } from '@/types';
import axios from 'axios';

const API_URL = 'https://g-tech-backend-1.onrender.com/api';
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
    console.log("🔐 Attempting login for:", email);
    const res = await axios.post(`${API_URL}/auth/login`, { mail: email, password });
    if (res.data.token && res.data.user) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, res.data.token);
      console.log("✅ Login successful");

      const user: User = {
        id: res.data.user.id || res.data.user._id,
        email: res.data.user.email || res.data.user.mail,
        name: res.data.user.name,
        phone: res.data.user.mobileno || '',
      };

      setCurrentUser(user);
      return user;
    }
  } catch (error: any) {
    console.error("❌ Login failed:", error);
    if (error.response) {
      console.error("Error response:", error.response.status, error.response.data);
      throw new Error(error.response.data?.message || "Login failed");
    }
    throw new Error(error.message || "Network error");
  }
  return null;
};

export const register = async (email: string, password: string, name: string, phone: string): Promise<User | null> => {
  try {
    console.log("📝 Attempting registration for:", email);
    const res = await axios.post(`${API_URL}/auth/register`, { mail: email, password, name, mobileno: phone });
    // Updated authController returns token and user now
    if (res.data.token && res.data.user) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, res.data.token);
      console.log("✅ Registration successful");

      const user: User = {
        id: res.data.user.id || res.data.user._id,
        email: res.data.user.email || res.data.user.mail,
        name: res.data.user.name,
        phone: phone,
      };

      setCurrentUser(user);
      return user;
    }
  } catch (error: any) {
    console.error("❌ Registration failed:", error);
    if (error.response) {
      console.error("Error response:", error.response.status, error.response.data);
      throw new Error(error.response.data?.message || "Registration failed");
    }
    throw new Error(error.message || "Network error");
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
    console.log("📦 Fetching products from API...");
    const res = await axios.get(`${API_URL}/product`);
    console.log("✅ Products API Response:", res.data);

    const data = res.data;
    const items = Array.isArray(data) ? data : (data.products || []);

    if (!items.length) {
      console.warn("⚠️ No products found in response");
      return [];
    }

    console.log(`✅ Found ${items.length} products`);
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
  } catch (error: any) {
    console.error("❌ Fetch products failed:", error);
    if (error.response) {
      console.error("Error response:", error.response.status, error.response.data);
    }
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
    console.log("📋 Fetching user orders...");
    const res = await axios.get<any[]>(`${API_URL}/orders/myorders`, { headers: getAuthHeader() });
    console.log("✅ Orders response:", res.data);

    if (!res.data || !Array.isArray(res.data)) {
      console.warn("⚠️ Invalid orders response format");
      return [];
    }

    if (res.data.length === 0) {
      console.log("ℹ️ No orders found for user");
      return [];
    }

    console.log(`✅ Found ${res.data.length} orders`);
    return res.data.map((o: any) => {
      // Map address correctly. Backend might return a string or object? 
      // Based on controller, it saves 'address' which comes from req.body.address.
      // If frontend sent a string, it is a string. If it sent an object... wait, createOrder sends a string addressString.
      // But let's handle if we improve createOrder later.

      // We need to parse the address string if it's a string to fill the Address object fields
      let addrObj: Address = {
        fullName: 'Ordered Location',
        phoneNumber: '',
        addressLine1: typeof o.address === 'string' ? o.address : (o.address?.addressLine1 || ''),
        city: '', state: '', pincode: ''
      };

      return {
        id: o._id,
        userId: o.user,
        userName: '',
        userEmail: '',
        userPhone: '',
        productId: o.items?.[0]?.product?._id || '', // Now product is populated
        productName: o.items?.[0]?.product?.name || 'Item',
        productPrice: o.items?.[0]?.price || 0,
        quantity: o.items?.[0]?.quantity || 0,
        totalAmount: o.totalAmount,
        status: o.status,
        address: addrObj,
        trackingHistory: [],
        createdAt: o.createdAt,
        updatedAt: o.updatedAt || o.createdAt,
        estimatedDelivery: o.estimatedDelivery // Pass through if exists
      };
    });
  } catch (error: any) {
    console.error("❌ Fetch orders failed:", error);
    if (error.response) {
      console.error("Error response:", error.response.status, error.response.data);
      if (error.response.status === 401) {
        console.error("Authentication failed - user may need to login again");
        logout(); // Clear invalid token
      }
    }
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
    console.log("🛒 Creating new order...");
    const addressString = `${address.addressLine1}, ${address.city}, ${address.state} - ${address.pincode}`;

    const payload = {
      products: [{ productId: product.id, quantity }],
      totalAmount: product.price * quantity,
      address: addressString
    };

    console.log("📦 Order payload:", payload);
    const res = await axios.post(`${API_URL}/orders/neworder`, payload, { headers: getAuthHeader() });
    console.log("✅ Order created successfully:", res.data);

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
  } catch (error: any) {
    console.error("❌ Create order failed:", error);
    if (error.response) {
      console.error("Error response:", error.response.status, error.response.data);
      throw new Error(error.response.data?.message || "Failed to create order");
    }
    throw new Error(error.message || "Network error");
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

export const addToCart = async (productId: string): Promise<boolean> => {
  // Optimistic update
  const cart = getCart();
  if (!cart.includes(productId)) {
    cart.push(productId);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }

  // API Call
  try {
    await axios.post(`${API_URL}/cart/add`, { productId, quantity: 1 }, { headers: getAuthHeader() });
    return true;
  } catch (error) {
    console.error("Failed to add to cart on server:", error);
    // Rollback implementation could go here, but for now we keep local state
    return false;
  }
};

export const removeFromCart = async (productId: string): Promise<boolean> => {
  // Optimistic update
  const cart = getCart();
  const index = cart.indexOf(productId);
  if (index !== -1) {
    cart.splice(index, 1);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }

  // API Call
  try {
    await axios.delete(`${API_URL}/cart/remove`, {
      headers: getAuthHeader(),
      data: { productId }
    });
    return true;
  } catch (error) {
    console.error("Failed to remove from cart on server:", error);
    return false;
  }
};

export const isInCart = (productId: string): boolean => {
  const cart = getCart();
  return cart.includes(productId);
};

export const clearCart = (): void => {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
  // Note: We might want a clear cart API endpoint too if needed
};

export const getCartProducts = async (): Promise<Product[]> => {
  try {
    // Fetch from server for authoritative state
    const res = await axios.get(`${API_URL}/cart`, { headers: getAuthHeader() });
    const cart = res.data;

    if (cart && cart.items) {
      // Sync local storage with server state (optional but good for consistency)
      const serverIds = cart.items.map((item: any) => item.product._id || item.product.id);
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(serverIds));

      return cart.items.map((item: any) => {
        const p = item.product;
        return {
          ...p,
          id: p._id || p.id,
          cartItemId: item._id, // if needed
          quantity: item.quantity
        };
      });
    }
  } catch (error) {
    console.error("Failed to fetch cart from server:", error);
  }

  // Fallback to local storage + getProducts if server fails
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
