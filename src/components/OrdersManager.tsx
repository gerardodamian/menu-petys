import { useState } from 'react'
import { Clock, Eye, Edit, Trash2 } from 'lucide-react'
import { useOrders } from '../hooks/useOrders'
import type { Order } from '../types'

interface OrdersManagerProps {
  onEditOrder: (order: Order) => void
  onViewOrder: (order: Order) => void
}

const statusColors: Record<Order['status'], string> = {
  draft: '#6b7280',
  sent: '#3b82f6',
  confirmed: '#8b5cf6',
  preparing: '#f59e0b',
  ready: '#10b981',
  delivered: '#059669'
}

function OrdersManager({ onEditOrder, onViewOrder }: OrdersManagerProps) {
  const { getAllOrders, getTodaysOrders, getOrdersByStatus, deleteOrder, updateOrderStatus } = useOrders()
  const [filter, setFilter] = useState<'all' | 'today' | Order['status']>('today')
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null)

  const getFilteredOrders = () => {
    switch (filter) {
      case 'all':
        return getAllOrders()
      case 'today':
        return getTodaysOrders()
      default:
        return getOrdersByStatus(filter as Order['status'])
    }
  }

  const filteredOrders = getFilteredOrders()

  const handleDeleteOrder = (id: string) => {
    deleteOrder(id)
    setShowConfirmDelete(null)
  }

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-AR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="orders-manager">
      <div className="orders-header">
        <h2>Gestión de Pedidos</h2>
        
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'today' ? 'active' : ''}`}
            onClick={() => setFilter('today')}
          >
            Hoy
          </button>
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          <button 
            className={`filter-tab ${filter === 'draft' ? 'active' : ''}`}
            onClick={() => setFilter('draft')}
          >
            Borradores
          </button>
          <button 
            className={`filter-tab ${filter === 'sent' ? 'active' : ''}`}
            onClick={() => setFilter('sent')}
          >
            Enviados
          </button>
          <button 
            className={`filter-tab ${filter === 'preparing' ? 'active' : ''}`}
            onClick={() => setFilter('preparing')}
          >
            En Preparación
          </button>
        </div>
      </div>

      <div className="orders-list">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <p>No hay pedidos para mostrar</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Mesa {order.tableNumber}</h3>
                  <p className="waiter">Mozo: {order.waiterName}</p>
                  <div className="order-meta">
                    <span className="date">{formatDate(order.timestamp)}</span>
                    <span className="time">
                      <Clock size={14} />
                      {formatTime(order.timestamp)}
                    </span>
                  </div>
                </div>
                
                <div className="order-status">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                    className="status-select"
                    style={{ borderColor: statusColors[order.status] }}
                  >
                    <option value="draft">Borrador</option>
                    <option value="sent">Enviado</option>
                    <option value="confirmed">Confirmado</option>
                    <option value="preparing">En Preparación</option>
                    <option value="ready">Listo</option>
                    <option value="delivered">Entregado</option>
                  </select>
                </div>
              </div>

              <div className="order-content">
                <div className="order-items">
                  <p><strong>{order.items.length} item(s)</strong></p>
                  <div className="items-preview">
                    {order.items.slice(0, 3).map((item, index) => (
                      <span key={index} className="item-preview">
                        {item.quantity}x {item.menuItem.name}
                      </span>
                    ))}
                    {order.items.length > 3 && (
                      <span className="more-items">+{order.items.length - 3} más</span>
                    )}
                  </div>
                </div>
                
                <div className="order-total">
                  <p className="total">${order.total}</p>
                </div>
              </div>

              <div className="order-actions">
                <button 
                  onClick={() => onViewOrder(order)}
                  className="action-btn view-btn"
                  title="Ver detalles"
                >
                  <Eye size={16} />
                </button>
                
                {order.status === 'draft' && (
                  <button 
                    onClick={() => onEditOrder(order)}
                    className="action-btn edit-btn"
                    title="Editar pedido"
                  >
                    <Edit size={16} />
                  </button>
                )}
                
                <button 
                  onClick={() => setShowConfirmDelete(order.id)}
                  className="action-btn delete-btn"
                  title="Eliminar pedido"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {showConfirmDelete === order.id && (
                <div className="confirm-delete">
                  <p>¿Seguro que quieres eliminar este pedido?</p>
                  <div className="confirm-actions">
                    <button 
                      onClick={() => handleDeleteOrder(order.id)}
                      className="confirm-btn"
                    >
                      Sí, eliminar
                    </button>
                    <button 
                      onClick={() => setShowConfirmDelete(null)}
                      className="cancel-btn"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default OrdersManager
