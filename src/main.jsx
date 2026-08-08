import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RuntimeProvider } from '@anshif.rainhopes/reactcms-runtime'

import routes from './routes.js'
import './index.css'
import App from './App.jsx'

// ReactCMS Configuration
const websiteId = '-Oz5k0Sb8BKbOxfOSxq8'
const apiKey = ''

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RuntimeProvider
      websiteId={websiteId}
      apiKey={apiKey}
      routes={routes}
      theme={null}
    >
      <App />
    </RuntimeProvider>
  </StrictMode>,
)
