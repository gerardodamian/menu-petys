import { X, Send, Clock, User, Hash } from 'lucide-react'
import type { Order } from '../types'

interface OrderDetailsProps {
  order: Order
  onClose: () => void
  onSendToWhatsApp?: () => void
}

function OrderDetails({ order, onClose, onSendToWhatsApp }: OrderDetailsProps) {
  const formatDateTime = (date: Date) => {
    return date.toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const generateWhatsAppMessage = () => {
    const orderItems = order.items.map(item => {
      const notes = item.notes ? ` (${item.notes})` : ''
      return `• ${item.quantity}x ${item.menuItem.name}${notes} - $${item.menuItem.price * item.quantity}`
    }).join('\n')

    const message = `🍽️ *PEDIDO - PETYS RESTAURANT*

👤 *Mozo:* ${order.waiterName}
🏪 *Mesa:* ${order.tableNumber}
📅 *Fecha:* ${formatDateTime(order.timestamp)}
🆔 *ID Pedido:* ${order.id}

📋 *DETALLE DEL PEDIDO:*
${orderItems}

${order.notes ? `📝 *Notas:* ${order.notes}\n` : ''}
💰 *TOTAL: $${order.total}*

¡Gracias!`

    return encodeURIComponent(message)
  }

  const handleSendToWhatsApp = () => {
    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/?text=${message}`
    window.open(whatsappUrl, '_blank')
    if (onSendToWhatsApp) {
      onSendToWhatsApp()
    }
  }

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      draft: '#6b7280',
      sent: '#3b82f6',
      confirmed: '#8b5cf6',
      preparing: '#f59e0b',
      ready: '#10b981',
      delivered: '#059669'
    }
    return colors[status]
  }

  const getStatusLabel = (status: Order['status']) => {
    const labels = {
      draft: 'Borrador',
      sent: 'Enviado',
      confirmed: 'Confirmado',
      preparing: 'En Preparación',
      ready: 'Listo',
      delivered: 'Entregado'
    }
    return labels[status]
  }

  return (
    <div className="order-details-overlay">
      <div className="order-details-modal">
        <div className="modal-header">
          <h2>Detalles del Pedido</h2>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <div className="modal-content">
          <div className="order-info-section">
            <div className="info-grid">
              <div className="info-item">
                <User size={18} />
                <div>
                  <label>Mozo</label>
                  <p>{order.waiterName}</p>
                </div>
              </div>
              
              <div className="info-item">
                <Hash size={18} />
                <div>
                  <label>Mesa</label>
                  <p>{order.tableNumber}</p>
                </div>
              </div>
              
              <div className="info-item">
                <Clock size={18} />
                <div>
                  <label>Fecha y Hora</label>
                  <p>{formatDateTime(order.timestamp)}</p>
                </div>
              </div>
            </div>

            <div className="status-section">
              <label>Estado</label>
              <span 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(order.status) }}
              >
                {getStatusLabel(order.status)}
              </span>
            </div>

            <div className="order-id">
              <label>ID del Pedido</label>
              <p className="order-id-text">{order.id}</p>
            </div>
          </div>

          <div className="items-section">
            <h3>Items del Pedido</h3>
            <div className="items-list">
              {order.items.map((item, index) => (
                <div key={index} className="order-item-detail">
                  <div className="item-info">
                    <h4>{item.menuItem.name}</h4>
                    <p className="item-description">{item.menuItem.description}</p>
                    {item.notes && (
                      <p className="item-notes">Nota: {item.notes}</p>
                    )}
                  </div>
                  <div className="item-quantity">
                    <span className="quantity">×{item.quantity}</span>
                  </div>
                  <div className="item-prices">
                    <p className="unit-price">${item.menuItem.price} c/u</p>
                    <p className="total-price">${item.menuItem.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {order.notes && (
            <div className="notes-section">
              <h3>Notas del Pedido</h3>
              <p className="order-notes">{order.notes}</p>
            </div>
          )}

          <div className="total-section">
            <h3>Total: ${order.total}</h3>
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={handleSendToWhatsApp} className="whatsapp-btn">
            <Send size={20} />
            Enviar por WhatsApp
          </button>
          <button onClick={onClose} className="close-modal-btn">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
