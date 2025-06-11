import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/MovieCarousel.css';

const movies = [
  {
    id: 1,
    title: "Tranformers",
    image: "https://www.slashfilm.com/img/gallery/does-transformers-rise-of-the-beasts-have-a-credits-scene-a-spoiler-free-guide/l-intro-1686082283.jpg",
    description: "La historia Optimus Prime y sus amigos robots"
  },
  {
    id: 2,
    title: "Barbie",
    image: "https://juanramirezteinforma.com/wp-content/uploads/2023/07/barbie-la-pelicula-ya-tiene-ganancias-estimadas-para-su-fin-de-semana-de-estreno-en-cines-1163605.jpg",
    description: "Una aventura en el mundo de Barbie"
  },
  {
    id: 3,
    title: "Spider-Man",
    image: "https://cdn.forbes.com.mx/2021/12/Spiderman-no-way-home-pelicula-.jpg",
    description: "Las aventuras del héroe arácnido"
  },
  {
    id: 4,
    title: "Avatar 2",
    image: "https://th.bing.com/th/id/R.6b6c0729adb2ab03453b50aa549a7984?rik=Q%2fJU8MQWWW4zvQ&pid=ImgRaw&r=0",
    description: "El camino del agua"
  }
];

function MovieCarousel() {
  return (
    <div className="movie-carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="slide-content">
              <img 
                src={movie.image} 
                alt={movie.title}
                className="carousel-image"
              />
              <div className="slide-info">
                <h2>{movie.title}</h2>
                <p>{movie.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MovieCarousel;
