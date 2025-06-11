import { Outlet, useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../services/auth'
import Swal from 'sweetalert2'

function Layout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      background: 'var(--secondary-background)',
      color: 'var(--text-color)',
      confirmButtonColor: 'var(--primary-color)'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user')
        navigate('/')
      }
    })
  }

  return (
    <div className="app">
      <header>
        {isAuthenticated() && (
          <button onClick={handleLogout} className="logout-btn">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 13v-2H7V8l-5 4 5 4v-3z" />
              <path d="M20 3h-9c-1.1 0-2 .9-2 2v4h2V5h9v14h-9v-4H9v4c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
            </svg>
            Cerrar Sesión
          </button>
        )}
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2024 Plataforma Multimedia</p>
      </footer>
    </div>
  )
}

export default Layout
