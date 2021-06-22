//Importando react
import React from 'react';
//Importando estilos
import '../assets/styles/components/Categories.scss';

//Creando componente
const Categories = ({ children, title }) => (
  <div className='categories'>
    <h3 className='categories__title'>{title}</h3>
    {children}
  </div>
);

//Exportando componente
export default Categories;
