import React, { useEffect, useState } from "react";
import '../../Estilos-vistas/Bienvenida.css';

function Bienvenida(props) {
	// Estados para almacenar los valores de localStorage
	const [userType, setUserType] = useState('');
	const [name, setName] = useState('');
	const [lastname, setLastname] = useState('');
	const [userScore, setUserScore] = useState('');

	useEffect(() => {
		// Acceder a los datos almacenados en localStorage
		const storedUserType = localStorage.getItem('userType');
		const storedName = localStorage.getItem('name');
		const storedLastname = localStorage.getItem('lastname');
		const storedUserScore = localStorage.getItem('userScore');

		// Asignarlos a los estados
		setUserType(storedUserType);
		setName(storedName);
		setLastname(storedLastname);
		setUserScore(storedUserScore);
	}, []); // El useEffect se ejecutará solo una vez después de que el componente se monte

	return (
		<div className="cont-bienv">
			<img className="img-bienv" src={require(`../../ecoflash2.jpg`)} />
			<div className="cont-texto-bienv">
				<p className="titulo-bienv">
					<strong>Bienvenido, {name} {lastname}</strong>
				</p>
				<p className="texto-testimonio">Tu puntaje es de: </p>
				<strong>{userScore}</strong>
			</div>
		</div>
	);
}

export default Bienvenida;
