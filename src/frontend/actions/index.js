//Funciones que describe lo que vamos a hacer

//Agregar a favoritos
export const setFavorite = (payload) => ({
  //Indicando la acción que se va a ejecutar
  type: 'SET_FAVORITE',
  //Información que estamos mandando al reducer
  payload,
});

//Eliminar de favoritos
export const deleteFavorite = (payload) => ({
  //Indicando la acción que se va a ejecutar
  type: 'DELETE_FAVORITE',
  //Información que estamos mandando al reducer
  payload,
});

//Manejar la información del login
export const loginRequest = (payload) => ({
  //Indicando la acción que se va a ejecutar
  type: 'LOGIN_REQUEST',
  //Información que estamos mandando al reducer
  payload,
});

//Cerrar Sesión
export const logoutRequest = (payload) => ({
  //Indicando la acción que se va a ejecutar
  type: 'LOGOUT_REQUEST',
  //Información que estamos mandando al reducer
  payload,
});

//Manejar la información del register
export const registerRequest = (payload) => ({
  //Indicando la acción que se va a ejecutar
  type: 'REGISTER_REQUEST',
  //Información que estamos mandando al reducer
  payload,
});

//Obtener el src del video
export const getVideoSource = (payload) => ({
  //Indicando la acción que se va a ejecutar
  type: 'GET_VIDEO_SOURCE',
  //Información que estamos mandando al reducer
  payload,
});

//Obtener la informacion del buscador
export const getVideoSearch = (payload) => ({
  //Indicando la acción que se va a ejecutar
  type: 'GET_VIDEO_SEARCH',
  //Información que estamos mandando al reducer
  payload,
});
