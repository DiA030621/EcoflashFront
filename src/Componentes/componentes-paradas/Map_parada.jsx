import React, { useEffect, useState} from "react";
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import camion from '../../parada.png';
import '../../Estilos-vistas/parada.css';
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Map_parada() {
    
    //hook que define las coordenadas de las paradas
    const [clave, setClave]  = useState('');
    const [nombre, setNombre] = useState('');
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [parada, setParada] = useState([]);
    const [coordenadas, setCoordenadas] = useState([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [mensaje, setMensaje] = useState(false);
    const [eliminarForm, setEliminarForm] = useState(false);
    const [mensajeEliminado, setMensajeEliminado] = useState(false);

    useEffect(() => {
        // Llamada a la primera API para obtener las paradas
        fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/rutas/get_paradas',{
            method: 'GET'
        })
      .then(response => response.json())
      .then(data => {
        //console.log(data.paradas);
        setParada(data.paradas);
      })
      .catch(error => console.log(error));

    }, [mensaje, mensajeEliminado]);

    //funcion que muestra el formulario de una nueva parada cada que se da clic en el mapa
    const NewStop = (event) =>
    {        
      setEliminarForm(false);
        if (event.detail && event.detail.latLng) {
            // Obtén la latitud y longitud del evento de clic
            const lat = event.detail.latLng.lat;
            const lng = event.detail.latLng.lng;
            setMostrarForm(true);
            setCoordenadas({lat, lng});
          } else {
            console.error("error");
          }
    }

    const HandleSubmit = (event) =>
    {
      event.preventDefault();
      
      const nombreFormulario = event.target[0].value;
      const latFormulario = event.target[1].value;
      const longFormulario = event.target[2].value;
      if (nombreFormulario.trim() === '') {
        // Si el campo de nombre está vacío, muestra un mensaje de error
        //setErrorMensaje(true);
        toast.error("debes llenar todos los campos")
        return;
      }
      //console.log(nombreFormulario);
      //console.log(event.target[1].value);
      //console.log(event);
        const form = new FormData();
        form.append('nombre', nombreFormulario);
        form.append('latitud', latFormulario);
        form.append('longitud', longFormulario);
        fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/rutas/insert_parada',
        {
          method: 'POST',
          body: form
        })
        .then(response => response.json())
        .then(data => 
          {
            console.log(data.resulatdo);
            setMensaje(true);
            toast.success('se ingresaron los datos correctamente')
            setMostrarForm(false);
          })
        .catch(error => console.log(error))
    }
    const HandleDelete = (event) =>
    {
      event.preventDefault();
      
        const formDelete = new FormData();
        formDelete.append('clave', clave);
        fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/rutas/delete_parada',
        {
          method: 'POST',
          body: formDelete
        })
        .then(response => response.json())
        .then(data => 
          {
            //console.log(data.resulatdo);
            setMensajeEliminado(true);
            toast.warning(data.mensaje)
            setMostrarForm(false);
            setEliminarForm(false);
          })
        .catch(error => console.log(error))
    }

    const eliminarParada = (clave, nombre, latitud, longitud) =>
    {        
      /*console.log(clave);
      console.log(nombre);
      console.log(latitud);
      console.log(longitud);*/
      setClave(clave);
      setNombre(nombre);
      setLat(latitud);
      setLong(longitud);
      setMostrarForm(false);
      setEliminarForm(true);
      setMensaje(false);
      setMensajeEliminado(false);

    }

  return (
    <div className="container_parada">
      <div className="parada">
        <APIProvider apiKey={'AIzaSyA4i6wY6szEPVUtksKuIvL5R_QZFsbl5xc'}>
          <Map
            style={{width: '100%', height: '550px'}}
            defaultCenter={{lat: 20.6536, lng: -100.4036}}
            defaultZoom={13}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            onClick={NewStop}
          >
            {parada.map(parada => (
                <Marker
                  key={parada.clave}
                  position={{ lat: parseFloat(parada.latitud), lng: parseFloat(parada.longitud) }}
                  label={parada.clave}
                  icon={{
                    url: camion, // Utilizar la imagen del marcador personalizado
                    scaledSize: new window.google.maps.Size(20, 20), // Tamaño personalizado del marcador
                  }}
                  onClick={() => eliminarParada(parada.clave, parada.nombre, parada.latitud, parada.longitud )}
                />
            ))}
          </Map>
         </APIProvider>
    </div>
    <div className="formulario_parada">
        {mostrarForm && <form onSubmit={HandleSubmit} className="form-parada">
            <label className="label-nombre" >Nombre</label>
            <input type="text" className="input-nombre"></input>
            <label className="label-latitud">Latitud:</label>
            <input className="input-latitud" type="text" value={coordenadas?.lat || ''} readOnly />

            <label className="label-longitud">Longitud:</label>
            <input className="input-longitud" type="text" value={coordenadas?.lng || ''} readOnly />

            <button className="btn-guardar-parada" type="submit"><FaSave size={16}/>Guardar</button>  
        </form>}
        {eliminarForm && <form onSubmit={HandleDelete} className="form-parada">
            <label className="label-nombre" >Nombre</label>
            <input type="text" className="input-nombre" value={nombre || ''} readOnly />
            <label className="label-latitud">Latitud:</label>
            <input className="input-latitud" type="text" value={lat || ''} readOnly />

            <label className="label-longitud">Longitud:</label>
            <input className="input-longitud" type="text" value={long || ''} readOnly />

            <button className="btn-eliminar-parada" type="submit"><MdDelete size={16} />Eliminar</button>  
        </form>}
        </div>
    <ToastContainer position="bottom-right" />
  </div>
  );
}

export default Map_parada;