import React, { useState, useEffect } from 'react';
import { estaciones } from './GraphComponent';

function Reservaciones() {
    const [reservas, setReservas] = useState([]);
  
    const mostrarReserva = async () => {
      try {
        const response = await fetch('https://localhost:7154/api/Rutas/reservations', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setReservas(data);
        } else {
          console.error('Error al obtener las reservas:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    useEffect(() => {
      mostrarReserva();
    }, []);
  
    return (
      <div>
        <h2>Reservaciones</h2>
        <table>
          <thead>
            <tr>
              <th>Origen</th>
              <th>Destino</th>
              <th>Fecha</th>
              <th>Cantidad</th>
              <th>Ruta</th>
              <th>Costo</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva, index) => (
              <tr key={index}>
                <td>{reserva.origen}</td>
                <td>{reserva.destino}</td>
                <td>{reserva.fecha}</td>
                <td>{reserva.cantidad}</td>
                <td>{reserva.ruta}</td>
                <td>{reserva.costo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Reservaciones;


