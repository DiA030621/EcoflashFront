import React from "react";
import Bienvenida from "../Componentes/componentes-home/Bienvenida";
import Titulo from "../Componentes/Titulo";

export function Home  (props)
{
    const name = props.name;
    console.log(props)
    return(
        <div>
            <Titulo
            text="Inicio"/>
            <Bienvenida 
            name = {name}
            lastname = {props.lastname}
            score={props.score}/>
        </div>
    )
}
