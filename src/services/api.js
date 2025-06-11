const API_URL = 'https://api-prueba-uno.onrender.com';

export const fetchApi = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    console.log(`🚀 Fetching ${API_URL}${endpoint}`);
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...defaultOptions,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('📦 Response data:', data);
    return data;
  } catch (error) {
    console.error('❌ API Error:', error.message);
    throw error;
  }
};

export const endpoints = {
  usuarios: '/usuarios',
  suscripciones: '/suscripciones',
};
