import { fetchApi, endpoints } from './api';

export const loginUser = async (credentials) => {
  try {
    const usuarios = await fetchApi(endpoints.usuarios);
    
    if (!Array.isArray(usuarios)) {
      throw new Error('Error al obtener los usuarios');
    }

    const usuario = usuarios.find(u => 
      u.email?.toLowerCase() === credentials.email?.toLowerCase()
    );

    if (usuario && usuario.password === credentials.password) {
      const { password, ...userWithoutPassword } = usuario;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return { 
        success: true, 
        user: userWithoutPassword 
      };
    }
    
    return { 
      success: false, 
      error: 'Credenciales inválidas' 
    };

  } catch (error) {
    console.error('Error en loginUser:', error);
    return { 
      success: false, 
      error: 'Error al intentar iniciar sesión' 
    };
  }
};

export const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  return !!user;
};

export const registerUser = async (userData) => {
  try {
    const newUser = {
      nombre: userData.nombre,
      correo: userData.email,
      password: userData.password,
      fechaRegistro: new Date().toISOString()
    };

    const response = await fetchApi(endpoints.usuarios, {
      method: 'POST',
      body: JSON.stringify(newUser)
    });

    if (response && response.id) {
      return {
        success: true,
        user: {
          id: response.id,
          email: response.email,
          nombre: response.nombre
        }
      };
    }

    throw new Error('No se pudo crear el usuario');
  } catch (error) {
    if (error.message.includes('duplicate')) {
      return {
        success: false,
        error: 'El email ya está registrado'
      };
    }
    return {
      success: false,
      error: error.message || 'Error al registrar usuario'
    };
  }
};
