import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { routes } from './routes'

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <div style={{ padding: '20px' }}>Error: Página no encontrada</div>,
    children: routes,
  },
])

