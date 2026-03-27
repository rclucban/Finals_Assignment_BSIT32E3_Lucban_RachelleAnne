import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { TodoProvider } from './context/TodoContext'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <TodoProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TodoProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
