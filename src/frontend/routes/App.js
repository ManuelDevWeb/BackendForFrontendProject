//Importando React
import React from 'react';
//Importando React Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//Importando Home
import Home from '../containers/Home';
//Importando Login
import Login from '../containers/Login';
//Importando Register
import Register from '../containers/Register';
//Importando Player
import Player from '../containers/Player';
//Importando NotFound
import NotFound from '../containers/NotFound';
//Importando Layout
import Layout from '../components/Layout';

//Funcion
const App = () => (
  //Return explicito

  /*
        Las rutas se definen con el componente Route y deben estar encapsuladas en
        un BrowserRouter.

        path-> Para indicar la url
        exact-> Si queremos que funcione única y exactamente con la url que le digamos
        component-> Para indicarle el componente que va a renderizar

        Switch: Lo usamos para asegurar que nuestras rutas solamente se rendericen
        con la que  haga match con la url. Debemos encapsular las rutas dentro del
        componente
    */

  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/player/:id' component={Player} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

//Exportando funcion
export default App;
