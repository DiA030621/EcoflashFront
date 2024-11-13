import React from 'react';
import '../../Estilos-vistas/Ruta.css';
import { AiOutlineDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { GrWaypoint } from "react-icons/gr";

const Vehiculo = ({ clave, marca, modelo, placa, estado, onEdit, onDelete, onRuta }) => {

  return (
      <div className='cont-principal'>
        <div className='cont-nombre'>Clave: {clave}</div>
        <div className='cont-clave'>Marca: {marca}</div>
        <div className='cont-nombre'>Modelo: {modelo}</div>
        <div className='cont-clave'>Placa: {placa}</div>
        <div className='cont-nombre'>Estado: {estado}</div>
        <button onClick={() => onEdit(clave, marca, modelo, placa, estado)} className='btn-editar'><MdEdit size={20} /></button>
        <button  onClick={() => onDelete(clave)} className='btn-borrar'><AiOutlineDelete size={20} /></button>
        <button  onClick={() => onRuta(clave)} className='btn-editar'><GrWaypoint size={20} /></button>
      </div>
  );
};

export default Vehiculo;