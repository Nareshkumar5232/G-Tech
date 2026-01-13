export type ProductCondition = 'New' | 'Used';

export type ProductCategory = 'New Laptops' | 'Used Laptops' | 'Accessories' | 'Networking & CCTV';

export type Brand = 'Dell' | 'HP' | 'Lenovo' | 'Apple' | 'ASUS' | 'Acer' | 'MSI' | 'Samsung' | 'Other';

export type TamilNaduCity = 'Chennai' | 'Coimbatore' | 'Madurai' | 'Tiruchirappalli' | 'Salem' | 'Tirunelveli' | 'Vellore' | 'Erode' | 'Thanjavur' | 'Dindigul';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  condition: ProductCondition;
  price: number;
  description: string;
  specs: string[];
  images: string[];
  brand: Brand;
  location: TamilNaduCity;
  createdAt: string;
  featured?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
}

export interface Address {
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Approved' | 'Delivered';

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  totalAmount: number;
  status: OrderStatus;
  address: Address;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
}
