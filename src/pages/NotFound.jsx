import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>404: Página no encontrada</h1>
      <Link to="/">Volver al inicio</Link>
    </div>
  )
}

export default NotFound
