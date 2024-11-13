import React, { useEffect, useState } from 'react';
import Titulo from '../Componentes/Titulo';
import Usuario from '../Componentes/componentes-usuarios/Usuario';
import Container from "react-bootstrap/Container";
import FormModalUsu from "../Componentes/componentes-usuarios/FormModalUsu";
import DeleteModalUsu from '../Componentes/componentes-usuarios/DeleteModalUsu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlusCircle } from "react-icons/fa";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteUsu, setShowDeleteUsu] = useState(false);
  const [showRuta, setShowRuta] = useState(false);
  const [datosEdit, setDatosEdit] = useState([]);
  const [clave, setClave] = useState("");
  const [accion, setAccion] = useState("");

  useEffect(() => {
    // Realizar la solicitud HTTP a la API
    fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/usuarios/get_usuarios')
      .then(response => response.json())
      .then(data => {
        if (data.resultado) {
          setUsuarios(data.usuarios);
        }
      })
      .catch(error => {
        console.error('Error al obtener las rutas:', error);
      });
  }, [showForm, showDeleteUsu]);

  const Edit = ( clave, nombre, ap, am, correo, contra, saldo ) =>
  {
    setShowForm(true);
    setAccion("cambio");
    const datos = { clave, nombre, ap, am, correo, contra, saldo  };
    setDatosEdit(datos);
    //console.log(datos);
  }

  const Delete = ( clave ) =>
  {
    setClave(clave);
    setShowDeleteUsu(true);
    //console.log(datos);
  }
  const New = ( ) =>
  {
    setShowForm(true);
    setAccion("alta");
    const nombre="", ap="", am="", correo="", contra="";
    const datos = {nombre, ap, am, correo, contra };
    setDatosEdit(datos);
    //console.log(datos);
  }

  const Actualizar = e =>
  {
    e.preventDefault();
    //console.log(e.target[3].value);
    if(e.target[1].value==='' || e.target[2].value==='' || e.target[3].value==='' || e.target[4].value==='' || e.target[5].value==='' || e.target[6].value==='')
    {
      toast.error('Debes de llenar todos los datos');
      console.log(e.target[3].value==='')
      return;
    }
    const formUpdateUsu = new FormData();
        formUpdateUsu.append('clave', e.target[0].value);
        formUpdateUsu.append('nombre', e.target[1].value);
        formUpdateUsu.append('ap', e.target[2].value);
        formUpdateUsu.append('am', e.target[3].value);
        formUpdateUsu.append('correo', e.target[4].value);
        formUpdateUsu.append('contra', e.target[5].value);
        formUpdateUsu.append('tipo', 'Clien');
        formUpdateUsu.append('saldo', e.target[6].value);
        //console.log(formUpdateVehiculo.get('clave'));
        fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/usuarios/update_usuario',
        {
          method: 'POST',
          body: formUpdateUsu
        })
        .then(response => response.json())
        .then(data => 
          {
            //console.log(data.mensaje);
            setShowForm(false);
            data.resultado ? toast.success(data.mensaje):toast.error(data.mensaje);
          })
        .catch(error => console.log(error))

  }
  const Agregar = e =>
  {
    e.preventDefault();
    //console.log(e);
    /*console.log(e.target[3].checked);
    console.log(e.target[4].checked);*/
    if(e.target[0].value==='' || e.target[1].value==='' || e.target[2].value==='' || e.target[3].value==='' || e.target[4].value==='' || e.target[5].value==='' )
    {
      toast.error('Debes de llenar todos los datos');
      return;
    }
    console.log(e.target[5].value);
    
    
    const formAgregarUsu = new FormData();
        formAgregarUsu.append('nombre', e.target[0].value);
        formAgregarUsu.append('ap', e.target[1].value);
        formAgregarUsu.append('am', e.target[2].value);
        formAgregarUsu.append('correo', e.target[3].value);
        formAgregarUsu.append('contra', e.target[4].value);
        console.log(formAgregarUsu.saldo);
        //console.log(formUpdateVehiculo.get('clave'));
        
        fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/usuarios/insert_usuario',
        {
          method: 'POST',
          body: formAgregarUsu
        })
        .then(response => response.json())
        .then(data => 
          {
            console.log(data.mensaje);
            setShowForm(false);
            data.resultado ? toast.success(data.mensaje):toast.error(data.mensaje);
          })
        .catch(error => console.log(error))

  }
  const Eliminar = (clave) =>
  {
    //console.log(clave);
    const formDeleteUsu = new FormData();
        formDeleteUsu.append('clave', clave);
        //console.log(formUpdateVehiculo.get('clave'));
        fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/usuarios/delete_usuario',
        {
          method: 'POST',
          body: formDeleteUsu
        })
        .then(response => response.json())
        .then(data => 
          {
            //console.log(data.mensaje);
            setShowDeleteUsu(false);
            data.resultado ? toast.warning(data.mensaje):toast.error(data.mensaje);
          })
        .catch(error => console.log(error))

  }

  return (
    <Container>
        <Titulo
        text="Gestión de rutas"/>
      {usuarios.map(usuario => (
        <Usuario
            key={usuario.clave}
            clave={usuario.clave}
            nombre={usuario.nombre}
            ap={usuario.ap}
            am={usuario.am}
            correo={usuario.correo}
            contra={usuario.contra}
            saldo={usuario.saldo}
            onEdit={Edit}
            onDelete={Delete}
         />
         
      ))}
      {}<FormModalUsu
            datos={datosEdit}
            accion={accion}
            onCancelar={() => setShowForm(false)}
            onActualizar={ Actualizar }
            onAgregar={ Agregar }
            show ={showForm}
            onHide={() => setShowForm(false)}
      />{}
      <DeleteModalUsu
            clave={clave}
            onCancelar={() => setShowDeleteUsu(false)}
            onEliminar={ Eliminar } 
            show ={showDeleteUsu}
            onHide={() => setShowDeleteUsu(false)}
      />
      <button onClick={New} className='btn-agregar'><FaPlusCircle size={20} />Agregar Usuario</button>
      <ToastContainer position="bottom-right" /> {/* Configuración de posición */}
    </Container>
  );
};

export default Usuarios;