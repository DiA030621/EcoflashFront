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
    const [selectedContainer, setSelectedContainer] = useState(null);

    const handleMarkerClick = (container) => {
        setSelectedContainer(container);
        setId(container.id);
        console.log(container.id);
    };

    const closeInfoWindow = () => {
        setSelectedContainer(null);
    };


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
    const HandleDelete = () =>
    {
        const formDelete = new FormData();
        formDelete.append('id_container', id);
        console.log(id)
        fetch('http://localhost/ecoflash/container/reset_container',
        {
          method: 'POST',
          body: formDelete
        })
        .then(response => response.json())
        .then(data => 
          {
            setMensajeEliminado(true);
            toast.warning(data.mensaje)
            setMostrarForm(false);
            setEliminarForm(false);
          })
        .catch(error => console.log(error))
    }

    // const deleteContainer = (id, max_fill_level, max_weight, lat, long, fill, weight, status) =>
    // {
    //   const available_fill = max_fill_level - fill;
    //   const available_weight = max_weight - weight;
    //   setId(id);
    //   setMaxFill(available_fill);
    //   setWeight(available_weight);
    //   setLat(lat);
    //   setLong(long);
    //   setStatus(status);
    //   setMostrarForm(false);
    //   setEliminarForm(true);
    //   setMensaje(false);
    //   setMensajeEliminado(false);
    //   console.log(status)
    // }

  return (
      <div className="map-container">
          <APIProvider apiKey="AIzaSyA4i6wY6szEPVUtksKuIvL5R_QZFsbl5xc">
              <Map
                  // style={{width: "100%", height: "100vh"}}
                  defaultCenter={{lat: 20.6536, lng: -100.4036}}
                  defaultZoom={13}
                  gestureHandling="greedy"
                  disableDefaultUI={true}
              >
                  {container.map((c) => (
                      <Marker
                          key={c.id}
                          position={{lat: parseFloat(c.lat), lng: parseFloat(c.long)}}
                          label={c.id}
                          icon={{
                              url: c.status === "f" ? trashFalse : trashTrue,
                              scaledSize: new window.google.maps.Size(20, 20),
                          }}
                          onClick={() => handleMarkerClick(c)}
                      />
                  ))}
              </Map>

              {selectedContainer && (
                  <div className="info-window">
                      <button className="close-btn" onClick={closeInfoWindow}>×</button>
                      <div className="info-content">
                          <h3>Información del Contenedor</h3>
                          <div>
                              <strong>Tamaño (cm):</strong> {selectedContainer.max_fill_level || "N/A"}
                          </div>
                          <div>
                              <strong>Capacidad (gr):</strong> {selectedContainer.max_weight || "N/A"}
                          </div>
                          {userType === "admin" && (
                              <button className="btn-reset" onClick={HandleDelete}>
                                  <BiReset size={16}/> Resetear Contenedor
                              </button>
                          )}
                      </div>
                  </div>
              )}
          </APIProvider>
          <ToastContainer position="bottom-right"/>
      </div>
  );
}

export default Map_parada;
