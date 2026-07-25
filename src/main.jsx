import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RuntimeProvider } from '@anshif.rainhopes/reactcms-runtime'

import routes from './routes.js'
import './index.css'
import App from './App.jsx'

// ReactCMS Configuration
const websiteId = '-Oy2TPk_l2cl0Fe-H1h1'
const apiKey = 'rcms_pk_8i3uhg1pevb27xx4al6g'

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