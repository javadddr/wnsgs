import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes, Route } from "react-router-dom"
import Dash from './assets/components/Dahs'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dash" element={<Dash />} />
    </Routes>
  </BrowserRouter>

)
