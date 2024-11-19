import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importar Link
import "../../Estilos-vistas/Form.css";

function FormLogin(props) {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [error, setError] = useState('');
    const navegate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name.trim() || !lastname.trim() || !email.trim() || !passwd.trim()) {
            setError('Debes llenar todos los campos');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('lastname', lastname);
        formData.append('type', "user");
        formData.append('email', email);
        formData.append('passwd', passwd);

        try {
            const response = await fetch('http://localhost/ecoflash/user/singin', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!data.resultado) {
                setError(data.mensaje);
                setEmail('');
                setPasswd('');
                return;
            } else {
                navegate('/login');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }

        setEmail('');
        setPasswd('');
        setError('');
    };

    return (
        <div className="boxx">
            <div className="form sign_inn">
                <h3>Registro</h3>

                <form onSubmit={handleSubmit}>
                    <div className="type">
                        <input
                            type="text"
                            placeholder="Nombre(s)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="type">
                        <input
                            type="text"
                            placeholder="Apellido(s)"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    <div className="type">
                        <input
                            type="text"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="type">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={passwd}
                            onChange={(e) => setPasswd(e.target.value)}
                        />
                    </div>

                    <button className="btn" type="submit">
                        Registrarme
                    </button>

                    {error && <p style={{color: 'red'}}>{error}</p>}
                </form>
                <p>
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className="register-link">
                        Iniciar sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default FormLogin;
