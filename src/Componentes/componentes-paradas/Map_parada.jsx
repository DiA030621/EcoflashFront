import React, { useEffect, useState} from "react";
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import trashTrue from '../../trashTrue.png';
import trashFalse from '../../trashTrue.png';
import '../../Estilos-vistas/parada.css';
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Map_parada() {
    
    //hook que define las coordenadas de las paradas
    const [id, setId] = useState('');
    const [maxFill, setMaxFill] = useState('');
    const [maxWeight, setWeight] = useState('');
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [container, setContainer] = useState([]);
    const [coordenadas, setCoordenadas] = useState([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [mensaje, setMensaje] = useState(false);
    const [eliminarForm, setEliminarForm] = useState(false);
    const [mensajeEliminado, setMensajeEliminado] = useState(false);

    useEffect(() => {
        // Llamada a la primera API para obtener las paradas
        fetch('http://localhost/ecoflash/container/get_containers',{
            method: 'GET'
        })
      .then(response => response.json())
      .then(data => {
        console.log(data.container);
        setContainer(data.container);
      })
      .catch(error => console.log(error));

    }, [mensaje, mensajeEliminado]);

    //funcion que muestra el formulario de una nueva parada cada que se da clic en el mapa
    const NewContainer = (event) =>
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
      
      const fillForm = event.target[0].value;
      const weightForm = event.target[1].value;
      const latForm = event.target[2].value;
      const longForm = event.target[3].value;
      if (fillForm.trim() === '' || weightForm.trim() === '') {
        // Si el campo de nombre está vacío, muestra un mensaje de error
        //setErrorMensaje(true);
        toast.error("debes llenar todos los campos")
        return;
      }
      //console.log(nombreFormulario);
      //console.log(event.target[1].value);
      //console.log(event);
        const form = new FormData();
        form.append('lat', latForm);
        form.append('long', longForm);
        form.append('max_fill_level', fillForm);
        form.append('max_weight', weightForm);
        fetch('http://localhost/ecoflash/container/create_container',
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
        formDelete.append('id', id);
        fetch('http://localhost/ecoflash/container/delete_container',
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

    const deleteContainer = (id, max_fill_level, max_weight, lat, long) =>
    {        
      /*console.log(clave);
      console.log(nombre);
      console.log(latitud);
      console.log(longitud);*/
      setId(id);
      setMaxFill(max_fill_level);
      setWeight(max_fill_level);
      setLat(lat);
      setLong(long);
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
            onClick={NewContainer}
          >
            {container.map(container => (
                <Marker
                  key={container.id}
                  position={{ lat: parseFloat(container.lat), lng: parseFloat(container.long) }}
                  label={container.id}
                  icon={{
                    url: trashTrue, // Utilizar la imagen del marcador personalizado
                    scaledSize: new window.google.maps.Size(20, 20), // Tamaño personalizado del marcador
                  }}
                  onClick={() => deleteContainer(container.id, container.max_fill_level, container.max_weight, container.lat, container.long )}
                />
            ))}
          </Map>
         </APIProvider>
    </div>
    <div className="formulario_parada">
        {mostrarForm && <form onSubmit={HandleSubmit} className="form-parada">
            <label className="label-nombre" >Tamaño (cm)</label>
            <input type="number" className="input-fill"></input>
            <label className="label-nombre" >Capacidad (gr)</label>
            <input type="number" className="input-weight"></input>
            <label className="label-latitud">Latitud:</label>
            <input className="input-latitud" type="text" value={coordenadas?.lat || ''} readOnly />

            <label className="label-longitud">Longitud:</label>
            <input className="input-longitud" type="text" value={coordenadas?.lng || ''} readOnly />

            <button className="btn-guardar-parada" type="submit"><FaSave size={16}/>Guardar</button>  
        </form>}
        {eliminarForm && <form onSubmit={HandleDelete} className="form-parada">
            <label className="label-nombre" >Tamaño (cm)</label>
            <input type="text" className="input-nombre" value={maxFill || ''} readOnly />
            <label className="label-nombre" >Capacidad (gr)</label>
            <input type="text" className="input-nombre" value={maxWeight || ''} readOnly />
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