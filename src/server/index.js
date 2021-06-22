//El servidor ignora todos los llamados a clases de Css del lado del servidor
require('ignore-styles');

require('@babel/register')({
    presets: [
        //Babel preset-env para trabajar con EMS5+
        '@babel/preset-env',
        //Babel preset-react para trabajar con jsx y React
        '@babel/preset-react'
    ]
});

//Hook que se encarga de importar todas nuestras imágenes en tiempo real cuando sean requeridas mediante SSR
require('asset-require-hook')({
    extensions: ['png', 'jpg', 'gif'],
    name: '/assets/[hash].[ext]'
})

require('./server');