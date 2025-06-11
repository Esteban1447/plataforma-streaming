import { useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/SubscriptionForm.css';

function SubscriptionForm({ initialData, onClose, onSubmit }) {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const planes = {
    'Lectura': [
      {
        id: 'books-unlimited',
        nombre: 'Luno Books Unlimited',
        precio: 14.99,
        icon: '📚',
        descripcion: 'Acceso ilimitado a más de 1 millón de libros y audiolibros',
        caracteristicas: ['Descarga sin límites', 'Audiolibros premium', 'Sin anuncios']
      },
      {
        id: 'books-plus',
        nombre: 'Luno Books Plus',
        precio: 9.99,
        icon: '📖',
        descripcion: 'Gran selección de libros con algunas limitaciones',
        caracteristicas: ['10 descargas mensuales', 'Audiolibros básicos', 'Sin anuncios']
      },
      {
        id: 'books-basic',
        nombre: 'Luno Books Basic',
        precio: 4.99,
        icon: '📱',
        descripcion: 'Acceso básico a nuestra biblioteca',
        caracteristicas: ['3 descargas mensuales', 'Sin audiolibros', 'Anuncios limitados']
      }
    ],
    'Gaming': [
      {
        id: 'games-ultimate',
        nombre: 'Luno Games Ultimate',
        precio: 19.99,
        icon: '🎮',
        descripcion: 'La experiencia gaming definitiva',
        caracteristicas: ['Todos los juegos premium', 'Contenido exclusivo', 'Modo sin conexión']
      },
      {
        id: 'games-pro',
        nombre: 'Luno Games Pro',
        precio: 14.99,
        icon: '🕹️',
        descripcion: 'Para gamers apasionados',
        caracteristicas: ['Juegos seleccionados', 'Algunos contenidos extra', 'Juego en la nube']
      },
      {
        id: 'games-basic',
        nombre: 'Luno Games Basic',
        precio: 7.99,
        icon: '🎲',
        descripcion: 'Comienza tu aventura gaming',
        caracteristicas: ['Juegos básicos', 'Sin contenido extra', 'Solo modo online']
      }
    ]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlan) {
      Swal.fire('Error', 'Por favor selecciona un plan', 'error');
      return;
    }

    const result = await onSubmit({
      plan: selectedPlan,
      categoria: initialData.categoria
    });

    if (result.success) {
      Swal.fire('¡Éxito!', 'Suscripción realizada correctamente', 'success');
      onClose();
    } else {
      Swal.fire('Error', result.error || 'Error al procesar la suscripción', 'error');
    }
  };

  return (
    <div className="subscription-form-overlay">
      <div className="subscription-form">
        <h2>Selecciona tu plan de {initialData.categoria}</h2>
        
        <div className="planes-grid">
          {planes[initialData.categoria]?.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${selectedPlan?.id === plan.id ? 'selected' : ''}`}
              onClick={() => setSelectedPlan(plan)}
            >
              <div className="plan-icon">{plan.icon}</div>
              <h3>{plan.nombre}</h3>
              <div className="plan-precio">${plan.precio}/mes</div>
              <p className="plan-descripcion">{plan.descripcion}</p>
              <ul className="plan-caracteristicas">
                {plan.caracteristicas.map((caracteristica, index) => (
                  <li key={index}>{caracteristica}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button className="btn-submit" onClick={handleSubmit}>
            Suscribirse
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionForm;
