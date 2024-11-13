import React from 'react';
import '../../Estilos-vistas/Ruta.css';
import { AiOutlineDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { AiFillCar } from "react-icons/ai";

const Empleado = ({ clave, nombre, ap, am, onEdit, onDelete, onRuta }) => {

  return (
      <div className='cont-principal'>
        <div className='cont-clave'>Clave: {clave}</div>
        <div className='cont-nombre'>Nombre: {nombre + ' ' + ap + ' ' + am}</div>
        <button onClick={() => onEdit(clave, nombre, ap, am)} className='btn-editar'><MdEdit size={20} /></button>
        <button  onClick={() => onDelete(clave)} className='btn-borrar'><AiOutlineDelete size={20} /></button>
        <button  onClick={() => onRuta(clave)} className='btn-editar'><AiFillCar size={20} /></button>
      </div>
  );
};

export default Empleado;