import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"
import { Dropdown } from "react-bootstrap";
import React, {useState, useEffect} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';


const FormRuta = ({ clave, onCancelar, onGuardar, onDelete, show, onHide, forceRender, onValidacion }) => {
    
    const [claveRuta, setClaveRuta] = useState(null);
    const [nombreRuta, setNombreRuta] = useState(null);
    const [rutas, setRutas] = useState([]);
    const [actualizar, setActualizar] = useState(false);


    useEffect(() => {
        
        const form = new FormData();
        form.append('clave_vehiculo', clave);
        
        fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/rutas/get_ruta_vehiculo',
            {
            method: 'POST',
            body: form
          })
            .then(response => response.json())
            .then(data => {
                if (data.resultado)
                {
                    setClaveRuta(data.ruta_vehiculo[0].clave_ruta);
                    setNombreRuta(data.ruta_vehiculo[0].nombre);
                    setActualizar(true);
                }else{
                    setClaveRuta(null);
                    setNombreRuta(null);
                    setActualizar(false);
                }
            })
            .catch(error =>
                {
                    console.error('Error al obtener la ruta del vehiculo:', error);
                });
        fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/utas/get_rutas')
                .then(response => response.json())
                .then(data => {
                    if (data.resultado)
                    {
                        setRutas(data.rutas);
                        //console.log(rutas);
                    }else{
                        setRutas([]);
                    }
                })
                .catch(error =>
                    {
                        console.error('Error al obtener la ruta del vehiculo:', error);
            });

    }, [clave, forceRender]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(nombreRuta===null){
            onValidacion();
        }
        if (event.nativeEvent.submitter.name === "guardar") {
          onGuardar(claveRuta,clave, actualizar);
          //console.log(claveRuta);
        } else if (event.nativeEvent.submitter.name === "eliminar") {
          onDelete(clave);
          //console.log("eliminar");
        }
      };

      const handleOptionSelect = (clave_rut, nombre) => {
        setNombreRuta(nombre);
        setClaveRuta(clave_rut);
      };
    
    return(
        <>
            <Modal 
                centered
                show={show}
                size="lg"
                onHide={onHide} >
                <Modal.Header closeButton 
                className={ "bg-opacity-60 " + "bg-warning" } >
                    <Modal.Title className="text-dark">
                    Ruta del Vehículo
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    
                    <Modal.Body
                    className={ "bg-opacity-80 " + "bg-dark" }>
                        <FloatingLabel>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                    {nombreRuta ? `Ruta: ${nombreRuta}` : "Seleccione una opción"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>

                                {rutas.map(ruta => (
                                    <Dropdown.Item key={ruta.clave} onClick={() => handleOptionSelect(ruta.clave, ruta.nombre)}>
                                    {ruta.nombre}
                                </Dropdown.Item>
                                ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer
                    className={ "bg-opacity-65 " + "bg-warning" }>
                        <Button type="submit" name="guardar" variant="primary">
                            Guardar
                        </Button>
                        <Button type="submit" name="eliminar" variant="danger">
                            Eliminar
                        </Button>
                        <Button
                        variant="secondary"
                        className="ms-2"
                        onClick={onCancelar}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
                  
        </>
    )
}

export default FormRuta;