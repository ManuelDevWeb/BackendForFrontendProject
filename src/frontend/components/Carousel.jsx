//Importando react
import React from 'react';
//Importando estilos
import '../assets/styles/components/Carousel.scss';

//Creando componente
const Carousel = ({ children }) => (
  <section className='carousel'>
    <div className='carousel__container'>
      {children}
    </div>
  </section>
);

//Exportando componente
export default Carousel;
