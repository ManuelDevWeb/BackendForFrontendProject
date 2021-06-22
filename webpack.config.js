/* eslint-disable eol-last */
/* eslint-disable indent */
/*
    Aca almacenamos toda la configuracion que necesitaremos para nuestro proyecto
*/

const path = require('path');
//Añadir el recurso de CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//Añadir el recurso de webpack
const webpack = require('webpack');
//Importando dotenv para variables de entorno
const dotenv = require('dotenv');
//Importando webpack compression
const CompressionWebpackPlugin = require('compression-webpack-plugin');
//Importando terser webpack
const TerserPlugin = require('terser-webpack-plugin');
//Importando Manifest Plugin
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
//Importando Clean Webpack
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

dotenv.config();

//Validando si estamos en modo desarrollo
const isDev = (process.env.ENV === 'development');
//Punto de entrada de nuestra aplicación
const entry = ['./src/frontend/index.js'];

//Si estamos en desarrollo agregamos el entry al array
if (isDev) {
    //Este entry permite que la app se refresque en tiempo real
    entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true');
}

//Modulo de un objeto con la configuracion deseada
module.exports = {
    //Punto de entrada de nuestra aplicación
    entry,
    mode: process.env.ENV,
    //Punto de salida
    output: {
        //Permite saber en que directorio esta nuestro proyecto
        path: path.resolve(__dirname, 'src/server/public'),
        //Nombre del resultante de JS
        filename: isDev ? 'assets/app.js' : 'assets/app-[hash].js',
        //Apartir de alli se encontraran los elementos
        publicPath: '/',
    },
    resolve: {
        //Extensiones que vamos a utilizar
        extensions: ['.js', '.jsx'],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        //Conf archivos vendors
        splitChunks: {
            chunks: 'async',
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    chunks: 'all',
                    reuseExistingChunk: true,
                    priority: 1,
                    filename: isDev ? 'assets/vendor.js' : 'assets/vendor-[contentHash].js',
                    enforce: true,
                    //Funcion que nos devuelva los chunks que queremos
                    test(module, chunks) {
                        //Nombre del modulo en el que estamos
                        const name = module.nameForConfition && module.nameForConfition();
                        //Validando que sea diferente de vendors y este dentro de node_modules
                        return (chunk) => chunk.name !== 'vendors' && /[\\/]node_modules[\\/]/.test(name);

                    },
                },
            },
        },
    },
    module: {
        //Reglas que establecemos para trabajar con diferentes tipos de archivos
        rules: [{
                enforce: 'pre',
                //Test para saber que tipo de extensiones vamos a utilizar
                //Utiliza archivos con extension js y jsx
                test: /\.(js|jsx)$/,
                //Excluir elementos de node_modules
                exclude: /node_modules/,
                //Pasar internamente el loader que utilizaremos
                loader: 'eslint-loader',
            },
            {
                //Test para saber que tipo de extensiones vamos a utilizar
                //Utiliza archivos con extension js y jsx
                test: /\.(js|jsx)$/,
                //Excluir elementos de node_modules
                exclude: /node_modules/,
                //Pasar internamente el loader que utilizaremos (babel)
                use: {
                    loader: 'babel-loader',
                },
            }, {
                //Test para saber que tipo de extensiones vamos a utilizar
                //Utiliza archivos con extensiones css o sass
                test: /\.(s*)css$/,
                //Pasar internamente el loader que utilizaremos para css y sass
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader',
                ],
            }, {
                //Test para saber que tipo de extensiones vamos a utilizar
                //Utiliza archivos con extensiones png gif o jpg
                test: /\.(png|gif|jpg)$/,
                //Pasar internamente el loader que utilizaremos
                use: [{
                    loader: 'file-loader',
                    //Configuraciones
                    options: {
                        //Nombre del archivo de salida
                        name: 'assets/[hash].[ext]',
                    },
                }],
            },
        ],
    },
    //Configuracion devserver y para poder trabajar con rutas
    devServer: {
        //Manejo de historia del navegador
        historyApiFallback: true,
    },
    plugins: [
        //Si estamos en modo desarrollo ejecuta el plugin
        isDev ?
        //Instanciando plugin de webpack (Refrescado en caliente de nuestra app)
        new webpack.HotModuleReplacementPlugin() :
        () => {},

        //Si estamos en modo desarrollo, no necesitamos comprimir nuestros assets
        isDev ?
        () => {} :
        //Caso contrario comprime nuestros assets
        new CompressionWebpackPlugin({
            //Test para saber que tipo de extensiones vamos a utilizar
            //Utiliza archivos con extensiones .js y .css
            test: /\.js$|\.css$/,
            //Nombre del archivo resultante
            filename: '[path][base].gz',
        }),

        //Si estamos en modo produccion, limpia la carpeta public cada que se haga un build
        isDev ?
        () => {} :
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: path.resolve(__dirname, 'src/server/public'),
        }),

        //Si no estamos en modo desarrollo, inicializamos el plugin
        isDev ?
        () => {} :
        //Nos crea un archivo manifest.json, donde podemos ver el archivo original sin el hash
        new WebpackManifestPlugin(),

        //Instanciando el plugin de CSS
        new MiniCssExtractPlugin({
            //Nombre archivo salida de CSS
            filename: isDev ? 'assets/app.css' : 'assets/app-[hash].css',
        }),
    ],
};