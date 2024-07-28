import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WebRTCChat } from './modules/webRTC/components/SimpleChat.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <WebRTCChat />
  </React.StrictMode>,
)
