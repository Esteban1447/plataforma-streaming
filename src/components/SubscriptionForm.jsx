import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { cancelSubscription, checkExistingSubscription } from '../services/subscriptions';
import '../styles/SubscriptionForm.css';

// Configuración del tema para SweetAlert2
const swalConfig = {
  background: 'var(--secondary-background)',
  color: 'var(--text-color)',
  confirmButtonColor: 'var(--primary-color)',
  cancelButtonColor: '#dc3545',
  customClass: {
    popup: 'alert-popup',
    title: 'alert-title',
    htmlContainer: 'alert-content',
    confirmButton: 'alert-confirm-button',
    cancelButton: 'alert-cancel-button'
  }
};

function SubscriptionForm({ initialData, onClose, onSubmit }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const planes = {
    'Streaming': [
      {
        id: 'stream-premium',
        nombre: 'Luno Video Premium',
        precio: 45900,
        icon: '🎬',
        descripcion: 'La mejor experiencia de streaming',
        caracteristicas: ['4K Ultra HD', '4 dispositivos', 'Descargas offline', 'Estrenos exclusivos']
      },
      {
        id: 'stream-familiar',
        nombre: 'Luno Video Familiar',
        precio: 32900,
        icon: '🎥',
        descripcion: 'Ideal para toda la familia',
        caracteristicas: ['1080p Full HD', '2 dispositivos', 'Descargas offline', 'Contenido familiar']
      },
      {
        id: 'stream-basic',
        nombre: 'Luno Video Basic',
        precio: 16900,
        icon: '📺',
        descripcion: 'Comienza a disfrutar',
        caracteristicas: ['720p HD', '1 dispositivo', 'Sin descargas', 'Catálogo básico']
      }
    ],
    'Música': [
      {
        id: 'music-premium',
        nombre: 'Luno Music Premium',
        precio: 17900,
        icon: '🎵',
        descripcion: 'Música sin límites',
        caracteristicas: ['Calidad HiFi', 'Sin anuncios', 'Modo offline', 'Letras sincronizadas']
      },
      {
        id: 'music-duo',
        nombre: 'Luno Music Dúo',
        precio: 23900,
        icon: '🎼',
        descripcion: 'Comparte la música',
        caracteristicas: ['2 cuentas premium', 'Calidad Alta', 'Playlist compartidas', 'Sin anuncios']
      },
      {
        id: 'music-familiar',
        nombre: 'Luno Music Familiar',
        precio: 28900,
        icon: '🎹',
        descripcion: 'Para toda la familia',
        caracteristicas: ['6 cuentas premium', 'Control parental', 'Mix familiares', 'Sin anuncios']
      }
    ],
    'Lectura': [
      {
        id: 'books-unlimited',
        nombre: 'Luno Books Unlimited',
        precio: 44900,
        icon: '📚',
        descripcion: 'Acceso ilimitado a más de 1 millón de libros y audiolibros',
        caracteristicas: ['Descarga sin límites', 'Audiolibros premium', 'Sin anuncios']
      },
      {
        id: 'books-plus',
        nombre: 'Luno Books Plus',
        precio: 37900,
        icon: '📖',
        descripcion: 'Gran selección de libros con algunas limitaciones',
        caracteristicas: ['10 descargas mensuales', 'Audiolibros básicos', 'Sin anuncios']
      },
      {
        id: 'books-basic',
        nombre: 'Luno Books Basic',
        precio: 17900,
        icon: '📱',
        descripcion: 'Acceso básico a nuestra biblioteca',
        caracteristicas: ['3 descargas mensuales', 'Sin audiolibros', 'Anuncios limitados']
      }
    ],
    'Gaming': [
      {
        id: 'games-ultimate',
        nombre: 'Luno Games Ultimate',
        precio: 66900,  
        icon: '🎮',
        descripcion: 'La experiencia gaming definitiva',
        caracteristicas: ['Todos los juegos premium', 'Contenido exclusivo', 'Modo sin conexión']
      },
      {
        id: 'games-pro',
        nombre: 'Luno Games Pro',
        precio: 49900,
        icon: '🕹️',
        descripcion: 'Para gamers apasionados',
        caracteristicas: ['Juegos seleccionados', 'Algunos contenidos extra', 'Juego en la nube']
      },
      {
        id: 'games-basic',
        nombre: 'Luno Games Basic',
        precio: 17900,
        icon: '🎲',
        descripcion: 'Comienza tu aventura gaming',
        caracteristicas: ['Juegos básicos', 'Sin contenido extra', 'Solo modo online']
      }
    ]
  };

  // Función para calcular fecha de renovación (un mes después)
  const calcularFechaRenovacion = () => {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() + 1);
    return fecha.toISOString().split('T')[0];
  };

  const handleShowDetails = (plan) => {
    Swal.fire({
      title: 'Detalles de tu suscripción',
      html: `
        <div class="subscription-details">
          <p><strong>Plan:</strong> ${plan.nombre}</p>
          <p><strong>Precio:</strong> $${plan.precio.toLocaleString()} /mes</p>
          <p><strong>Próxima renovación:</strong> ${calcularFechaRenovacion()}</p>
          <p><strong>Estado:</strong> Activa</p>
        </div>
      `,
      showCancelButton: true,
      cancelButtonText: 'Cancelar suscripción',
      confirmButtonText: 'Cerrar',
      reverseButtons: true,
      customClass: {
        cancelButton: 'btn-danger'
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlan) {
      Swal.fire('Error', 'Por favor selecciona un plan', 'error');
      return;
    }

    // Calcular fecha de renovación (un mes después de la fecha de inicio)
    const fechaInicio = new Date().toISOString().split('T')[0];
    const fechaRenovacion = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0];

    const subscriptionData = {
      servicio: selectedPlan.nombre,
      costo: selectedPlan.precio,
      moneda: 'COP',
      fechaInicio: fechaInicio,
      fechaRenovacion: fechaRenovacion,
      frecuencia: 'mensual',
      estado: 'activa',
      notas: `Plan ${selectedPlan.nombre} - ${selectedPlan.descripcion}`,
      categoria: initialData.categoria,
      caracteristicas: selectedPlan.caracteristicas
    };

    const result = await onSubmit(subscriptionData);

    if (result.success) {
      Swal.fire('¡Éxito!', 'Suscripción realizada correctamente', 'success');
      onClose();
    } else {
      Swal.fire('Error', result.error || 'Error al procesar la suscripción', 'error');
    }
  };

  const handleCancelSubscription = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
      Swal.fire('Error', 'Necesitas iniciar sesión', 'error');
      return;
    }

    const result = await Swal.fire({
      ...swalConfig,
      title: '¿Estás seguro de cancelar?',
      text: 'Tu suscripción se cancelará inmediatamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener',
      iconColor: '#ffa502'
    });

    if (result.isConfirmed) {
      try {
        const response = await cancelSubscription(user.id, initialData.categoria);
        
        if (response.success) {
          await Swal.fire({
            ...swalConfig,
            icon: 'success',
            title: 'Suscripción Cancelada',
            text: 'Tu suscripción ha sido cancelada exitosamente',
            timer: 2000,
            showConfirmButton: false,
            iconColor: '#4CAF50'
          });
          setIsSubscribed(false);
          onClose();
        } else {
          throw new Error('No se pudo cancelar la suscripción');
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'No se pudo cancelar la suscripción'
        });
      }
    }
  };

  useEffect(() => {
    // Verificar si el usuario ya está suscrito a este servicio
    const checkSubscription = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        try {
          const response = await fetch(`https://api-prueba-uno.onrender.com/suscripciones?userId=${user.id}&categoria=${initialData.categoria}`);
          const data = await response.json();
          setIsSubscribed(data.length > 0);
        } catch (error) {
          console.error('Error al verificar suscripción:', error);
        }
      }
    };
    checkSubscription();
  }, [initialData.categoria]);

  return (
    <div className="subscription-form-overlay">
      <div className="subscription-form">
        <button 
          className="btn-close" 
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <h2>Selecciona tu plan de {initialData.categoria}</h2>
        
        {isSubscribed ? (
          <div className="subscription-message">
            <div className="subscription-details">
              <div className="subscription-badge">Suscripción Activa</div>
              <h3>{selectedPlan?.nombre}</h3>
              <p className="subscription-price">${selectedPlan?.precio.toLocaleString()} /mes</p>
              <p className="subscription-date">
                Válido hasta: {calcularFechaRenovacion()}
              </p>
              <p className="subscription-status">
                Estado: <span className="status-active">Activo</span>
              </p>
              <div className="subscription-actions">
                <button 
                  className="btn-danger"
                  onClick={handleCancelSubscription}
                >
                  Cancelar Suscripción
                </button>
                <button 
                  className="btn-primary"
                  onClick={onClose}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="planes-grid">
              {planes[initialData.categoria]?.map((plan) => (
                <div
                  key={plan.id}
                  className={`plan-card ${selectedPlan?.id === plan.id ? 'selected' : ''}`}
                  onClick={() => setSelectedPlan(plan)}
                >
                  <div className="plan-icon">{plan.icon}</div>
                  <h3>{plan.nombre}</h3>
                  <div className="plan-precio">{plan.precio} /mes</div>
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
          </>
        )}
      </div>
    </div>
  );
}

export default SubscriptionForm;
