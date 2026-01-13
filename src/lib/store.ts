import { User, Product, Order, Address } from '@/types';
import { initialProducts } from './mockData';

const STORAGE_KEYS = {
  USER: 'gtech_current_user',
  PRODUCTS: 'gtech_products',
  ORDERS: 'gtech_orders',
  USERS: 'gtech_users',
  WISHLIST: 'gtech_wishlist'
};

// Auth Functions
export const login = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email);
  
  // For demo purposes, checking a simple password
  // In production, this would verify hashed passwords
  if (user && password === 'password123') {
    setCurrentUser(user);
    return user;
  }
  return null;
};

export const register = (email: string, password: string, name: string, phone: string): User | null => {
  const users = getUsers();
  
  // Check if user already exists
  if (users.find(u => u.email === email)) {
    return null;
  }
  
  const newUser: User = {
    id: `user-${Date.now()}`,
    email,
    name,
    phone
  };
  
  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  setCurrentUser(newUser);
  return newUser;
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(STORAGE_KEYS.USER);
  return userStr ? JSON.parse(userStr) : null;
};

export const setCurrentUser = (user: User) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getUsers = (): User[] => {
  const usersStr = localStorage.getItem(STORAGE_KEYS.USERS);
  return usersStr ? JSON.parse(usersStr) : [];
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  orders.push(newOrder);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  return newOrder;
};

export const updateOrderStatus = (orderId: string, status: Order['status']): Order | null => {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === orderId);
  
  if (index === -1) return null;
  
  orders[index] = {
    ...orders[index],
    status,
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  return orders[index];
};

export const cancelOrder = (orderId: string, cancellationReason: string): Order | null => {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === orderId);
  
  if (index === -1) return null;
  
  // Only allow cancellation for Pending or Confirmed orders
  if (orders[index].status !== 'Pending' && orders[index].status !== 'Confirmed') {
    return null;
  }
  
  orders[index] = {
    ...orders[index],
    status: 'Cancelled',
    cancellationReason,
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
