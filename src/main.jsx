import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RuntimeProvider } from '@anshif.rainhopes/reactcms-runtime'
import routes from './routes.js'
import './index.css'
import App from './App.jsx'

const websiteId = import.meta.env.VITE_REACTCMS_WEBSITE_ID
const apiKey = import.meta.env.VITE_REACTCMS_API_KEY

if (!websiteId || !apiKey) {
  console.warn(
    '[ReactCMS Runtime Warning]: VITE_REACTCMS_WEBSITE_ID or VITE_REACTCMS_API_KEY environment variable is missing. ' +
    'Please set VITE_REACTCMS_WEBSITE_ID and VITE_REACTCMS_API_KEY in your .env file.'
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RuntimeProvider
      websiteId={websiteId || ''}
      apiKey={apiKey || ''}
      routes={routes}
      theme={null}
    >
      <App />
    </RuntimeProvider>
  </StrictMode>,
)
