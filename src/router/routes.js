const routes = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  SUSCRIPCIONES: '/suscripciones',
  PERFIL: '/perfil',
  NOT_FOUND: '*'
};

export const privateRoutes = [
  routes.SUSCRIPCIONES,
  routes.PERFIL
];

export default routes;
