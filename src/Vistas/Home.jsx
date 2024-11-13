import React from "react";
import Bienvenida from "../Componentes/componentes-home/Bienvenida";
import Titulo from "../Componentes/Titulo";

export function Home ()
{
    return(
        <div>
            <Titulo
            text="Inicio"/>
            <Bienvenida 
            nombre="Bienvenido"
            testimonio="Este es el panel de control Ecoflash"/>
        </div>
    )
}
