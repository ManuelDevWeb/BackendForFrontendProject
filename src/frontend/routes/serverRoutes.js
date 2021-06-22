//Archivo con las rutas del lado del servidor

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

//Arreglo de rutas
const routes = [
  //Cada ruta recibe el path, el componente y el exact
  {
    exact: true,
    path: '/',
    component: Home,
  },
  {
    exact: true,
    path: '/login',
    component: Login,
  },
  {
    exact: true,
    path: '/register',
    component: Register,
  },
  {
    exact: true,
    path: '/player/:id',
    component: Player,
  },
  {
    name: 'NotFound',
    component: NotFound,
  },
];

//Exportando el arreglo de rutas
export default routes;
