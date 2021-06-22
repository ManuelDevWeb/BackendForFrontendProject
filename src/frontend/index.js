import React from 'react';
import ReactDOM from 'react-dom';
//Importando Provider para encapsular componentes y poder extraer los estados de alli
import { Provider } from 'react-redux';
//Importando createStore para tener la lógica que nos ayuda a tener un store
import { createStore } from 'redux';
//Importando history para definir la creación del historial de nuestro navegador
import { createBrowserHistory } from 'history';
//Importando router
import { Router } from 'react-router';
//Importando reducer
import reducer from './reducers';
import App from './routes/App';

//Creamos una historia en nuestro frontend logrando que la SPA sea la misma al momento de ir moviéndonos entre rutas.
const history = createBrowserHistory();

const preloadedState = window.__PRELOADED_STATE__;

//Funcion que permite escuchar dentro de nuestro navegador lo que estamos haciendo con redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

//Creando el store para pasarlo al provider
const store = createStore(reducer, preloadedState, composeEnhancers);

delete window.__PRELOADED_STATE__;

ReactDOM.hydrate(
  //Con el store que enviamos el provider conectamos toda nuestra aplicacion para que pueda tener el encapsulado con la data inicial
  <Provider store={store}>
    {/*Agregamos un router a toda nuestra app de React que cuenta con una history.
        Con esto podemos persistir datos a lo largo de las diferentes rutas*/}
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app'),
);
