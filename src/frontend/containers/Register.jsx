//Importando React
import React, { useState, Fragment } from 'react';
//Importando connect,  que nos ayuda a conectar nuestra aplicación
import { connect } from 'react-redux';
//Importando actions
import { Link } from 'react-router-dom';
import { registerRequest } from '../actions/index';
//Importando Header
import Header from '../components/Header';
//Importando Link
//Importando estilos
import '../assets/styles/components/Register.scss';

//Creando componente
const Register = (props) => {
  //useState para almacenar la información de registro
  const [form, setValues] = useState({
    email: '',
    name: '',
    password: '',
  });

  //Funcion que maneja los cambios de los inputs del form
  const handleInput = (event) => {
    setValues({
      //Copiamos los elementos que ya estan el el state de form
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  //Funcion que envia los elementos capturados
  const handleSubmit = (event) => {
    event.preventDefault();
    //Enviando la informacion por medio de registerRequest al estado
    props.registerRequest(form);
    //History maneja todo el flujo de las rutas y navegacion
    //Si cumple con el register, lo redirigimos al home.
    props.history.push('/');
  };

  return (
    <>
      <Header isRegister />
      <section className='register'>
        <section className='register__container'>
          <h2>Regístrate</h2>
          <form className='register__container--form' onSubmit={handleSubmit}>
            <input
              name='name'
              className='input'
              type='text'
              placeholder='Nombre'
              onChange={handleInput}
            />
            <input
              name='email'
              className='input'
              type='text'
              placeholder='Correo'
              onChange={handleInput}
            />
            <input
              name='password'
              className='input'
              type='password'
              placeholder='Contraseña'
              onChange={handleInput}
            />
            <button className='button' type='button'>Registrarme</button>
          </form>
          <Link to='/login'>
            Iniciar sesión
          </Link>
        </section>
      </section>
    </>
  );
};

//Funcion que nos permite disparar los elementos por medio de los actions
const mapDispatchToProps = {
  //Action que usaremos
  registerRequest,
};

//Exportando componente
//Enviamos el mapeo de los props y los elementos que vamos a disparar o utilizar por medio de los actions
export default connect(null, mapDispatchToProps)(Register);
