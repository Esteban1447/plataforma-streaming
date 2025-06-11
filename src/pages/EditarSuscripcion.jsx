import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchApi, endpoints } from '../services/api';
import Swal from 'sweetalert2';
import '../styles/EditarSuscripcion.css';

function EditarSuscripcion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState({
    servicio: '',
    costo: '',
    fechaRenovacion: '',
    estado: 'activa'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const data = await fetchApi(`${endpoints.suscripciones}/${id}`);
        setSubscription(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subscription:', error);
        Swal.fire('Error', 'No se pudo cargar la suscripción', 'error');
        navigate('/suscripciones');
      }
    };

    fetchSubscription();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchApi(`${endpoints.suscripciones}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(subscription)
      });

      await Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: 'La suscripción se ha actualizado correctamente'
      });
      
      navigate('/suscripciones');
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar la suscripción', 'error');
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="edit-subscription">
      <h2>Editar Suscripción</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label>Servicio</label>
          <input
            type="text"
            value={subscription.servicio}
            onChange={(e) => setSubscription({...subscription, servicio: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Costo Mensual</label>
          <input
            type="number"
            value={subscription.costo}
            onChange={(e) => setSubscription({...subscription, costo: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Fecha de Renovación</label>
          <input
            type="date"
            value={subscription.fechaRenovacion?.split('T')[0]}
            onChange={(e) => setSubscription({...subscription, fechaRenovacion: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Estado</label>
          <select
            value={subscription.estado}
            onChange={(e) => setSubscription({...subscription, estado: e.target.value})}
          >
            <option value="activa">Activa</option>
            <option value="pausada">Pausada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Guardar Cambios
          </button>
          <button 
            type="button" 
            className="btn-cancel"
            onClick={() => navigate('/suscripciones')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarSuscripcion;
