import Ruta from '../Componentes/componentes-ruta/Ruta';
import React, { useEffect, useState } from 'react';
import Titulo from '../Componentes/Titulo';
import { GoGraph } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const Rutas = () => {
  const [rutas, setRutas] = useState([]);
  const navigate = useNavigate();

  const handle = () => {
    navigate('/actividades' );
  };

  useEffect(() => {
    // Realizar la solicitud HTTP a la API
    fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/rutas/get_rutas')
      .then(response => response.json())
      .then(data => {
        if (data.resultado) {
          setRutas(data.rutas);
        }
      })
      .catch(error => {
        console.error('Error al obtener las rutas:', error);
      });
  }, []);

  return (
    <div>
      <div>
        <Titulo
        text="Gestión de rutas"/>
      {rutas.map(ruta => (
        <Ruta key={ruta.clave} clave={ruta.clave} nombre={ruta.nombre} />
      ))}
    </div>
    <button onClick={handle} className='btn-agregar'><GoGraph size={20} />Actividad</button>
    </div>
  );
};

export default Rutas;