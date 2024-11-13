import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"
import FormLabel from "react-bootstrap/esm/FormLabel"
import React, {useState, useEffect} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';


const FormModal = ({ datos, accion, onCancelar, onActualizar, onAgregar, show, onHide }) => {
    
    useEffect(() => {
        setFormData({
            clave: datos.clave,
            marca: datos.marca,
            modelo: datos.modelo,
            placa: datos.placa,
            estado: datos.estado,
        })
    }, [datos]);

    const [formData, setFormData] = useState({
        clave: '',
        marca: '',
        modelo: '',
        placa: '',
        estado: '',
    });

    const handleChange = (e) =>
    {
        //console.log(e.target.value);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
          console.log(e.target.value);
    }
    
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
                    {accion === "cambio" ? "Editando Vehículo" : "Agregando Vehículo"}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={accion==="cambio" ?onActualizar:onAgregar}>
                    
                    <Modal.Body
                    className={ "bg-opacity-80 " + "bg-dark" }>
                        <div className="d-flex justify-content-between m-2">
                            {accion==="cambio" &&<FloatingLabel label="Clave:">
                                <Form.Control
                                    name="clave" 
                                    placeholder=""
                                    value={formData.clave}
                                    onChange={handleChange}
                                    readOnly={true}
                                />
                            </FloatingLabel>}
                            <FloatingLabel label="Marca:">
                                <Form.Control
                                    name="marca" 
                                    placeholder=""
                                    value={formData.marca}
                                    onChange={handleChange}
                                />
                            </FloatingLabel>
                            <FloatingLabel label="Modelo:">
                                <Form.Control
                                    placeholder=""
                                    name="modelo"
                                    value={formData.modelo}
                                    onChange={handleChange}
                                />
                            </FloatingLabel>
                        </div>
                        
                        <div className="d-flex justify-content-between m-2">
                            <FloatingLabel label="Placa:">
                                <Form.Control
                                    name="placa" 
                                    placeholder=""
                                    value={formData.placa}
                                    onChange={handleChange}
                                    />
                            </FloatingLabel>
                            <Form.Group>
                                <FormLabel className="text-white">Estado:</FormLabel><br />
                                <Form.Check
                                    inline
                                    name="estado" 
                                    value="activo"
                                    label="Activo"
                                    checked={formData.estado === "activo"}
                                    type="radio"
                                    onChange={handleChange}
                                    className="text-white"
                                    />
                                <Form.Check
                                    inline
                                    name="estado" 
                                    value="mantenimiento"
                                    checked={formData.estado === "mantenimiento"}
                                    type="radio"
                                    label="Mantenimiento"
                                    onChange={handleChange}
                                    className="text-white"
                                />
                            </Form.Group>
                        </div>
                    </Modal.Body>
                    <Modal.Footer
                    className={ "bg-opacity-65 " + "bg-warning" }>
                        <Button 
                        variant="success"
                        type="submit">
                            Guardar
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

export default FormModal;