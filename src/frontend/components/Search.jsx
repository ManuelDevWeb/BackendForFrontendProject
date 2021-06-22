//Importando react
import React from 'react';
//Importando Conenct, que nos ayuda a conectar nuestra aplicación
import { connect } from 'react-redux';
//Importando actions
import classNames from 'classnames';
import { getVideoSearch } from '../actions/index';
//Importar classNames para las validaciones
//Importando estilos
import '../assets/styles/components/Search.scss';

//Creando componente
const Search = ({ isHome, getVideoSearch }) => {

  //Lógica para manejar los estilos de los input
  const inputStyle = classNames('input', {
    //Pasar las propiedades que traiga el componente
    isHome,
  });

  //Funcion para obtener el valor del input search
  const handleInput = (event) => {
    getVideoSearch(event.target.value);
  };

  return (
    <section className='main'>
      <h2 className='main__title'>¿Qué quieres ver hoy?</h2>
      <input
        type='text'
        className={inputStyle}
        placeholder='Buscar...'
        onKeyUp={handleInput}
      />
    </section>
  );
};

//Funcion que nos permite disparar los elementos por medio de los actions
const mapDispatchToProps = {
  //Action que usaremos
  getVideoSearch,
};

//Funcion que nos permite acceder al state
const mapStateToProps = (state) => {
  return {
    searchResult: state.searchResult,
  };
};

//Exportando componente
//Enviamos el mapeo de los props y los elementos que vamos a disparar o utilizar por medio de los actions
export default connect(mapStateToProps, mapDispatchToProps)(Search);
