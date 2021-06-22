//Importando react
import React, { useEffect } from 'react';
//Importando Conenct, que nos ayuda a conectar nuestra aplicación
import { connect } from 'react-redux';
//Importando NotFound
import NotFound from './NotFound';
//Importando actions
import { getVideoSource } from '../actions/index';
//Importando estilos
import '../assets/styles/components/Player.scss';

//Creando componente
const Player = (props) => {
  const { match, playing } = props;

  //Esto nos lo envia router en el momento en el que generamos la ruta .../player/id
  const { id } = match.params;

  //Validar si hay un video que se esta ejecutando, playing tiene 1 o mas elementos
  const hasPlaying = Object.keys(playing).length > 0;

  //useEffect se ejecuta por primera vez antes del render
  useEffect(() => {
    props.getVideoSource(id);
  }, []);

  //Si hay video en playing, retorna la vista sino redirecciona a /404/
  return hasPlaying ? (
    <div className='Player'>
      <video controls autoPlay>
        <source src={playing.source} type='video/mp4' />
      </video>
      <div className='Player-back'>
        <button
          type='button'
          //Metodo para ir atras en el navegador cuando se de click
          onClick={() => props.history.goBack()}
        >
          Regresar
        </button>
      </div>
    </div>
  ) : <NotFound />;
};

//Funcion que nos permite extraer los elementos del state
const mapStateToProps = (state) => {
  return {
    playing: state.playing,
  };
};

//Funcion que nos permite disparar los elementos por medio de los actions
const mapDispatchToProps = {
  //Action que usaremos
  getVideoSource,
};

//Exportando componente
//Enviamos el mapeo de los props y los elementos que vamos a disparar o utilizar por medio de los actions
export default connect(mapStateToProps, mapDispatchToProps)(Player);
