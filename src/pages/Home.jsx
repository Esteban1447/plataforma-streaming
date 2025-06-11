import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';
import MovieCarousel from '../components/MovieCarousel';
import SubscriptionForm from '../components/SubscriptionForm';
import { createSubscription } from '../services/subscriptions';
import '../styles/Home.css';

function Home() {
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const features = [
    {
      icon: '🎬',
      title: 'Luno Video',
      description: 'Accede a miles de películas y series exclusivas',
      categoria: 'Streaming',
      serviciosSugeridos: ['Luno Premium', 'Luno Familiar', 'Luno Basic']
    },
    {
      icon: '🎵',
      title: 'Luno Music',
      description: 'Tu música favorita sin límites ni anuncios',
      categoria: 'Música',
      serviciosSugeridos: ['Luno Music Premium', 'Luno Music Familiar', 'Luno Music Free']
    },
    {
      icon: '📚',
      title: 'Luno Books',
      description: 'Miles de libros y audiolibros en tu bolsillo',
      categoria: 'Lectura',
      serviciosSugeridos: ['Luno Books Unlimited', 'Luno Books Plus', 'Luno Books Basic']
    },
    {
      icon: '🎮',
      title: 'Luno Games',
      description: 'Juega sin límites con nuestra biblioteca premium',
      categoria: 'Gaming',
      serviciosSugeridos: ['Luno Games Ultimate', 'Luno Games Pro', 'Luno Games Basic']
    }
  ];

  const handleFeatureClick = (feature) => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    setSelectedService(feature);
    setShowForm(true);
  };

  const handleSubscription = async (subscriptionData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const result = await createSubscription({
        ...subscriptionData,
        userId: user.id,
      });
      
      if (result.success) {
        setShowForm(false);
        return { success: true };
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <div>
      <MovieCarousel />
      <section className="hero-section">
        <h1 className="hero-title">Tu Plataforma Multimedia Todo en Uno</h1>
        <p className="hero-subtitle">
          Disfruta de entretenimiento ilimitado con una sola suscripción
        </p>
        {!isAuthenticated() && (
          <Link to="/register" className="cta-button">
            Comenzar Ahora
          </Link>
        )}
      </section>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="feature-card"
            onClick={() => handleFeatureClick(feature)}
            style={{ cursor: 'pointer' }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>

      {showForm && selectedService && (
        <SubscriptionForm
          initialData={{
            categoria: selectedService.categoria,
            serviciosSugeridos: selectedService.serviciosSugeridos
          }}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubscription}
        />
      )}
    </div>
  );
}

export default Home;
