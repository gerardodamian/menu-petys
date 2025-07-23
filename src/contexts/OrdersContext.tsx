import { useReducer, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { Order } from '../types'
import { OrdersContext } from './OrdersContextDefinition'

interface OrdersState {
  orders: Order[]
  currentOrderId: string | null
}

type OrdersAction = 
  | { type: 'LOAD_ORDERS'; payload: Order[] }
  | { type: 'SAVE_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER'; payload: Order }
  | { type: 'DELETE_ORDER'; payload: string }
  | { type: 'SET_CURRENT_ORDER'; payload: string | null }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { id: string; status: Order['status'] } }

const STORAGE_KEY = 'petys-restaurant-orders'

function generateOrderId(): string {
  return `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

function ordersReducer(state: OrdersState, action: OrdersAction): OrdersState {
  switch (action.type) {
    case 'LOAD_ORDERS':
      return { ...state, orders: action.payload }
    
    case 'SAVE_ORDER': {
      const newOrders = [...state.orders, action.payload]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newOrders))
      return { ...state, orders: newOrders }
    }
    
    case 'UPDATE_ORDER': {
      const newOrders = state.orders.map(order => 
        order.id === action.payload.id ? action.payload : order
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newOrders))
      return { ...state, orders: newOrders }
    }
    
    case 'DELETE_ORDER': {
      const newOrders = state.orders.filter(order => order.id !== action.payload)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newOrders))
      return { ...state, orders: newOrders }
    }
    
    case 'SET_CURRENT_ORDER':
      return { ...state, currentOrderId: action.payload }
    
    case 'UPDATE_ORDER_STATUS': {
      const { id, status } = action.payload
      const newOrders = state.orders.map(order => 
        order.id === id ? { ...order, status } : order
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newOrders))
      return { ...state, orders: newOrders }
    }
    
    default:
      return state
  }
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(ordersReducer, { 
    orders: [], 
    currentOrderId: null 
  })

  // Cargar pedidos desde localStorage al inicializar
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem(STORAGE_KEY)
      if (savedOrders) {
        const orders = JSON.parse(savedOrders).map((order: Order) => ({
          ...order,
          timestamp: new Date(order.timestamp)
        }))
        dispatch({ type: 'LOAD_ORDERS', payload: orders })
      }
    } catch (error) {
      console.error('Error loading orders from localStorage:', error)
    }
  }, [])

  const saveOrder = (orderData: Omit<Order, 'id' | 'timestamp'>): string => {
    const newOrder: Order = {
      ...orderData,
      id: generateOrderId(),
      timestamp: new Date(),
      status: 'draft'
    }
    dispatch({ type: 'SAVE_ORDER', payload: newOrder })
    return newOrder.id
  }

  const updateOrder = (order: Order) => {
    dispatch({ type: 'UPDATE_ORDER', payload: order })
  }

  const deleteOrder = (id: string) => {
    dispatch({ type: 'DELETE_ORDER', payload: id })
  }

  const getOrder = useCallback((id: string): Order | undefined => {
    return state.orders.find(order => order.id === id)
  }, [state.orders])

  const setCurrentOrder = (id: string | null) => {
    dispatch({ type: 'SET_CURRENT_ORDER', payload: id })
  }

  const updateOrderStatus = (id: string, status: Order['status']) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id, status } })
  }

  const getAllOrders = (): Order[] => {
    return [...state.orders].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  const getOrdersByStatus = (status: Order['status']): Order[] => {
    return state.orders.filter(order => order.status === status)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  const getTodaysOrders = (): Order[] => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return state.orders.filter(order => {
      const orderDate = new Date(order.timestamp)
      orderDate.setHours(0, 0, 0, 0)
      return orderDate.getTime() === today.getTime()
    }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  return (
    <OrdersContext.Provider value={{
      state,
      saveOrder,
      updateOrder,
      deleteOrder,
      getOrder,
      setCurrentOrder,
      updateOrderStatus,
      getAllOrders,
      getOrdersByStatus,
      getTodaysOrders
    }}>
      {children}
    </OrdersContext.Provider>
  )
}
