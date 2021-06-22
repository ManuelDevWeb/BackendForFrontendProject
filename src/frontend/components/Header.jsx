//Importando react
import React from 'react';
//Importando Link
import { Link } from 'react-router-dom';
//Importando connect, que nos ayuda a conectar nuestra aplicación
import { connect } from 'react-redux';
//Importando actions
import classNames from 'classnames';
import { logoutRequest } from '../actions/index';
//Importando gravatar
import gravatar from '../utils/Gravatar';
//Importar classNames para las validaciones
//Importando estilos
import '../assets/styles/components/Header.scss';
//Importando imagenes
import logo from '../assets/static/logo-platzi-video-BW2.png';
import userIcon from '../assets/static/user-icon.png';

//Creando componente
const Header = (props) => {
  const { user, isLogin, isRegister } = props;

  //Validacion para saber si user tiene elementos (Tenemos objeto de users)
  const hasUser = Object.keys(user).includes('email');
  //const hasUser=Object.keys(user).length > 0;

  //Funcion que nos permita cerrar sesión
  const handleLogout = () => {
    props.logoutRequest({
      //Enviamos objeto vacio, lo cual indica que no hay usuario
    });
  };

  //Logica que nos ayuda a validar si se encuentra dentro del login o registro
  const headerClass = classNames('header', {
    //Pasa la propiedad que traiga el componente, puede ser login o registro
    isLogin,
    isRegister,
  });

  return (
    <header className={headerClass}>
      <Link to='/'>
        <img className='header__img' src={logo} alt='Platzi Video' />
      </Link>

      <div className='header__menu'>
        <div className='header__menu--profile'>
          {
            //Validacion para saber si mostrar el avatar o no
            hasUser ?
              <img src={gravatar(user.email)} alt={user.email} /> :
              <img src={userIcon} alt='' />
          }
          <p>Perfil</p>
        </div>
        <ul>
          {
            //Validacion para saber si tenemos o no una cuenta iniciada
            //Si existe el usuario mostramos su nombre
            hasUser ?
              <li><a href='/'>{user.name}</a></li> :
              //De lo contrario nada
              null
          }

          {
            //Validacion para mostrar el login
            hasUser ?
              //Si el usuario esta logeado, mostramos cerrar sesion
              <li><a href='#logout' onClick={handleLogout}>Cerrar Sesión</a></li> :
              //Si no esta logeado, mostramos iniciar sesion
              (
                <li>
                  <Link to='/login'>
                    Iniciar sesión
                  </Link>
                </li>
              )
          }

        </ul>
      </div>
    </header>
  );
};

//Funcion que nos permite acceder al state
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

//Funcion que nos permite disparar los elementos por medio de los actions
const mapDispatchToProps = {
  //Actions
  logoutRequest,
};

//Exportando componente
//Enviamos el mapeo de los props y los elementos que vamos a disparar o utilizar por medio de los actions
export default connect(mapStateToProps, mapDispatchToProps)(Header);
