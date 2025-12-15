import type { RouteObject } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Base64Page from '../pages/Base64Page'
import URLPage from '../pages/URLPage'
import JSONPage from '../pages/JSONPage'
import DiffPage from '../pages/DiffPage'
import YAMLPage from '../pages/YAMLPage'
import HashPage from '../pages/HashPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>Página no encontrada</div>,
  },
  {
    path: '/base64',
    element: <Base64Page />,
  },
  {
    path: '/url',
    element: <URLPage />,
  },
  {
    path: '/json',
    element: <JSONPage />,
  },
  {
    path: '/diff',
    element: <DiffPage />,
  },
  {
    path: '/yaml',
    element: <YAMLPage />,
  },
  {
    path: '/hash',
    element: <HashPage />,
  },
]

export const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/base64', label: 'Base64' },
  { path: '/url', label: 'URL' },
  { path: '/json', label: 'JSON' },
  { path: '/diff', label: 'Diff' },
  { path: '/yaml', label: 'YAML' },
  { path: '/hash', label: 'Hash' },
]

