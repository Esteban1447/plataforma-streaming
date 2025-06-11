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
    const response = await fetchApi('/suscripciones', {
      method: 'POST',
      body: JSON.stringify(subscriptionData),
    });
    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUserSubscriptions = async (userId) => {
  try {
    const response = await fetchApi(`/suscripciones?userId=${userId}`);
    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
