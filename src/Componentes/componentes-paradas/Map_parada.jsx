import React, { useEffect, useState} from "react";
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import trashTrue from '../../trashTrue.png';
import trashFalse from '../../trashFalse.png';
import '../../Estilos-vistas/parada.css';
import { BiReset } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Map_parada = ({ userType }) => {
    
    //hook que define las coordenadas de las paradas
    const [id, setId] = useState('');
    const [maxFill, setMaxFill] = useState('');
    const [maxWeight, setWeight] = useState('');
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [status, setStatus] = useState('');
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
    }
    const HandleDelete = (event) =>
    {
      event.preventDefault();
      
        const formDelete = new FormData();
        formDelete.append('id_container', id);
        fetch('http://localhost/ecoflash/container/reset_container',
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

    const deleteContainer = (id, max_fill_level, max_weight, lat, long, fill, weight, status) =>
    {
      const available_fill = max_fill_level - fill;
      const available_weight = max_weight - weight;
      setId(id);
      setMaxFill(available_fill);
      setWeight(available_weight);
      setLat(lat);
      setLong(long);
      setStatus(status);
      setMostrarForm(false);
      setEliminarForm(true);
      setMensaje(false);
      setMensajeEliminado(false);
      console.log(status)

    }

  return (
    <div className="container_parada">
      <div className="parada">
        <APIProvider apiKey={''}>
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
                    url: container.status === 'f'? trashFalse : trashTrue,
                    scaledSize: new window.google.maps.Size(20, 20),
                  }}
                  onClick={() => deleteContainer(container.id, container.max_fill_level, container.max_weight, container.lat, container.long, container.centimeters, container.grams, container.status )}
                />
            ))}
          </Map>
         </APIProvider>
    </div>
    <div className="formulario_parada">
        {eliminarForm && userType == "admin" && <form onSubmit={HandleDelete} className="form-parada">
            <label className="label-nombre">Tamaño (cm)</label>
            <input type="text" className="input-nombre" value={maxFill || ''} readOnly/>
            <label className="label-nombre">Capacidad (gr)</label>
            <input type="text" className="input-nombre" value={maxWeight || ''} readOnly/>

            <button className="btn-reset-container" type="submit"><BiReset size={16}/>Resetear Contenedor</button>
        </form>}
        {eliminarForm && userType == "user" && <form onSubmit={HandleDelete} className="form-parada">
            <label className="label-nombre">Tamaño (cm)</label>
            <input type="text" className="input-nombre" value={maxFill || ''} readOnly/>
            <label className="label-nombre">Capacidad (gr)</label>
            <input type="text" className="input-nombre" value={maxWeight || ''} readOnly/>
        </form>}
    </div>
        <ToastContainer position="bottom-right"/>
    </div>
  );
}

export default Map_parada;
