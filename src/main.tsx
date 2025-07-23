import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Add error handling
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
  console.error('Stack:', e.error?.stack);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled Promise Rejection:', e.reason);
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

try {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  console.log('App successfully mounted');
} catch (error) {
  console.error('Failed to render app:', error);
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Error loading app: ' + error + '</div>';
}
