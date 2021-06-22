//Importando useState y useEffect
import { useState, useEffect } from 'react';

//Creando el hook personalizado
const useInitialState = (API) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => setVideos(data));
  }, []);

  return videos;
};

//Exportando hook
export default useInitialState;
