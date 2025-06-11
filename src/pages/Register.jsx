import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth';
import Swal from 'sweetalert2';
import '../styles/Login.css';

function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    nombre: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      Swal.fire({
        title: 'Registrando usuario...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const result = await registerUser(userData);
      
      Swal.close();

      if (result.success) {
        await Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Ya puedes iniciar sesión'
        });
        navigate('/login');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: result.error || 'No se pudo completar el registro'
        });
      }
    } catch (error) {
      console.error('Error en registro:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error de conexión. Por favor, intenta más tarde.'
      });
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-wrapper">
      <div className="card">
        <h4 className="title">¡Regístrate!</h4>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <svg className="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
            </svg>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              className="input-field"
              value={userData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <svg className="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
              <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
            </svg>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input-field"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <svg className="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
              <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"/>
            </svg>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="input-field"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <svg className="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
              <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/>
            </svg>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              className="input-field"
              value={userData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn" type="submit">Registrarse</button>
          <div className="links-container">
            <Link to="/login" className="btn-link">¿Ya tienes cuenta? Inicia sesión</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
