import { fetchApi, endpoints } from './api';

export const planesLuno = {
  video: [
    { id: 'v1', nombre: 'Luno Premium', precio: 15.99, calidad: '4K', dispositivos: 4 },
    { id: 'v2', nombre: 'Luno Familiar', precio: 11.99, calidad: '1080p', dispositivos: 2 },
    { id: 'v3', nombre: 'Luno Basic', precio: 7.99, calidad: '720p', dispositivos: 1 }
  ],
  music: [
    { id: 'm1', nombre: 'Luno Music Premium', precio: 9.99, calidad: 'HiFi', dispositivos: 'Ilimitados' },
    { id: 'm2', nombre: 'Luno Music Familiar', precio: 14.99, calidad: 'Alta', dispositivos: 6 },
    { id: 'm3', nombre: 'Luno Music Free', precio: 0, calidad: 'Estándar', dispositivos: 1 }
  ],
  books: [
    { id: 'b1', nombre: 'Luno Books Unlimited', precio: 9.99, acceso: 'Ilimitado', audiobooks: true },
    { id: 'b2', nombre: 'Luno Books Plus', precio: 7.99, acceso: '5 libros/mes', audiobooks: true },
    { id: 'b3', nombre: 'Luno Books Basic', precio: 4.99, acceso: '2 libros/mes', audiobooks: false }
  ],
  games: [
    { id: 'g1', nombre: 'Luno Games Ultimate', precio: 14.99, juegos: 'Todos', extras: 'Contenido exclusivo' },
    { id: 'g2', nombre: 'Luno Games Pro', precio: 9.99, juegos: 'Biblioteca básica', extras: 'Algunos DLCs' },
    { id: 'g3', nombre: 'Luno Games Basic', precio: 4.99, juegos: 'Selección limitada', extras: 'No incluye' }
  ]
};

export const createSubscription = async (subscriptionData) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    
    const newSubscription = {
      ...subscriptionData,
      userId: user.id,
      fechaCreacion: new Date().toISOString()
    };

    const response = await fetchApi(endpoints.suscripciones, {
      method: 'POST',
      body: JSON.stringify(newSubscription),
    });

    if (!response.id) {
      throw new Error('Error al crear la suscripción');
    }

    return { success: true, data: response };
  } catch (error) {
    console.error('Error creando suscripción:', error);
    return { 
      success: false, 
      error: error.message || 'Error al crear la suscripción'
    };
  }
};

export const getUserSubscriptions = async (userId) => {
  try {
    const response = await fetchApi(`${endpoints.suscripciones}?userId=${userId}`);
    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const cancelSubscription = async (userId, categoria) => {
  try {
    const response = await fetchApi(`${endpoints.suscripciones}?userId=${userId}&categoria=${categoria}`);
    if (response && response.length > 0) {
      const subscription = response[0];
      await fetchApi(`${endpoints.suscripciones}/${subscription.id}`, {
        method: 'DELETE'
      });
      return { success: true };
    }
    throw new Error('No se encontró la suscripción');
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const checkExistingSubscription = async (userId, categoria) => {
  try {
    const suscripciones = await fetchApi(`${endpoints.suscripciones}?userId=${userId}&categoria=${categoria}&estado=activa`);
    return suscripciones.length > 0;
  } catch (error) {
    console.error('Error al verificar suscripción:', error);
    return false;
  }
};
