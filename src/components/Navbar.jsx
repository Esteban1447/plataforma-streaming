import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Registro</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
