//Importando React
import React, { useState, Fragment } from 'react';
//Importando connect,  que nos ayuda a conectar nuestra aplicación
import { connect } from 'react-redux';
//Importando Link
import { Link } from 'react-router-dom';
//Importando Actions
import { loginRequest } from '../actions/index';
//Importando Header
import Header from '../components/Header';
//Importando estilos
import '../assets/styles/components/Login.scss';
//Importando imagenes
import googleIcon from '../assets/static/google-icon.png';
import twitterIcon from '../assets/static/twitter-icon.png';

//Creando componente
const Login = (props) => {
  //useState para almacener la información del formulario
  const [form, setValue] = useState({
    email: '',
  });

  //Funcion que maneja los cambios de los inputs del form
  const handleInput = (event) => {
    setValue({
      //Copiamos los elementos que ya estan el el state de form
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  //Funcion que envia los elementos capturados
  const handleSubmit = (event) => {
    event.preventDefault();
    //Enviando la informacion por medio de loginRequest al estado
    props.loginRequest(form);
    //History maneja todo el flujo de las rutas y navegacion
    //Si cumple con el login, lo redirigimos al home.
    props.history.push('/');
  };

  return (
    <>
      <Header isLogin />
      <section className='login'>
        <section className='login__container'>
          <h2>Inicia sesión</h2>
          <form className='login__container--form' onSubmit={handleSubmit}>
            <input
              name='email'
              className='input'
              type='text'
              placeholder='Correo'
              onChange={handleInput}
            />
            <input
              name='Password'
              className='input'
              type='password'
              placeholder='Contraseña'
              onChange={handleInput}
            />
            <button className='button' type='submit'>Iniciar sesión</button>
            <div className='login__container--remember-me'>
              <label htmlFor='cbox1'>
                <input type='checkbox' id='cbox1' value='first_checkbox' />
                Recuérdame
              </label>
              <a href='/'>Olvidé mi contraseña</a>
            </div>
          </form>
          <section className='login__container--social-media'>
            <div>
              <img src={googleIcon} alt='Google icon' />
              {' '}
              Inicia sesión con Google
            </div>
            <div>
              <img src={twitterIcon} alt='Twitter icon' />
              {' '}
              Inicia sesión con Twitter
            </div>
          </section>
          <p className='login__container--register'>
            {' '}
            No tienes ninguna cuenta
            <Link to='/register'>
              Regístrate
            </Link>
          </p>
        </section>
      </section>
    </>
  );
};

//Funcion que nos permite disparar los elementos por medio de los actions
const mapDispatchToProps = {
  //Action que usaremos
  loginRequest,
};

//Exportando componente
//Enviamos el mapeo de los props y los elementos que vamos a disparar o utilizar por medio de los actions
export default connect(null, mapDispatchToProps)(Login);
