import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { collection, query, orderBy, limit, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from "../firebase/Confi";

function Graficas () 
{
    const [data, setData] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, 'Lecturas');
        const orderedQuery = query(collectionRef, orderBy('Tiempo', 'desc'), limit(5));
    
        const unsubscribe = onSnapshot(orderedQuery, (snapshot) => {
          const fetchedData = snapshot.docs.map((doc) => doc.data());
          setData((prevData) => prevData.concat(fetchedData));
        });
    
        getDocs(orderedQuery)
          .then((querySnapshot) => {
            const fetchedData = querySnapshot.docs.map((doc) => doc.data());
            setData((prevData) => prevData.concat(fetchedData));
          })
          .catch((error) => {
            console.log('Error al obtener los documentos:', error);
          });
    
        return () => unsubscribe();
      }, []);

    /*useEffect(() => {
        const consulta = query(
          collection(db, 'Lecturas'),
          orderBy('Tiempo', 'desc'), // Ordena por el campo 'Tiempo' de forma descendente
          limit(5) // Limita la cantidad de documentos devueltos a 5
        );
      
        getDocs(consulta)
          .then((querySnapshot) => {
            const newData = []; // Nuevo arreglo para almacenar los datos
      
            querySnapshot.forEach((doc) => {
              const docData = doc.data();
              newData.push(docData); // Agregar los datos al nuevo arreglo
              //console.log(newData)
            });
      
            setData((prevData) => prevData.concat(newData)); // Fusionar los nuevos datos con los existentes en el estado
          })
          .catch((error) => {
            console.log('Error al obtener los documentos:', error);
          });
      }, []);*/

      console.log(data);

      const getOptions = () => {
        const processedData = data.map((item) => {
          const timestamp = item.Tiempo.seconds * 1000 + item.Tiempo.nanoseconds / 1000000;
          const latitude = parseFloat(item.latitude);
          const longitude = parseFloat(item.longitude);
          return { x: timestamp, y: latitude, longitude };
        });
    
        return {
          chart: {
            type: 'area',
          },
          title: {
            text: 'Datos de latitud y longitud a lo largo del tiempo',
          },
          xAxis: {
            type: 'datetime',
            title: {
              text: 'Tiempo',
            },
          },
          yAxis: {
            title: {
              text: 'Coordenadas',
            },
            min: 20.5, // Valor mínimo del eje y
            max: 22, // Valor máximo del eje y
          },
          series: [
            {
              name: 'Latitud',
              data: processedData,
              marker: {
                symbol: 'circle',
              },
            },
            {
              name: 'Longitud',
              data: processedData,
              marker: {
                symbol: 'diamond',
              },
            },
          ],
        };
      };
    
      return (
        <div>
          <HighchartsReact highcharts={Highcharts} options={getOptions()} />
        </div>
      );
    }
//       const getOptions = (data) => {
//         const processedData = data.map((item) => {
//           const timestamp = item.Tiempo.toDate().getTime();
//           const latitude = item.latitude;
//           return [timestamp, latitude];
//         });
//
//         return {
//           // Resto de las opciones del gráfico
//           series: [
//             {
//               type: 'area',
//               name: 'Monitoreo de Rutas',
//               data: processedData,
//             },
//           ],
//         };
//       };
//
//
//     return (
//         <div>
//           <HighchartsReact highcharts={Highcharts} options={getOptions(data)} />
//         </div>
//       );
// }


export default Graficas;