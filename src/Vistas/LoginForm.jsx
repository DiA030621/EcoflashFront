// LoginForm.js
import FormLogin from "../Componentes/componentes-login/FormLogin";
import "../Estilos-vistas/Form.css";

const LoginForm = (props) => {
    const Login = (data) => {
        const tipo = data.user[0].type;
        if (tipo === 'admin' || tipo === 'user') {
            props.onLogin(tipo); // Pasar el tipo de usuario
        } else {
            console.log('no se pudo pa');
        }
    };

    return (
        <div className="backgroundd">
            <div className="containerr">
                <FormLogin onLogin={Login} />
            </div>
        </div>
    );
};

export default LoginForm;
