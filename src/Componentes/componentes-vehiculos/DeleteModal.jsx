import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import 'bootstrap/dist/css/bootstrap.min.css';


const DeleteModal = ({ clave, onCancelar, onEliminar, show, onHide }) => {
        
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
                        Eliminar
                    </Modal.Title>
                </Modal.Header>
                    
                    <Modal.Body
                    className={ "bg-opacity-80 "  }>
                        <div className="d-flex justify-content-between m-2">
                            <h2>¿Estas Seguro que quieres Eliminar el Vehículo?</h2>     
                        </div>
                    </Modal.Body>
                    <Modal.Footer
                    className={ "bg-opacity-65 " + "bg-warning" }>
                        <Button 
                        variant="danger"
                        onClick={() => onEliminar(clave)}>
                            Eliminar
                        </Button>
                        <Button
                        variant="secondary"
                        className="ms-2"
                        onClick={onCancelar}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
            </Modal>
                  
        </>
    )
}

export default DeleteModal;