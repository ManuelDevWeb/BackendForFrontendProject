//Importando passport para implementar estrategias de autenticación
const passport = require('passport');
//Importando BasicStrategy
const { BasicStrategy } = require('passport-http');
//Importando para el manejo de errores
const boom = require('@hapi/boom');
//Importando axios para hacer request a otros servidores (En este caso al API server)
const axios = require('axios');
//Importando configuracion
const { config } = require('../../../config/index');

//Definiendo nueva estrategia
passport.use(
    new BasicStrategy(async(email, password, cb) => {

        try {
            //Obtener la data y el status de mi petición
            const { data, status } = await axios({
                //Haciendo request a nuestro sign in de la api
                url: `${config.apiUrl}/api/auth/sign-in`,
                method: "post",
                auth: {
                    password,
                    username: email
                },
                data: {
                    apiKeyToken: config.apiKeyToken
                }
            });

            //Validando que haya informacion y el status sea correcto
            if (!data || status !== 200) {
                return cb(boom.unauthorized(), false);
            }

            //Retornamos la respuesta: el token y la información del usuario
            return cb(null, data);
        } catch (error) {
            cb(err);
        }
    })
)