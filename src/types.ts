export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'pizzas' | 'sandwiches' | 'pastas' | 'ensaladas' | 'main_courses' | 'desserts' | 'drinks' | 'breakfast';
  image?: string;
  available: boolean;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  tableNumber: string;
  waiterName: string;
  items: OrderItem[];
  total: number;
  timestamp: Date;
  status: 'draft' | 'sent' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  notes?: string;
}

export type Category = 'pizzas' | 'sandwiches' | 'pastas' | 'ensaladas' | 'main_courses' | 'desserts' | 'drinks' | 'breakfast';

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'pizzas', label: 'Pizzas' },
  { key: 'sandwiches', label: 'Sandwiches' },
  { key: 'pastas', label: 'Pastas' },
  { key: 'ensaladas', label: 'Ensaladas' },
  { key: 'main_courses', label: 'Platos Principales' },
  { key: 'desserts', label: 'Postres' },
  { key: 'drinks', label: 'Bebidas' },
  { key: 'breakfast', label: 'Desayunos' }
];
