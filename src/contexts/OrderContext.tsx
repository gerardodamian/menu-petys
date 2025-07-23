import { useReducer, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { OrderItem, MenuItem } from '../types'
import { OrderContext } from './OrderContextDefinition.ts'

interface OrderState {
  items: OrderItem[]
  total: number
}

type OrderAction = 
  | { type: 'ADD_ITEM'; payload: { menuItem: MenuItem; quantity: number; notes?: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_ORDER' }
  | { type: 'LOAD_ORDER'; payload: { items: OrderItem[]; total: number } }

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { menuItem, quantity, notes } = action.payload
      const existingItemIndex = state.items.findIndex(
        item => item.menuItem.id === menuItem.id && item.notes === notes
      )

      let newItems: OrderItem[]
      
      if (existingItemIndex !== -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        newItems = [...state.items, { menuItem, quantity, notes }]
      }

      const newTotal = newItems.reduce((sum, item) => 
        sum + (item.menuItem.price * item.quantity), 0
      )

      return { items: newItems, total: newTotal }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter((_, index) => index.toString() !== action.payload)
      const newTotal = newItems.reduce((sum, item) => 
        sum + (item.menuItem.price * item.quantity), 0
      )
      return { items: newItems, total: newTotal }
    }

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload
      const newItems = state.items.map((item, index) =>
        index.toString() === itemId 
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)

      const newTotal = newItems.reduce((sum, item) => 
        sum + (item.menuItem.price * item.quantity), 0
      )

      return { items: newItems, total: newTotal }
    }

    case 'CLEAR_ORDER':
      return { items: [], total: 0 }

    case 'LOAD_ORDER':
      return action.payload

    default:
      return state
  }
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, { items: [], total: 0 })

  const addItem = useCallback((menuItem: MenuItem, quantity: number, notes?: string) => {
    dispatch({ type: 'ADD_ITEM', payload: { menuItem, quantity, notes } })
  }, [])

  const removeItem = useCallback((itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId })
  }, [])

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } })
  }, [])

  const clearOrder = useCallback(() => {
    dispatch({ type: 'CLEAR_ORDER' })
  }, [])

  const loadOrder = useCallback((items: OrderItem[], total: number) => {
    dispatch({ type: 'LOAD_ORDER', payload: { items, total } })
  }, [])

  return (
    <OrderContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearOrder,
      loadOrder
    }}>
      {children}
    </OrderContext.Provider>
  )
}
