import { useState } from 'react'
import type { Category } from '../types'
import { MENU_ITEMS } from '../menuData'
import { CATEGORIES } from '../types'
import MenuItem from './MenuItem.tsx'

function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('pizzas')

  const filteredItems = MENU_ITEMS.filter(item => 
    item.category === selectedCategory && item.available
  )

  return (
    <div className="menu-section">
      <h2>Menú</h2>
      
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

      <div className="menu-items">
        {filteredItems.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default MenuSection
