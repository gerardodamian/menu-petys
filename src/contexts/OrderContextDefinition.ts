import { createContext } from 'react'
import type { OrderItem, MenuItem } from '../types'

interface OrderState {
  items: OrderItem[]
  total: number
}

interface OrderContextType {
  state: OrderState
  addItem: (menuItem: MenuItem, quantity: number, notes?: string) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearOrder: () => void
  loadOrder: (items: OrderItem[], total: number) => void
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined)
