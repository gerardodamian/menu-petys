import { Trash2, Plus, Minus, Send, RotateCcw, Save } from 'lucide-react'
import { useOrder } from '../hooks/useOrder'
import { useOrders } from '../hooks/useOrders'

interface OrderSummaryProps {
  waiterName: string
  tableNumber: string
  onReset: () => void
  editingOrder?: string | null
  onCancelEdit?: () => void
}

function OrderSummary({ waiterName, tableNumber, onReset, editingOrder, onCancelEdit }: OrderSummaryProps) {
  const { state, removeItem, updateQuantity, clearOrder } = useOrder()
  const { saveOrder, updateOrder, getOrder } = useOrders()

  const generateWhatsAppMessage = () => {
    const orderItems = state.items.map(item => {
      const notes = item.notes ? ` (${item.notes})` : ''
      return `• ${item.quantity}x ${item.menuItem.name}${notes} - $${item.menuItem.price * item.quantity}`
    }).join('\n')

    const message = `🍽️ *NUEVO PEDIDO - PETYS RESTAURANT*

👤 *Mozo:* ${waiterName}
🏪 *Mesa:* ${tableNumber}
📅 *Fecha:* ${new Date().toLocaleDateString('es-AR')}
⏰ *Hora:* ${new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}

📋 *DETALLE DEL PEDIDO:*
${orderItems}

💰 *TOTAL: $${state.total}*

¡Gracias!`

    return encodeURIComponent(message)
  }

  const sendToWhatsApp = () => {
    if (state.items.length === 0) {
      alert('No hay items en el pedido')
      return
    }
    
    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/?text=${message}`
    window.open(whatsappUrl, '_blank')
    
    // Guardar el pedido al enviarlo
    saveOrderAsDraft('sent')
  }

  const saveOrderAsDraft = (status: 'draft' | 'sent' = 'draft') => {
    if (state.items.length === 0) {
      alert('No hay items en el pedido para guardar')
      return
    }

    const orderData = {
      tableNumber,
      waiterName,
      items: state.items,
      total: state.total,
      status
    }

    if (editingOrder) {
      // Actualizar pedido existente
      const existingOrder = getOrder(editingOrder)
      if (existingOrder) {
        updateOrder({
          ...existingOrder,
          ...orderData,
          timestamp: existingOrder.timestamp // Mantener timestamp original
        })
        alert('Pedido actualizado correctamente')
      }
    } else {
      // Crear nuevo pedido
      saveOrder(orderData)
      alert(`Pedido guardado como ${status === 'draft' ? 'borrador' : 'enviado'}`)
    }
  }

  const handleNewOrder = () => {
    clearOrder()
    onReset()
  }

  return (
    <div className={`order-summary ${editingOrder ? 'editing-mode' : ''}`}>
      {editingOrder && (
        <div className="editing-banner">
          Editando pedido existente
        </div>
      )}
      
      <div className="order-header">
        <h2>{editingOrder ? '✏️ Editando Pedido' : '📋 Pedido Actual'}</h2>
        <div className="order-info">
          <p><strong>Mozo:</strong> {waiterName}</p>
          <p><strong>Mesa:</strong> {tableNumber}</p>
          {editingOrder && (
            <p className="edit-info"><strong>ID:</strong> #{editingOrder.slice(-6).toUpperCase()}</p>
          )}
        </div>
      </div>

      <div className="order-items">
        {state.items.length === 0 ? (
          <div className="empty-order">
            <span className="empty-icon">🍽️</span>
            <p>No hay items en el pedido</p>
            {editingOrder && (
              <small>Agrega items desde el menú para modificar este pedido</small>
            )}
          </div>
        ) : (
          state.items.map((item, index) => (
            <div key={index} className={`order-item ${editingOrder ? 'editing-item' : ''}`}>
              <div className="item-details">
                <h4>{item.menuItem.name}</h4>
                {item.notes && <p className="item-notes">📝 {item.notes}</p>}
                <p className="item-price">${item.menuItem.price} c/u</p>
              </div>
              
              <div className="item-controls">
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(index.toString(), item.quantity - 1)}
                    className="quantity-btn"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(index.toString(), item.quantity + 1)}
                    className="quantity-btn"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                
                <button 
                  onClick={() => removeItem(index.toString())}
                  className="remove-btn"
                  title="Eliminar item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="item-total">
                <strong>${item.menuItem.price * item.quantity}</strong>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="order-footer">
        <div className="total">
          <h3>💰 Total: ${state.total}</h3>
        </div>
        
        <div className="order-actions">
          {editingOrder ? (
            <>
              <button 
                onClick={() => saveOrderAsDraft('draft')}
                className="save-changes-btn"
                disabled={state.items.length === 0}
              >
                <Save size={20} />
                <span>Guardar Cambios</span>
              </button>
              
              <button 
                onClick={sendToWhatsApp}
                className="send-btn"
                disabled={state.items.length === 0}
              >
                <Send size={20} />
                Enviar a Cocina
              </button>
              
              <button 
                onClick={onCancelEdit || handleNewOrder} 
                className="cancel-edit-btn"
              >
                <RotateCcw size={20} />
                <span>Cancelar Edición</span>
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => saveOrderAsDraft('draft')}
                className="save-btn"
                disabled={state.items.length === 0}
                title="Guardar como borrador"
              >
                <Save size={20} />
                Guardar Borrador
              </button>
              
              <button 
                onClick={sendToWhatsApp}
                className="send-btn"
                disabled={state.items.length === 0}
                title="Enviar pedido por WhatsApp"
              >
                <Send size={20} />
                Enviar a Cocina
              </button>
              
              <button 
                onClick={handleNewOrder} 
                className="new-order-btn"
                title="Comenzar nuevo pedido"
              >
                <RotateCcw size={20} />
                Nuevo Pedido
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
