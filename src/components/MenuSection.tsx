import { useState, useEffect, useRef } from 'react'
import type { Category } from '../types'
import { MENU_ITEMS } from '../menuData'
import { CATEGORIES } from '../types'
import MenuItem from './MenuItem.tsx'

function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('pizzas')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const filteredItems = MENU_ITEMS.filter(item => 
    item.category === selectedCategory && item.available
  )

  const selectedCategoryLabel = CATEGORIES.find(cat => cat.key === selectedCategory)?.label || 'Pizzas'

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category)
    setIsMenuOpen(false)
  }

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="menu-section">
      <h2>Menú</h2>
      
      {/* Categorías normales para desktop */}
      <div className="category-tabs">
        {CATEGORIES.map(category => (
          <button
            key={category.key}
            className={`category-tab ${selectedCategory === category.key ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.key)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Menú hamburguesa para responsive */}
      <div className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
        <button 
          className="hamburger-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
          {selectedCategoryLabel}
        </button>
        
        <div className={`mobile-categories ${isMenuOpen ? 'show' : ''}`}>
          {CATEGORIES.map(category => (
            <button
              key={category.key}
              className={`mobile-category-item ${selectedCategory === category.key ? 'active' : ''}`}
              onClick={() => handleCategorySelect(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div 
        className="menu-items"
        style={{
          gap: '16px',
          padding: '16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))'
        }}
      >
        {filteredItems.map(item => (
          <div key={item.id}>
            <MenuItem item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MenuSection
