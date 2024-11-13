import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function Actividades() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost/5toCuatrimestre/Repositorio-Integradora/BACK/rutas/grafica_pago')
      .then(response => response.json())
      .then(data => {
        setData(data.rutas);
      })
      .catch(error => console.log(error));
  }, []);

  const generateBarChartConfig = () => {
    const categories = data.map(ruta => ruta.nombre_ruta);
    const seriesData = data.map(ruta => parseInt(ruta.contador_pagos));

    return {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Gráfico de barras'
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Rutas'
        }
      },
      yAxis: {
        title: {
          text: 'Contador de pagos'
        }
      },
      series: [
        {
          name: 'Contador de pagos',
          data: seriesData
        }
      ]
    };
  };

  const barChartConfig = generateBarChartConfig();

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={barChartConfig} />
    </div>
  );
}

export default Actividades;