// LoginForm.js
import FormRegister from "../Componentes/componentes-register/FormRegister";
import "../Estilos-vistas/Form.css";

const LoginForm = (props) => {
    const Login = data =>
    {
        const tipo  = data.user[0].type;
        if(tipo === 'admin')
        {
            props.onLogin();
        }else{
            console.log('no se pudo pa');
        }

    };


    return (
        <div className="backgroundd">
            <div className="containerr">
                <FormRegister onLogin={Login}/>
            </div>
        </div>
    );
};

export default LoginForm;
