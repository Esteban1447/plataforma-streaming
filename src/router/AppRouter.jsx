import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import Suscripciones from '../pages/Suscripciones';
import routes from './routes';

function AppRouter() {
  return (
    <Routes>
      <Route path={routes.HOME} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.REGISTER} element={<Register />} />
        
        {/* Rutas Protegidas */}
        <Route path={routes.SUSCRIPCIONES} element={
          <PrivateRoute>
            <Suscripciones />
          </PrivateRoute>
        } />
        
        <Route path={routes.NOT_FOUND} element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
