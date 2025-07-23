import { useState } from 'react'
import { OrderProvider } from './contexts/OrderContext.tsx'
import { OrdersProvider } from './contexts/OrdersContext.tsx'
import WaiterInfo from './components/WaiterInfo.tsx'
import MenuSection from './components/MenuSection.tsx'
import OrderSummary from './components/OrderSummary.tsx'
import OrdersManager from './components/OrdersManager.tsx'
import OrderDetails from './components/OrderDetails.tsx'
import OrderEditor from './components/OrderEditor.tsx'
import type { Order } from './types'
import './App.css'

function App() {
  const [waiterName, setWaiterName] = useState('')
  const [tableNumber, setTableNumber] = useState('')
  const [isInfoSet, setIsInfoSet] = useState(false)
  const [currentView, setCurrentView] = useState<'new-order' | 'orders-manager'>('new-order')
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null)
  const [editingOrder, setEditingOrder] = useState<string | null>(null)

  const handleInfoSubmit = (name: string, table: string) => {
    setWaiterName(name)
    setTableNumber(table)
    setIsInfoSet(true)
  }

  const handleReset = () => {
    setIsInfoSet(false)
    setWaiterName('')
    setTableNumber('')
    setCurrentView('new-order')
    setEditingOrder(null)
  }

  const handleEditOrder = (order: Order) => {
    setWaiterName(order.waiterName)
    setTableNumber(order.tableNumber)
    setEditingOrder(order.id)
    setCurrentView('new-order')
    setIsInfoSet(true)
    // TODO: Cargar items del pedido en el contexto
  }

  const handleViewOrder = (order: Order) => {
    setViewingOrder(order)
  }

  const handleCancelEdit = () => {
    setEditingOrder(null)
    setCurrentView('orders-manager')
  }

  return (
    <OrdersProvider>
      <OrderProvider>
        <div className="app">
          <header className="app-header">
            <h1>🍽️ Pety´s Restaurant</h1>
            <p>Sistema de Pedidos para Mozos</p>
            
            {isInfoSet && (
              <nav className="app-nav">
                <button 
                  className={`nav-btn ${currentView === 'new-order' ? 'active' : ''}`}
                  onClick={() => setCurrentView('new-order')}
                >
                  Nuevo Pedido
                </button>
                <button 
                  className={`nav-btn ${currentView === 'orders-manager' ? 'active' : ''}`}
                  onClick={() => setCurrentView('orders-manager')}
                >
                  Gestionar Pedidos
                </button>
              </nav>
            )}
          </header>
          
          {!isInfoSet ? (
            <WaiterInfo onSubmit={handleInfoSubmit} />
          ) : (
            <div className="main-content">
              {currentView === 'new-order' ? (
                <div className="content-grid">
                  <OrderEditor editingOrderId={editingOrder} />
                  <div className="menu-section">
                    <MenuSection />
                  </div>
                  <div className="order-section">
                    <OrderSummary 
                      waiterName={waiterName} 
                      tableNumber={tableNumber}
                      onReset={handleReset}
                      editingOrder={editingOrder}
                      onCancelEdit={handleCancelEdit}
                    />
                  </div>
                </div>
              ) : (
                <OrdersManager 
                  onEditOrder={handleEditOrder}
                  onViewOrder={handleViewOrder}
                />
              )}
            </div>
          )}

          {viewingOrder && (
            <OrderDetails 
              order={viewingOrder}
              onClose={() => setViewingOrder(null)}
            />
          )}
        </div>
      </OrderProvider>
    </OrdersProvider>
  )
}

export default App
