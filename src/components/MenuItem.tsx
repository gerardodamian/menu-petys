import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { useOrder } from '../hooks/useOrder'
import type { MenuItem as MenuItemType } from '../types'

interface MenuItemProps {
  item: MenuItemType
}

function MenuItem({ item }: MenuItemProps) {
  const { addItem } = useOrder()
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState('')
  const [showNotes, setShowNotes] = useState(false)

  const handleAddToOrder = () => {
    addItem(item, quantity, notes || undefined)
    setQuantity(1)
    setNotes('')
    setShowNotes(false)
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1))

  return (
    <div className="menu-item">
      {item.image && (
        <div className="menu-item-image">
          <img src={item.image} alt={item.name} />
        </div>
      )}
      <div className="menu-item-info">
        <h3>{item.name}</h3>
        <p className="description">{item.description}</p>
        <p className="price">${item.price}</p>
      </div>
      
      <div className="menu-item-actions">
        <div className="quantity-controls">
          <button onClick={decrementQuantity} className="quantity-btn">
            <Minus size={16} />
          </button>
          <span className="quantity">{quantity}</span>
          <button onClick={incrementQuantity} className="quantity-btn">
            <Plus size={16} />
          </button>
        </div>
        
        {showNotes && (
          <div className="notes-section">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notas especiales (opcional)"
              className="notes-input"
            />
          </div>
        )}
        
        <div className="item-buttons">
          <button 
            onClick={() => setShowNotes(!showNotes)} 
            className="notes-btn"
          >
            {showNotes ? 'Ocultar Notas' : 'Agregar Notas'}
          </button>
          <button onClick={handleAddToOrder} className="add-btn">
            Agregar al Pedido
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuItem
