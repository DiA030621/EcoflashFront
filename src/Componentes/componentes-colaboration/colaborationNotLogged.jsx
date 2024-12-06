import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../../Estilos-vistas/Form.css";

function FormLogin(props) {
    const [correo, setUsername] = useState('');
    const [contra, setPassword] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const idContainer = params.get('id_container');
    const navegate = useNavigate();


    const handleSubmit = async (event) => {
        console.log(idContainer);
        event.preventDefault();

        if (!correo.trim() || !contra.trim()) {
            setError('Usuario o contraseña vacíos.');
            return;
        }

        const formData = new FormData();
        formData.append('email', correo);
        formData.append('passwd', contra);
        formData.append('id_container', idContainer);

        try {
            const response = await fetch('https://snapper-finer-boa.ngrok-free.app/ecoflash/container/contribution', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!data.resultado) {
                setError(data.mensaje);
                setUsername('');
                setPassword('');
                return;
            } else {
                setTimeout(() => {
                    setInfo(data.mensaje);
                    setUsername('');
                    setPassword('');
                    setTimeout(() => {
                        navegate('/login');
                    }, 5000);
                }, 1000);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }

        setUsername('');
        setPassword('');
        setError('');
        setInfo('');
    };

    return (
        <div className="bo">
            <div className="form sign_inn">
                <h3>Contribución</h3>
                <h5>Valida tu cuenta aquí</h5>

                <form onSubmit={handleSubmit}>
                    <div className="type">
                        <input
                            type="text"
                            placeholder="Correo"
                            value={correo}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="type">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={contra}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="btn" type="submit">
                        Validar
                    </button>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {info && <p style={{ color: 'green' }}>{info}</p>}
                </form>

                <p>
                    Página prinicpal{' '}
                    <Link to="/login" className="register-link">
                        Aquí
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default FormLogin;
