import React from "react";
import Titulo from '../Componentes/Titulo';
import { useLocation } from 'react-router-dom';
import Map from "../Componentes/componentes-ruta/Mapa-ruta";

const Rutas_paradas = () => {
    
    const location = useLocation();
  const clave = location.state?.clave;
  const nombre = location.state?.nombre;
  
    return (
      <div>
          <Titulo
          text={'Gestion de ruta '}/>
          <Map
          clave_ruta={clave}/>

      </div>
    );
  };
  
  export default Rutas_paradas;