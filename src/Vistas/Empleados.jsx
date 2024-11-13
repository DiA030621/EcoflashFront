import React, { useEffect, useState } from 'react';
import Titulo from '../Componentes/Titulo';
import Empleado from '../Componentes/componentes-empleados/Empleado';
import Container from "react-bootstrap/Container";
import FormModalEmp from '../Componentes/componentes-empleados/FormModalEmp';
import DeleteModalEmp from '../Componentes/componentes-empleados/DeleteModalEmp';
import FormVehiChof from '../Componentes/componentes-empleados/FormVehiChof';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlusCircle } from "react-icons/fa";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteEmp, setShowDeleteEmp] = useState(false);
  const [showRuta, setShowRuta] = useState(false);
  const [datosEdit, setDatosEdit] = useState([]);
  const [clave, setClave] = useState("");
  const [accion, setAccion] = useState("");
  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    // Realizar la solicitud HTTP a la API
    fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/empleados/get_empleados')
      .then(response => response.json())
      .then(data => {
        if (data.resultado) {
          setEmpleados(data.empleados);
          //console.log(data.empleados);
        }
      })
      .catch(error => {
        console.error('Error al obtener las rutas:', error);
      });
  }, [showForm, showDeleteEmp]);

  const Edit = ( clave, nombre, ap, am ) =>
  {
    setShowForm(true);
    setAccion("cambio");
    const datos = { clave, nombre, ap, am  };
    setDatosEdit(datos);
    //console.log(datos);
  }

  const Delete = ( clave ) =>
  {
    setClave(clave);
    setShowDeleteEmp(true);
    //console.log(datos);
  }
  const New = ( ) =>
  {
    setShowForm(true);
    setAccion("alta");
    const nombre="", ap="", am="";
    const datos = {nombre, ap, am };
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
    //console.log(e.target[3].value);
    if(e.target[1].value==='' || e.target[2].value==='' || e.target[3].value==='')
    {
      toast.error('Debes de llenar todos los datos');
      return;
    }
    const formUpdateEmpleado = new FormData();
        formUpdateEmpleado.append('clave', e.target[0].value);
        formUpdateEmpleado.append('nombre', e.target[1].value);
        formUpdateEmpleado.append('ap', e.target[2].value);
        formUpdateEmpleado.append('am', e.target[3].value);
        //console.log(formUpdateVehiculo.get('clave'));
        fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/empleados/update_empleado',
        {
          method: 'POST',
          body: formUpdateEmpleado
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
    if(e.target[0].value==='' || e.target[1].value==='' || e.target[2].value==='' )
    {
      toast.error('Debes de llenar todos los datos');
      return;
    }
    const formAgregarEmp = new FormData();
        formAgregarEmp.append('nombre', e.target[0].value);
        formAgregarEmp.append('ap', e.target[1].value);
        formAgregarEmp.append('am', e.target[2].value);
        //console.log(formUpdateVehiculo.get('clave'));
        fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/empleados/insert_empleado',
        {
          method: 'POST',
          body: formAgregarEmp
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
    const formDeleteEmp = new FormData();
        formDeleteEmp.append('clave', clave);
        //console.log(formUpdateVehiculo.get('clave'));
        fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/empleados/delete_empleado',
        {
          method: 'POST',
          body: formDeleteEmp
        })
        .then(response => response.json())
        .then(data => 
          {
            //console.log(data.mensaje);
            setShowDeleteEmp(false);
            data.resultado ? toast.warning(data.mensaje):toast.error(data.mensaje);
          })
        .catch(error => console.log(error))

  }

  const Guardar = (claveVehiculo, claveChofer, actualizar) =>
  {
    //console.log(actualizar);
    //console.log(claveVehiculo);
    const formGuardar = new FormData();
    formGuardar.append('clave_vehiculo', claveVehiculo);
    formGuardar.append('clave_chofer', claveChofer);
    /*console.log('clave vehiculo' + claveVehiculo);
    console.log('clave chofer' + claveChofer);
    
    console.log(url);*/
    //(actualizar);
    const url= actualizar? 'update_chofer_vehiculo' :'insert_chofer_vehiculo';
    fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/empleados/' + url,
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

  const delete_ruta = (clave) =>
  {
    const formEliminar = new FormData();
    formEliminar.append('clave_chofer', clave);

    fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/empleados/delete_chofer_vehiculo',
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
    toast.error('Debes seleccionar un vehiculo');
  }
  return (
    <Container>
        <Titulo
        text="Gestión de rutas"/>
      {empleados.map(empleado => (
        <Empleado
            key={empleado.clave}
            clave={empleado.clave}
            nombre={empleado.nombre}
            ap={empleado.ap}
            am={empleado.am}
            onEdit={Edit}
            onDelete={Delete}
            onRuta={Ruta}
         />
         
      ))}
      {}<FormModalEmp
            datos={datosEdit}
            accion={accion}
            onCancelar={() => setShowForm(false)}
            onActualizar={ Actualizar }
            onAgregar={ Agregar }
            show ={showForm}
            onHide={() => setShowForm(false)}
      />{}
      <FormVehiChof
            clave={clave}
            onCancelar={() => setShowRuta(false)}
            onGuardar={ Guardar }
            onDelete={delete_ruta}
            show ={showRuta}
            onHide={() => setShowRuta(false)}
            forceRender={forceRender}
            onValidacion={validacion}
      />
      <DeleteModalEmp
            clave={clave}
            onCancelar={() => setShowDeleteEmp(false)}
            onEliminar={ Eliminar } 
            show ={showDeleteEmp}
            onHide={() => setShowDeleteEmp(false)}
      />
      <button onClick={New} className='btn-agregar'><FaPlusCircle size={20} />Agregar Empleado</button>
      <ToastContainer position="bottom-right" /> {/* Configuración de posición */}
    </Container>
  );
};

export default Empleados;