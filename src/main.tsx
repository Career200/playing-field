import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TestPage } from './modules/TestPage.tsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <DndProvider backend={HTML5Backend}>
      <TestPage/>
    </DndProvider>
  </React.StrictMode>,
)
