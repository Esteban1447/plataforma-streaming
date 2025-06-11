import { useState } from 'react';
import SubscriptionForm from '../components/SubscriptionForm';

function Suscripciones() {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (subscription) => {
    // Aquí implementaremos la lógica para guardar en la API
    console.log('Nueva suscripción:', subscription);
  };

  return (
    <div>
      <div className="header">
        <h1>Mis Suscripciones</h1>
        <button onClick={() => setShowForm(true)} className="btn-add">
          Nueva Suscripción
        </button>
      </div>

      {showForm && (
        <SubscriptionForm
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default Suscripciones;
