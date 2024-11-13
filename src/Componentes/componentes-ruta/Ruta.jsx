import React from 'react';
import '../../Estilos-vistas/Ruta.css';
import { AiOutlineDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Ruta = ({ clave, nombre }) => {

    const navigate = useNavigate();

  const handleEditar = () => {
    navigate('/rutas/paradas', { state: { clave } });
  };

  const handleBorrar = () => {
    // Lógica para borrar la ruta
  };

  return (
    <div className='cont-principal'>
      <div className='cont-clave'>Clave: {clave}</div>
      <div className='cont-nombre'>Nombre: {nombre}</div>
      <button onClick={handleEditar} className='btn-editar'><MdEdit size={20} /></button>
      <button onClick={handleBorrar} className='btn-borrar'><AiOutlineDelete size={20} /></button>
    </div>
  );
};

export default Ruta;