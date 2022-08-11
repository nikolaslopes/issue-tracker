import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App'
import { BrowserRouter } from 'react-router-dom'
import { worker } from '@uidotdev/react-query-api'
import './index.css'

new Promise((res) => setTimeout(res, 100))
  .then(() =>
    worker.start({
      quiet: true,
      onUnhandledRequest: 'bypass',
    })
  )
  .then(() => {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <div className="container">
          <App />
        </div>
      </React.StrictMode>
    )
  })
