import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const FormModalUsu = ({ datos, accion, onCancelar, onActualizar, onAgregar, show, onHide }) => {
    
    useEffect(() => {
        setFormData({
            clave: datos.clave,
            nombre: datos.nombre,
            ap: datos.ap,
            am: datos.am,
            correo: datos.correo,
            contra: datos.contra,
            saldo: datos.saldo,
        })
    }, [datos]);

    const [formData, setFormData] = useState({
        clave: '',
        nombre: '',
        ap: '',
        am: '',
        correo: '',
        contra: '',
        saldo: 0.0,
    });

    const handleChange = (e) =>
    {
        //console.log(e.target.value);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
          //console.log(e.target.value);
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
                    {accion === "cambio" ? "Editando Usuario" : "Agregando Usuario"}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={accion==="cambio" ?onActualizar:onAgregar}>
                    
                <Modal.Body className={"bg-opacity-80 bg-dark"}>
                    <div className="d-flex justify-content-between m-2">
                        {accion === "cambio" && (
                        <div className="w-25">
                            <FloatingLabel label="Clave:">
                            <Form.Control
                                name="clave"
                                placeholder=""
                                value={formData.clave}
                                onChange={handleChange}
                                readOnly={true}
                            />
                            </FloatingLabel>
                        </div>
                        )}
                        <div className="w-25">
                        <FloatingLabel label="Nombre:">
                            <Form.Control
                            name="nombre"
                            placeholder=""
                            value={formData.nombre}
                            onChange={handleChange}
                            />
                        </FloatingLabel>
                        </div>
                        <div className="w-25">
                        <FloatingLabel label="Apellido Paterno:">
                            <Form.Control
                            placeholder=""
                            name="ap"
                            value={formData.ap}
                            onChange={handleChange}
                            />
                        </FloatingLabel>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between m-2">
                        <div className="w-25">
                        <FloatingLabel label="Apellido Materno:">
                            <Form.Control
                            name="am"
                            placeholder=""
                            value={formData.am}
                            onChange={handleChange}
                            />
                        </FloatingLabel>
                        </div>
                        <div className="w-25">
                        <FloatingLabel label="Correo:">
                            <Form.Control
                            name="correo"
                            placeholder=""
                            value={formData.correo}
                            onChange={handleChange}
                            />
                        </FloatingLabel>
                        </div>
                        <div className="w-25">
                        <FloatingLabel label="Contraseña:">
                            <Form.Control
                            name="contra"
                            placeholder=""
                            value={formData.contra}
                            onChange={handleChange}
                            />
                        </FloatingLabel>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between m-2">
                    {accion === "cambio" && (
                        <div className="w-25">
                        <FloatingLabel label="Saldo:">
                            <Form.Control
                            name="saldo"
                            type="number"
                            placeholder=""
                            value={formData.saldo}
                            onChange={handleChange}
                            />
                        </FloatingLabel>
                        </div>
                    )}
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

export default FormModalUsu;