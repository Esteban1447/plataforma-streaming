import { useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/SubscriptionForm.css';

const PLANES_SERVICIOS = {
  'Streaming': [
    {
      nombre: 'Netflix Premium',
      precio: 45900,
      descripcion: 'Ultra HD + 4 pantallas',
      icono: '🎬'
    },
    {
      nombre: 'Netflix Estándar',
      precio: 32900,
      descripcion: 'Full HD + 2 pantallas',
      icono: '🎬'
    },
    {
      nombre: 'Netflix Básico',
      precio: 16900,
      descripcion: 'HD + 1 pantalla',
      icono: '🎬'
    }
  ],
  'Música': [
    {
      nombre: 'Spotify Premium',
      precio: 17900,
      descripcion: 'Música sin anuncios',
      icono: '🎵'
    },
    {
      nombre: 'Spotify Dúo',
      precio: 23900,
      descripcion: '2 cuentas Premium',
      icono: '🎵'
    },
    {
      nombre: 'Spotify Familiar',
      precio: 28900,
      descripcion: '6 cuentas Premium',
      icono: '🎵'
    }
  ]
};

function SubscriptionForm({ initialData, onClose, onSubmit }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectPlan = async (plan) => {
    setSelectedPlan(plan);
    const result = await Swal.fire({
      title: '¿Confirmar suscripción?',
      html: `
        <div class="confirmation-details">
          <p><strong>Plan:</strong> ${plan.nombre}</p>
          <p><strong>Precio:</strong> $${plan.precio.toLocaleString()} /mes</p>
          <p><strong>Características:</strong> ${plan.descripcion}</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, suscribirme',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const submitResult = await onSubmit({
          servicio: plan.nombre,
          costo: plan.precio,
          moneda: 'COP',
          fechaInicio: new Date().toISOString().split('T')[0],
          categoria: initialData?.categoria,
          estado: 'activa'
        });

        if (submitResult.success) {
          await Swal.fire('¡Éxito!', 'Suscripción creada correctamente', 'success');
          onClose();
        } else {
          throw new Error(submitResult.error);
        }
      } catch (error) {
        await Swal.fire('Error', error.message, 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const planes = PLANES_SERVICIOS[initialData?.categoria] || [];

  return (
    <div className="subscription-form-overlay">
      <div className="subscription-form">
        <h2>Selecciona tu plan de {initialData?.categoria}</h2>
        <div className="planes-grid">
          {planes.map((plan, index) => (
            <div 
              key={index} 
              className={`plan-card ${selectedPlan === plan ? 'selected' : ''}`}
              onClick={() => handleSelectPlan(plan)}
            >
              <div className="plan-icon">{plan.icono}</div>
              <h3>{plan.nombre}</h3>
              <p className="plan-precio">${plan.precio.toLocaleString()} /mes</p>
              <p className="plan-descripcion">{plan.descripcion}</p>
            </div>
          ))}
        </div>
        <button className="btn-cancel" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

export default SubscriptionForm;
