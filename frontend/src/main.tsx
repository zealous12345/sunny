import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { ToastProvider } from './contexts/ToastContext'
import Toast from './components/Toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <CartProvider>
            <App />
            <Toast />
          </CartProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
