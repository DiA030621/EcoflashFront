import React, { useEffect, useState} from "react";
import Map_parada from "../Componentes/componentes-paradas/Map_parada";
import Titulo from "../Componentes/Titulo";

function Paradas() {

  return (
    <>
    <Titulo 
    text='Gestion de paradas'/>
    <Map_parada/>
    </>
  );
}

export default Paradas;