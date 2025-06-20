import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { route } from './Routes/Route.jsx'
import { RouterProvider } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  offset: 120,
  duration: 600,
  easing: 'ease-in-out',
  once: true,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}></RouterProvider>
  </StrictMode>,
)
