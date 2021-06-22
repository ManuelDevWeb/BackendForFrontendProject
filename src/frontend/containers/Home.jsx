/* eslint-disable react/jsx-props-no-spreading */
//Importando React y Hooks necesarios
import React, { Fragment } from 'react';
//Importando Conenct, que nos ayuda a conectar nuestra aplicación
import { connect } from 'react-redux';
//Importando Header
import Header from '../components/Header';
//Importando componentes creados
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
//Importando estilos
import '../assets/styles/App.scss';

const Home = ({ mylist, trends, originals, searchResult }) => {
  return (
    <>
      <Header />
      <Search isHome />

      {
        //Validando que existan elementos en searchResult para mostrarlos
        Object.keys(searchResult).length > 0 ?
          (
            <Categories title='Resultados de la busqueda...'>
              <Carousel>
                {searchResult.map((item) => (
                  <CarouselItem
                    key={item.id}
                    {...item}
                  />
                ))}
              </Carousel>
            </Categories>
          ) :
          null
      }

      {mylist.length > 0 && (
        <Categories title='Mi Lista'>
          <Carousel>
            {mylist.map((item) => (
              <CarouselItem
                key={item.id}
                {...item}
                isList={true}
              />
            ))}
          </Carousel>
        </Categories>
      )}
      <Categories title='Tendencias'>
        <Carousel>
          {trends.map((item) => <CarouselItem key={item.id} {...item} />)}
        </Carousel>
      </Categories>
      <Categories title='Originales de Platzi Video'>
        <Carousel>
          {originals.map((item) => <CarouselItem key={item.id} {...item} />)}
        </Carousel>
      </Categories>
    </>
  );
};

//Funcion que nos permite extraer los elementos del state
const mapStateToProps = (state) => {
  return {
    //Extraemos solo los elementos que vamos a trabajar dentro del componente
    mylist: state.mylist,
    trends: state.trends,
    originals: state.originals,
    searchResult: state.searchResult,
  };
};

//Exportando componente
//Enviamos el mapeo de los props y los elementos que vamos a disparar o utilizar por medio de los actions
export default connect(mapStateToProps, null)(Home);
