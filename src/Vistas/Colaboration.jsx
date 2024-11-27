import React from 'react';
import { useLocation } from 'react-router-dom';
import NotLogged from "../Componentes/componentes-colaboration/colaborationNotLogged";
import IsLogged from "../Componentes/componentes-colaboration/colaborationIsLogged";
import FormLogin from "../Componentes/componentes-login/FormLogin";

const Colaboracion = ({userType}) => {
    // Usamos useLocation para obtener la query string de la URL
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const idContainer = params.get('id_container');

    return (
        // <div>
        //     <h1>Colaboración</h1>
        //     {idContainer ? (
        //         <p>Estás viendo el contenedor con ID: {idContainer}</p>
        //     ) : (
        //         <p>No se proporcionó un ID de contenedor.</p>
        //     )}
        // </div>
    <div className="backgroundd">
        {userType &&
            <div className="containe">
                <IsLogged/>
            </div>
        }
        {userType === null &&
            <div className="containe">
                <NotLogged/>
            </div>
        }

    </div>
    )
        ;
};

export default Colaboracion;
