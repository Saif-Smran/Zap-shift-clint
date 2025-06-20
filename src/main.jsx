import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { route } from './Routes/Route.jsx'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}></RouterProvider>
  </StrictMode>,
)
