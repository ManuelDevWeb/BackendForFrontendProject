/* eslint-disable import/order */
//Importando express
import express from 'express';
//Importando archivo config
import config from './config';
//Importando webpack
// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack';
import React from 'react';
//Importando helmet
import helmet from 'helmet';
import { renderToString } from 'react-dom/server';
//Importando Provider para encapsular componentes y poder extraer los estados de alli
import { Provider } from 'react-redux';
//Importando createStore para tener la lógica que nos ayuda a tener un store
import { createStore, compose } from 'redux';
//Importando render routes (Recibe un array de rutas)
import {renderRoutes} from 'react-router-config';
//Importando las rutas del servidor
import routes from '../frontend/routes/serverRoutes';
//Importando router
import { StaticRouter } from 'react-router-dom';
//Importando el initialState
import initialState from '../frontend/initialState';
//Importando getManifest
import getManifest from '../server/getManifest';
//Importando reducer
import reducer from '../frontend/reducers';


const { env, port } = config;

//Creando web app
const app = express();

//Validando que estamos en entorno desarrollo
if (env === 'development') {
  console.log('Development config');
  //Configuración de webpack que estamos usando
  const webpackConfig = require('../../webpack.config');

  //Dependencias que instalamos
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  //Compiler para compilar la configuración de webpack
  const compiler = webpack(webpackConfig);
  //Configuración de webpack para el server
  const serverConfig = { port: port, hot: true };

  //Pasamos el compilador y la configuracion a nuestra app de express y pueda refrescarse en tiempo real
  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
}else{
  //En caso de estar en modo producción

  //Middleware que lee nuestro archivo y lo envia a la sección de request
  app.use((req,res,next)=>{
    //Si no tenemos nada toma el getManifest()
    if(!req.hashManifest){
      req.hashManifest = getManifest();
    }
    next();
  });
  //Carpeta donde se guardaran todos los archivos que generemos
  app.use(express.static(`${__dirname}/public`));
  //Indicando a la app que use helmet
  app.use(helmet.dnsPrefetchControl()); app.use(helmet.expectCt()); app.use(helmet.frameguard()); app.use(helmet.hidePoweredBy()); app.use(helmet.hsts()); app.use(helmet.ieNoOpen()); app.use(helmet.noSniff()); app.use(helmet.permittedCrossDomainPolicies()); app.use(helmet.referrerPolicy()); app.use(helmet.xssFilter());
  //Aplicaremos X-Permitted-Cross-Domain-Policies el cual bloquea adoble flash y adobe acrobat
  app.use(helmet.permittedCrossDomainPolicies());
  //Bloqueando la cabecera x-powered-by (Para que el navegador no sepa desde donde nos estamos conectando y evitar ataques dirigidos)
  app.disable('x-powered-by');
}

//Función que imprime el html que convertimos a string
const setResponse = (html, preloadedState, manifest)=>{
  //Si logra leer el archivo, hace un manifest y nos muestra la ruta con hash
  const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';
  const vendoStyles = manifest ? manifest['vendors.css'] : 'assets/vendor.css';

  //Llamando los archivos app.css y app.js (Los creados a partir del webpack, como archivos resultantes)
  //Insertamos el html en medio del div de la app
  return (
    `<!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="${mainStyles}" type="text/css">
            <link rel="stylesheet" href="${vendoStyles}" type="text/css">
            <title>Platzi Video</title>
        </head>
        <body>
            <div id="app">${html}</div>
            <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
            <script src="${mainBuild}" type="text/javascript"></script>
            <script src="${vendorBuild}" type="text/javascript"></script>
        </body>
        </html>
    `);
}

//Función que nos ayuda a poder renderizar la aplicación
const renderApp = (req, res) => {
  //Creando el store
  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();

  const html = renderToString(
    /*
            Redux necesitan hacer accesibles los datos de almacenamiento a todo el árbol de componente React desde 
            el componente raíz. El patrón Provider permite a la librería pasar datos de arriba a abajo
        */
    //Con el store que enviamos el provider conectamos toda nuestra aplicacion para que pueda tener el encapsulado con la data inicial
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>
  );

  //Retornamos el html
  res.send(setResponse(html, preloadedState, req.hashManifest));
}

//Creando una ruta get(/ solo llama index), (* captura todas las rutas)
app.get('*', renderApp);

//Puerto que escucha el servidor
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log(`Server running on http://localhost:${port}`);
  }
})