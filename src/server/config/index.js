//Importando dotenv
import dotenv from 'dotenv';

//Buscando en todo el entorno el archivo .env y tomando variables
dotenv.config();

const { ENV, PORT } = process.env;

export default {
    env: ENV,
    port: PORT,
}