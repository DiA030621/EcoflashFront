import React, { useEffect, useState } from 'react';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import camion from '../../parada.png';
import parada from '../../camion.png';
import '../../Estilos-vistas/Ruta_form.css';
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Mapa = (clave_ruta) => {

  const [paradas, setParadas] = useState([]);
  const [tramos, setTramos] = useState([]);
  const [clave, setClave] = useState("");
  const [accion, setAccion] = useState(null);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);

        useEffect(() => {

            const formData = new FormData();
                formData.append('clave_ruta', clave_ruta.clave_ruta);
            // Llamada a la primera API para obtener las paradas
            fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/rutas/get_parada_tramo',{
              method: 'POST',
                body: formData
            })
          .then(response => response.json())
          .then(data => {
            setParadas(data.paradas);
          })
          .catch(error => console.log(error));

          fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/rutas/get_tramo', {
          method: 'POST',
          body: formData
          })
          .then(response => response.json())
          .then(data => {
              setTramos(data.tramos);
          })
          .catch(error => console.log(error));
       
        }, [mostrarForm]);
        const eliminarTramo = (clave, latitud, longitud) =>
        {
          setClave(clave);
          setLat(latitud);
          setLong(longitud);
          setMostrarForm(true);
          setAccion("eliminar");
        }

        const agregarTramo = (clave, latitud, longitud) =>
        {
          setClave(clave);
          setLat(latitud);
          setLong(longitud);
          setMostrarForm(true);
          setAccion("guardar")
        }

        const SubmitGuardar = (event) =>
        {
          event.preventDefault();
          
          //console.log(clave_ruta.clave_ruta);
          //console.log(event.target[0].value);
            const formGuardar = new FormData();
            formGuardar.append('clave_ruta', clave_ruta.clave_ruta);
            formGuardar.append('clave_parada', event.target[0].value);
            fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/rutas/insert_tramo',
            {
              method: 'POST',
              body: formGuardar
            })
            .then(response => response.json())
            .then(data => 
              {
                toast.success(data.mensaje)
                setMostrarForm(false);
              })
            .catch(error => console.log(error))
        }


        const SubmitEliminar = (event) =>
        {
          event.preventDefault();
          //console.log(event.target[0].value);
            const formEliminar = new FormData();
            formEliminar.append('clave', event.target[0].value);
            fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/rutas/delete_tramo',
            {
              method: 'POST',
              body: formEliminar
            })
            .then(response => response.json())
            .then(data => 
              {
                toast.warning(data.mensaje)
                setMostrarForm(false);
              })
            .catch(error => console.log(error))
        }


    return (
      <div className='container_ruta'>
        <div className='mapa_ruta'>
        <APIProvider apiKey={'AIzaSyA4i6wY6szEPVUtksKuIvL5R_QZFsbl5xc'}>
          <Map
            style={{width: '100%', height: '550px'}}
            defaultCenter={{lat: 20.6536, lng: -100.4036}}
            defaultZoom={13}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
          >
            {paradas.map(parada => (
                <Marker
                  key={parada.clave}
                  position={{ lat: parseFloat(parada.latitud), lng: parseFloat(parada.longitud) }}
                  label={parada.clave}
                  icon={{
                    url: camion, // Utilizar la imagen del marcador personalizado
                    scaledSize: new window.google.maps.Size(20, 20), // Tamaño personalizado del marcador
                  }}
                  onClick={() => agregarTramo(parada.clave, parada.latitud, parada.longitud )}
                />
            ))}
            {tramos.map(tramo => (
                <Marker
                  key={tramo.clave}
                  position={{ lat: parseFloat(tramo.latitud), lng: parseFloat(tramo.longitud) }}
                  label={tramo.clave}
                  icon={{
                    url: parada, // Utilizar la imagen del marcador personalizado
                    scaledSize: new window.google.maps.Size(20, 20), // Tamaño personalizado del marcador
                  }}
                  onClick={() => eliminarTramo(tramo.clave, tramo.latitud, tramo.longitud )}
                />
            ))}
          </Map>
         </APIProvider>
        </div>
        <div className="formulario_parada">
        {mostrarForm && <form onSubmit={accion==="guardar" ? SubmitGuardar : SubmitEliminar} className="form-parada">
            <label className="label-nombre" >Clave de parada</label>
            <input type="text" className="input-nombre" value={clave} readOnly/>
            <label className="label-latitud">Latitud:</label>
            <input className="input-latitud" type="text" value={lat} readOnly />

            <label className="label-longitud">Longitud:</label>
            <input className="input-longitud" type="text" value={long} readOnly />
            {accion==="guardar" && <button className="btn-guardar-parada" type="submit"><FaSave size={16}/>Guardar</button>}
            {accion==="eliminar" && <button className="btn-eliminar-parada" type="submit"><MdDelete size={16}/>Eliminar</button>}
        </form>}
        </div>
        <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Mapa;