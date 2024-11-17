import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './components/Auth.jsx'
import { Toaster } from 'react-hot-toast'
import { ArticleProvider } from './components/ArticleContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ArticleProvider>
      <Toaster/>
      <App />
      </ArticleProvider>
    </AuthProvider>
  </StrictMode>,
)
