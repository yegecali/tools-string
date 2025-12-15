import { NavLink } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import '../styles/index.css'

function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          🔧 String Tools
        </NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/base64"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Base64
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/url"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              URL
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/json"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              JSON
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/diff"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Diff
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/yaml"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              YAML
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/hash"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Hash
            </NavLink>
          </li>
          <li className="nav-item">
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation

