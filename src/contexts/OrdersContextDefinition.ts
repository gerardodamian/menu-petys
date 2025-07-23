import { createContext } from 'react'
import type { Order } from '../types'

interface OrdersState {
  orders: Order[]
  currentOrderId: string | null
}

interface OrdersContextType {
  state: OrdersState
  saveOrder: (order: Omit<Order, 'id' | 'timestamp'>) => string
  updateOrder: (order: Order) => void
  deleteOrder: (id: string) => void
  getOrder: (id: string) => Order | undefined
  setCurrentOrder: (id: string | null) => void
  updateOrderStatus: (id: string, status: Order['status']) => void
  getAllOrders: () => Order[]
  getOrdersByStatus: (status: Order['status']) => Order[]
  getTodaysOrders: () => Order[]
}

export const OrdersContext = createContext<OrdersContextType | undefined>(undefined)
