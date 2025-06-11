import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="app">
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
