import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link
import "../../Estilos-vistas/Form.css";

function FormLogin(props) {
    const [correo, setUsername] = useState('');
    const [contra, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!correo.trim() || !contra.trim()) {
            setError('Usuario o contraseña vacíos.');
            return;
        }

        const formData = new FormData();
        formData.append('email', correo);
        formData.append('passwd', contra);

        try {
            const response = await fetch('http://localhost/ecoflash/user/login', {
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
                const tipo = data.user[0].type;
                // if (tipo !== 'admin') {
                //     setError('Tienes prohibido el acceso');
                //     setUsername('');
                //     setPassword('');
                //     return;
                // } else {
                //     props.onLogin(data);
                // }
                props.onLogin(data);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }

        setUsername('');
        setPassword('');
        setError('');
    };

    return (
        <div className="bo">
            <div className="form sign_inn">
                <h3>Inicio de Sesión</h3>

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
                        Iniciar Sesión
                    </button>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default FormLogin;
