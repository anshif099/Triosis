import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RuntimeProvider } from '@anshif.rainhopes/reactcms-runtime'

import routes from './routes.js'
import './index.css'
import App from './App.jsx'

// ReactCMS Configuration
const websiteId = import.meta.env.VITE_REACTCMS_WEBSITE_ID || '-Oz5k0Sb8BKbOxfOSxq8'
const apiKey = import.meta.env.VITE_REACTCMS_API_KEY || undefined

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RuntimeProvider
      websiteId={websiteId}
      apiKey={apiKey}
      routes={routes}
      theme={null}
      preserveApplicationPage={true}
    >
      <App />
    </RuntimeProvider>
  </StrictMode>,
)
