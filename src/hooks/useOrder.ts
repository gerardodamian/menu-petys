import { useContext } from 'react'
import { OrderContext } from '../contexts/OrderContextDefinition.ts'

export function useOrder() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider')
  }
  return context
}
