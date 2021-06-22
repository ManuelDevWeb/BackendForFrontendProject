//Importando react
import React from 'react';
//Importando prop-types
import PropTypes from 'prop-types';
//Importando Conenct, que nos ayuda a conectar nuestra aplicación
import { connect } from 'react-redux';
//Importando Link
import { Link } from 'react-router-dom';
//Importando Actions
import { setFavorite, deleteFavorite } from '../actions/index';
//Importando estilos
import '../assets/styles/components/CarouselItem.scss';
//Importando imagenes
import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';
import removeIcon from '../assets/static/remove-icon.png';

//Creando componente
const CarouselItem = (props) => {
  const { id, cover, title, year, contentRating, duration, setFavorite, deleteFavorite, isList } = props;

  //Funcion que maneja el guardado hacia nuestros favoritos
  const handleSetFavorite = () => {
    setFavorite({
      //Objetos con los elementos que les vamos a pasar
      id,
      cover,
      title,
      year,
      contentRating,
      duration,
    });
  };

  //Funcion que maneja el eliminado de favoritos
  const handleDeleteFavorite = () => {
    deleteFavorite(id);
  };

  return (
    <div className='carousel-item'>
      <img className='carousel-item__img' src={cover} alt={title} />
      <div className='carousel-item__details'>
        <div>

          <Link to={`/player/${id}`}>
            <img
              className='carousel-item__details--img'
              src={playIcon}
              alt='Play Icon'
            />
          </Link>

          {
            //Mostrando el icono de eliminar solo cuando isList es true, caso contrario muestra el icono de favorito
            isList ?
              (
                <img
                  className='carousel-item__details--img'
                  src={removeIcon}
                  alt='Remove Icon'
                  onClick={handleDeleteFavorite}
                />
              ) :
              (
                <img
                  className='carousel-item__details--img'
                  src={plusIcon}
                  alt='Plus Icon'
                  onClick={handleSetFavorite}
                />
              )
          }

        </div>
        <p className='carousel-item__details--title'>{title}</p>
        <p className='carousel-item__details--subtitle'>
          {`${year} ${contentRating} ${duration}`}
        </p>
      </div>
    </div>
  );
};

//Documentando propiedades del componente
CarouselItem.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
};

//Funcion que nos permite disparar los elementos por medio de los actions
const mapDispatchToProps = {
  //Action que usaremos
  setFavorite,
  deleteFavorite,
};

//Funcion que nos permite acceder al state
const mapStateToProps = (state) => {
  return {
    mylist: state.mylist,
  };
};

//Exportando componente
//Enviamos el mapeo de los props y los elementos que vamos a disparar o utilizar por medio de los actions
export default connect(mapStateToProps, mapDispatchToProps)(CarouselItem);
