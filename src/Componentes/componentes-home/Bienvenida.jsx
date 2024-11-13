import React from "react";
import '../../Estilos-vistas/Bienvenida.css';

function Bienvenida (props)
{
    return(
        <div className="cont-bienv">
			<img className="img-bienv" src={require(`../../ecoflash2.jpg`)}/>
			<div className="cont-texto-bienv">
				<p className="titulo-bienv">
					<strong>{props.nombre}</strong>
				</p>
				<p className="texto-testimonio">"{props.testimonio}"</p>
			</div>
		</div>
    );
}

export default Bienvenida;