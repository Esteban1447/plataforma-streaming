import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';
import Swal from 'sweetalert2';

function AuthGuard({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      Swal.fire({
        icon: 'warning',
        title: 'Acceso Denegado',
        text: 'Debes iniciar sesión primero'
      });
      navigate('/login');
    }
  }, [navigate]);

  return children;
}

export default AuthGuard;
