import React, { useEffect, useState } from 'react';
import Titulo from '../Componentes/Titulo';
import Vehiculo from '../Componentes/componentes-vehiculos/Vehiculo';
import Container from "react-bootstrap/Container";
import FormModal from '../Componentes/componentes-vehiculos/FormModal';
import DeleteModal from '../Componentes/componentes-vehiculos/DeleteModal';
import FormRuta from '../Componentes/componentes-vehiculos/FormRuta';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlusCircle } from "react-icons/fa";

const Rutas = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showRuta, setShowRuta] = useState(false);
  const [datosEdit, setDatosEdit] = useState([]);
  const [clave, setClave] = useState("");
  const [accion, setAccion] = useState("");
  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    // Realizar la solicitud HTTP a la API
    fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/rutas/get_vehiculos')
      .then(response => response.json())
      .then(data => {
        if (data.resultado) {
          setVehiculos(data.vehiculos);
        }
      })
      .catch(error => {
        console.error('Error al obtener las rutas:', error);
      });
  }, [showForm, showDelete]);

  const Edit = ( clave, marca, modelo, placa, estado ) =>
  {
    setShowForm(true);
    setAccion("cambio");
    const datos = { clave, marca, modelo, placa, estado };
    setDatosEdit(datos);
    //console.log(datos);
  }

  const Delete = ( clave ) =>
  {
    setClave(clave);
    setShowDelete(true);
    //console.log(datos);
  }
  const New = ( ) =>
  {
    setShowForm(true);
    setAccion("alta");
    const marca="", modelo="", placa="", estado="";
    const datos = { marca, modelo, placa, estado };
    setDatosEdit(datos);
    //console.log(datos);
  }

  const Ruta = ( clave ) =>
  {
    setClave(clave);
    setShowRuta(true);
    setForceRender((prev) => !prev);
    //console.log(datos);
  }

  const Actualizar = e =>
  {
    e.preventDefault();
    //console.log(e.target[4].checked);
    if(e.target[1].value==='' || e.target[2].value==='' || e.target[3].value==='')
    {
      toast.error('Debes de llenar todos los datos');
      return;
    }
    const formUpdateVehiculo = new FormData();
        formUpdateVehiculo.append('clave', e.target[0].value);
        formUpdateVehiculo.append('marca', e.target[1].value);
        formUpdateVehiculo.append('modelo', e.target[2].value);
        formUpdateVehiculo.append('placa', e.target[3].value);
        formUpdateVehiculo.append('estado', e.target[4].checked ? "activo":"mantenimiento");
        //console.log(formUpdateVehiculo.get('clave'));
        fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/rutas/update_vehiculo',
        {
          method: 'POST',
          body: formUpdateVehiculo
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
    console.log(e.target[3].checked);
    console.log(e.target[4].checked);
    if(e.target[0].value==='' || e.target[1].value==='' || e.target[2].value==='' || (e.target[3].checked===false && e.target[4].checked===false))
    {
      toast.error('Debes de llenar todos los datos');
      return;
    }
    const formUpdateVehiculo = new FormData();
        formUpdateVehiculo.append('marca', e.target[0].value);
        formUpdateVehiculo.append('modelo', e.target[1].value);
        formUpdateVehiculo.append('placa', e.target[2].value);
        formUpdateVehiculo.append('estado', e.target[3].checked ? "activo":"mantenimiento");
        //console.log(formUpdateVehiculo.get('clave'));
        fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/rutas/insert_vehiculo',
        {
          method: 'POST',
          body: formUpdateVehiculo
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
  const Eliminar = (clave) =>
  {
    //console.log(clave);
    const formUpdateVehiculo = new FormData();
        formUpdateVehiculo.append('clave', clave);
        //console.log(formUpdateVehiculo.get('clave'));
        fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/rutas/delete_vehiculo',
        {
          method: 'POST',
          body: formUpdateVehiculo
        })
        .then(response => response.json())
        .then(data => 
          {
            //console.log(data.mensaje);
            setShowDelete(false);
            data.resultado ? toast.warning(data.mensaje):toast.error(data.mensaje);
          })
        .catch(error => console.log(error))

  }

  const Guardar = (claveRuta, claveVehiculo, actualizar) =>
  {
    //console.log(actualizar);
    //console.log(claveVehiculo);
    const formGuardar = new FormData();
    formGuardar.append('clave_vehiculo', claveVehiculo);
    formGuardar.append('clave_ruta', claveRuta);
    const url= actualizar? 'update_ruta_vehiculo' :'insert_ruta_vehiculo';
    //(actualizar);
    fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/rutas/' + url,
        {
        method: 'POST',
        body: formGuardar
      })
        .then(response => response.json())
        .then(data => {
            if (data.resultado)
            {   
              setShowRuta(false)
              data.resultado ? toast.success(data.mensaje):toast.error(data.mensaje);
            }else{
              console.log("no se pudo pa");
            }
        })
        .catch(error =>
            {
                console.error('Error al obtener la ruta del vehiculo:', error);
        });

  }

  const delete_ruta = (claveVehiculo) =>
  {
    const formEliminar = new FormData();
    formEliminar.append('clave_vehiculo', claveVehiculo);

    fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/rutas/delete_ruta_vehiculo',
        {
        method: 'POST',
        body: formEliminar
      })
        .then(response => response.json())
        .then(data => {
            if (data.resultado)
            {   
              setShowRuta(false)
              data.resultado ? toast.warning(data.mensaje):toast.error(data.mensaje);
            }else{
              console.log("no se pudo pa");
            }
        })
        .catch(error =>
            {
                console.error('Error al obtener la ruta del vehiculo:', error);
        });
  }

  const validacion = ()=>
  {
    toast.error('Debes seleccionar una ruta');
  }
  return (
    <Container>
        <Titulo
        text="Gestión de rutas"/>
      {vehiculos.map(vehiculo => (
        <Vehiculo
            key={vehiculo.clave}
            clave={vehiculo.clave}
            marca={vehiculo.marca}
            modelo={vehiculo.modelo}
            placa={vehiculo.placa}
            estado={vehiculo.Estado}
            onEdit={Edit}
            onDelete={Delete}
            onRuta={Ruta}
         />
         
      ))}
      {}<FormModal
            datos={datosEdit}
            accion={accion}
            onCancelar={() => setShowForm(false)}
            onActualizar={ Actualizar }
            onAgregar={ Agregar }
            show ={showForm}
            onHide={() => setShowForm(false)}
      />{}
      <FormRuta
            clave={clave}
            onCancelar={() => setShowRuta(false)}
            onGuardar={ Guardar }
            onDelete={delete_ruta}
            show ={showRuta}
            onHide={() => setShowRuta(false)}
            forceRender={forceRender}
            onValidacion={validacion}
      />
      <DeleteModal
            clave={clave}
            onCancelar={() => setShowDelete(false)}
            onEliminar={ Eliminar } 
            show ={showDelete}
            onHide={() => setShowDelete(false)}
      />
      <button onClick={New} className='btn-agregar'><FaPlusCircle size={20} />Agregar Vehiculo</button>
      <ToastContainer position="bottom-right" /> {/* Configuración de posición */}
    </Container>
  );
};

export default Rutas;