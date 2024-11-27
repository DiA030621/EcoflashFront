import React, { useEffect, useState} from "react";
import Map_parada from "../Componentes/componentes-paradas/Map_parada";
import Titulo from "../Componentes/Titulo";

const Contenedor = ({ userType }) => {

  return (
    <>
    <Titulo 
    text='Gestion de contenedores'/>
    <Map_parada userType={userType}/>
    </>
  );
}

export default Contenedor;