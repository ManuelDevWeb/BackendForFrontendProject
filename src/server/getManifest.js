//Archivo que lee el archivo Manifest.js

import fs from 'fs';

const getManifest = () => {
    try {
        //El método JSON.parse() analiza una cadena de texto como JSON, transformando opcionalmente  el valor producido por el análisis.
        return JSON.parse(fs.readFileSync(`${__dirname}/public/manifest.json`));
    } catch (error) {
        console.log(err);
    }
}

export default getManifest;