/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */
//Funcion para iniciar el reducer
const reducer = (state, action) => {
  //Switch que nos permite recibir el type y evaluarlo dentro de un caso para saber que se hara
  switch (action.type) {
    case 'SET_FAVORITE':
      //Seleccionando item que tiene mismo id al que ya esta agregado en la lista de favoritos
      const exist = state.mylist.find((item) => item.id === action.payload.id);
      if (!exist) {
        return {
          //Traemos el state que ya tenemos
          ...state,
          //Traemos los elementos de mylist y le agregamos el elemento nuevo
          mylist: [...state.mylist, action.payload],
        };
      }
      alert('El elemento ya esta agregado, intenta con otro!');

    case 'DELETE_FAVORITE':
      return {
        //Traemos el state que ya tenemos
        ...state,
        //Elementos que vamos a actualizar, nuevo arreglo de los elementos con id diferente al solicitado
        mylist: state.mylist.filter((items) => items.id !== action.payload),
      };
    case 'LOGIN_REQUEST':
      return {
        //Traemos el state que ya tenemos
        ...state,
        //A user le enviamos la informacion que estamos manejando desde el action
        user: action.payload,
      };
    case 'LOGOUT_REQUEST':
      return {
        //Traemos el state que ya tenemos
        ...state,
        //A user le enviamos la información que estamos manejando desde el action, en este caso un objeto vacio
        user: action.payload,
      };
    case 'REGISTER_REQUEST':
      return {
        //Traemos el state que ya tenemos
        ...state,
        //A user le enviamos la información que estamos manejando desde el action
        user: action.payload,
      };
    case 'GET_VIDEO_SOURCE':
      return {
        //Traemos el state que ya tenemos
        ...state,
        //A playing le enviamos la informacion del src del video a traves de esta busqueda
        playing:
          state.trends.find((item) => item.id === Number(action.payload)) ||
          state.originals.find((item) => item.id === Number(action.payload)) ||
          [],
      };
    case 'GET_VIDEO_SEARCH':
      //Validando que haya informacion en el search
      if (action.payload === '') {
        return {
          //Traemos el state que ya tenemos
          ...state,
          searchResult: [],
        };
      }

      //Traemos la informacion del state de los trends y los originals
      const listas = [...state.trends, ...state.originals];

      return {
        //Traemos el state que ya tenemos
        ...state,
        //Guardamos en searchResult el listado de los titulos que coincidan con el de la busqueda
        searchResult: listas.filter((item) => item.title.toLowerCase().includes(action.payload.toLowerCase())),
      };
    default:
      return state;
  }
};

//Exportando funcion
// eslint-disable-next-line eol-last
export default reducer;