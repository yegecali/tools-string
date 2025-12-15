import './styles/App.css'
import { Outlet } from 'react-router-dom'
import Navigation from './components/Navigation'

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  )
}

export default App
