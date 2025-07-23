import { useState } from 'react'
import { User, Hash } from 'lucide-react'

interface WaiterInfoProps {
  onSubmit: (name: string, table: string) => void
}

function WaiterInfo({ onSubmit }: WaiterInfoProps) {
  const [name, setName] = useState('')
  const [table, setTable] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && table.trim()) {
      onSubmit(name.trim(), table.trim())
    }
  }

  return (
    <div className="waiter-info">
      <div className="waiter-info-container">
        <h2>Información del Pedido</h2>
        <form onSubmit={handleSubmit} className="waiter-form">
          <div className="form-group">
            <label htmlFor="waiter-name">
              <User size={20} />
              Nombre del Mozo
            </label>
            <input
              id="waiter-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa tu nombre"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="table-number">
              <Hash size={20} />
              Número de Mesa
            </label>
            <input
              id="table-number"
              type="text"
              value={table}
              onChange={(e) => setTable(e.target.value)}
              placeholder="Ej: 5, A1, Terraza 3"
              required
            />
          </div>
          
          <button type="submit" className="submit-btn">
            Comenzar a Tomar Pedido
          </button>
        </form>
      </div>
    </div>
  )
}

export default WaiterInfo
