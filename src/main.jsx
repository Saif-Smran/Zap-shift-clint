import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { route } from './Routes/Route.jsx'
import { RouterProvider } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import AuthProvider from './Provider/AuthProvider.jsx'

AOS.init({
  offset: 120,
  duration: 600,
  easing: 'ease-in-out',
  once: true,
});

const queryClint = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClint}>
      <AuthProvider>
        <RouterProvider router={route}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
