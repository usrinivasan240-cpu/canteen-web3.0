export interface College {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inactive';
}

export interface Canteen {
  id: string;
  name: string;
  collegeId: string;
  ownerId: string;
  ownerName?: string;
  location?: string;
  status: 'active' | 'inactive';
}

export interface SubCanteen {
  id: string;
  name: string;
  canteenId: string;
  status: 'active' | 'inactive';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'owner' | 'chef' | 'staff' | 'customer';
  collegeId?: string;
  canteenId?: string;
  subCanteenId?: string;
  posting?: string;
  status: 'active' | 'suspended';
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  rating: number;
  category: string;
  description: string;
  available: boolean;
  isPaused: boolean;
  prepTime: number;
  dailyLimit: number;
  bookedToday: number;
  canteenId?: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: { itemId: string; name: string; quantity: number; price: number }[];
  totalPrice: number;
  paymentStatus: string;
  paymentMethod: string;
  status: string;
  timestamp: string;
  createdAt: number;
  type?: string;
  canteenId?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  sentiment: string;
  timestamp: string;
  canteenId?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  stockGrams: number;
  unit: string;
  canteenId?: string;
}

export interface CanteenData {
  menu: MenuItem[];
  orders: Order[];
  reviews: Review[];
  ingredients: Ingredient[];
  settings: Record<string, unknown>;
}
