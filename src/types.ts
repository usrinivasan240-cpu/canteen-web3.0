export interface College {
  _id: string;
  name: string;
  location: string;
  status: 'active' | 'inactive';
  createdAt?: string;
}

export interface Canteen {
  _id: string;
  name: string;
  collegeId: string;
  collegeName?: string;
  ownerName: string;
  ownerEmail: string;
  location: string;
  status?: 'active' | 'inactive';
  createdAt?: string;
}

export interface SubCanteen {
  _id: string;
  name: string;
  canteenId: string;
  canteenName?: string;
  status: 'active' | 'inactive';
  createdAt?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'owner' | 'chef' | 'staff' | 'customer';
  collegeId?: string;
  collegeName?: string;
  canteenId?: string;
  canteenName?: string;
  subCanteenId?: string;
  subCanteenName?: string;
  posting?: string;
  createdAt?: string;
}

export interface MenuItem {
  _id: string;
  name: string;
  price: number;
  category: string;
  available: boolean;
  canteenId: string;
}

export interface Order {
  _id: string;
  userId: string;
  userName?: string;
  canteenId: string;
  canteenName?: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Review {
  _id: string;
  userId: string;
  userName?: string;
  rating: number;
  comment: string;
  canteenId: string;
  createdAt: string;
}

export interface CanteenData {
  menu: MenuItem[];
  orders: Order[];
  reviews: Review[];
  settings: Record<string, unknown>;
}

export interface DashboardStats {
  totalColleges: number;
  totalCanteens: number;
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
}
