//Importando md5
import md5 from 'md5';

//Funcion de gravatar
const gravatar = (email) => {
  const base = 'http://gravatar.com/avatar/';
  //Formatear correo electronico
  const formattedEmail = (email).trim().toLowerCase();
  //Cambiando a nueva serie de caracteres aleatorios con longitud fija
  const hash = md5(formattedEmail, { encoding: 'binary' });
  return `${base}${hash}`;
};

//Exportando gravatar
export default gravatar;
