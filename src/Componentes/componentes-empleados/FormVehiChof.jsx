import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"
import { Dropdown } from "react-bootstrap";
import React, {useState, useEffect} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';


const FormVehiChof = ({ clave, onCancelar, onGuardar, onDelete, show, onHide, forceRender, onValidacion }) => {
    
    const [claveVehiculo, setClaveVehiculo] = useState(null);
    const [vehiculos, setVehiculos] = useState([]);
    const [actualizar, setActualizar] = useState(false);


    useEffect(() => {
        console.log(clave);
        const form = new FormData();
        form.append('clave', clave);
        
        fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/empleados/get_chofer_vehiculo',
            {
            method: 'POST',
            body: form
          })
            .then(response => response.json())
            .then(data => {
                if (data.resultado)
                {
                    setClaveVehiculo(data.vehiculos[0].clave_vehiculo);
                    setActualizar(true);
                }else{
                    setClaveVehiculo(null);
                    setActualizar(false);
                }
            })
            .catch(error =>
                {
                    console.error('Error al obtener la ruta del vehiculo:', error);
                });
        fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/rutas/get_vehiculos_chofer')
                .then(response => response.json())
                .then(data => {
                    if (data.resultado)
                    {
                        setVehiculos(data.vehiculos);
                        //console.log(rutas);
                    }else{
                        setVehiculos([]);
                    }
                })
                .catch(error =>
                    {
                        console.error('Error al obtener la ruta del vehiculo:', error);
            });

    }, [clave, forceRender]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(claveVehiculo===null){
            onValidacion();
        }
        if (event.nativeEvent.submitter.name === "guardar") {
          onGuardar(claveVehiculo,clave, actualizar);
          //console.log(claveRuta);
        } else if (event.nativeEvent.submitter.name === "eliminar") {
          onDelete(clave);
          //console.log("eliminar");
        }
      };

      const handleOptionSelect = (clave_vehiculo) => {
        setClaveVehiculo(clave_vehiculo);
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
                    Vehiculos Disponibles
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    
                    <Modal.Body
                    className={ "bg-opacity-80 " + "bg-dark" }>
                        <FloatingLabel>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                    {claveVehiculo ? `Vehiculo: ${claveVehiculo}` : "Seleccione una opción"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>

                                {vehiculos.map(vehiculo => (
                                    <Dropdown.Item key={vehiculo.clave} onClick={() => handleOptionSelect(vehiculo.clave)}>
                                    {vehiculo.clave}
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

export default FormVehiChof;