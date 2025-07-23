# 🍽️ Petys Restaurant - Sistema de Pedidos para Mozos

Una aplicación optimizada para tablets que permite a los mozos del restaurante Petys tomar pedidos de manera eficiente y enviarlos directamente a la cocina por WhatsApp.

## 🚀 Características Principales

- **Interfaz optimizada para tablets** con controles táctiles grandes
- **Gestión completa del menú** por categorías (Entradas, Platos Principales, Bebidas, Postres)
- **Toma de pedidos intuitiva** con control de cantidades y notas especiales
- **Envío automático por WhatsApp** a la cocina con formato estructurado
- **Información del pedido** incluye mesa, mozo, fecha y hora
- **Diseño responsive** que se adapta a diferentes tamaños de pantalla

## 🛠️ Tecnologías Utilizadas

- **React 18** con TypeScript para una experiencia de desarrollo robusta
- **Vite** para desarrollo rápido y build optimizado
- **Context API** para gestión de estado global
- **Lucide React** para iconos modernos y escalables
- **CSS moderno** con Grid, Flexbox y efectos visuales

## 📱 Funcionalidades

### Para el Mozo:
1. **Inicio de sesión rápido**: Ingresa nombre del mozo y número de mesa
2. **Navegación por categorías**: Menú organizado en pestañas fáciles de usar
3. **Agregar productos**: Control de cantidad y notas especiales para cada item
4. **Gestión del pedido**: Modificar cantidades, eliminar items, ver total en tiempo real
5. **Envío a cocina**: Un solo clic para enviar por WhatsApp con formato profesional

### Información del Mensaje de WhatsApp:
- 👤 Nombre del mozo
- 🏪 Número de mesa  
- 📅 Fecha y hora del pedido
- 📋 Detalle completo con cantidades y notas
- 💰 Total del pedido

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos para ejecutar:

```bash
# Clonar o descargar el proyecto
cd menu-petys

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📋 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción  
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter para verificar código

## 🎨 Diseño y UX

- **Colores**: Paleta moderna con gradientes azul-púrpura
- **Tipografía**: Segoe UI para máxima legibilidad
- **Animaciones**: Transiciones suaves que mejoran la experiencia
- **Accesibilidad**: Cumple estándares de contraste y navegación por teclado
- **Touch-friendly**: Botones y controles optimizados para uso táctil

## 📱 Compatibilidad

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+  
- ✅ Safari 14+
- ✅ Tablets Android e iOS
- ✅ Dispositivos con pantalla táctil

## 🔧 Personalización

### Modificar el Menú:
Edita `src/menuData.ts` para agregar, quitar o modificar productos.

### Cambiar Estilos:
Los estilos principales están en `src/App.css` y `src/index.css`.

### Número de WhatsApp:
Para configurar un número específico, modifica la función `sendToWhatsApp()` en `src/components/OrderSummary.tsx`.

## 📄 Licencia

Este proyecto fue desarrollado específicamente para Petys Restaurant como una solución personalizada para la gestión de pedidos.

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
