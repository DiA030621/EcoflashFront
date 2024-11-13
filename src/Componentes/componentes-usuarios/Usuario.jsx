import React from 'react';
import '../../Estilos-vistas/Ruta.css';
import { AiOutlineDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

const Usuarios = ({ clave, nombre, ap, am, correo, contra, saldo, onEdit, onDelete }) => {

  return (
      <div className='cont-principal'>
        <div className='cont-clave'>Clave: {clave}</div>
        <div className='cont-nombre'>Nombre: {nombre + ' ' + ap + ' ' + am}</div>
        <div className='cont-clave'>Coreo: {correo}</div>
        <div className='cont-nombre'>Contra: {contra}</div>
        <div className='cont-clave'>Saldo: {saldo}</div>
        <button onClick={() => onEdit(clave, nombre, ap, am, correo, contra, saldo)} className='btn-editar'><MdEdit size={20} /></button>
        <button  onClick={() => onDelete(clave)} className='btn-borrar'><AiOutlineDelete size={20} /></button>
      </div>
  );
};

export default Usuarios;