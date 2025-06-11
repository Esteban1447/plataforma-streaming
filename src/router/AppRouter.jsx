import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import Suscripciones from '../pages/Suscripciones';
import EditarSuscripcion from '../pages/EditarSuscripcion';
import Home from '../pages/Home';
import routes from './routes';

function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path={routes.REGISTER} element={<Register />} />
        
        {/* Rutas Protegidas */}
        <Route path={routes.SUSCRIPCIONES} element={
          <PrivateRoute>
            <Suscripciones />
          </PrivateRoute>
        } />
        <Route path={`${routes.SUSCRIPCIONES}/:id/editar`} element={
          <PrivateRoute>
            <EditarSuscripcion />
          </PrivateRoute>
        } />
        <Route path={routes.HOME} element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        
        <Route path={routes.NOT_FOUND} element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
