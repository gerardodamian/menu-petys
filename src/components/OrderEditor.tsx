import { useEffect } from 'react'
import { useOrder } from '../hooks/useOrder'
import { useOrders } from '../hooks/useOrders'

interface OrderEditorProps {
  editingOrderId: string | null
}

function OrderEditor({ editingOrderId }: OrderEditorProps) {
  const { loadOrder, clearOrder } = useOrder()
  const { getOrder } = useOrders()

  useEffect(() => {
    if (editingOrderId) {
      const order = getOrder(editingOrderId)
      if (order) {
        loadOrder(order.items, order.total)
      }
    } else {
      clearOrder()
    }
  }, [editingOrderId, getOrder, loadOrder, clearOrder])

  // Este componente no renderiza nada, solo maneja la lógica
  return null
}

export default OrderEditor
