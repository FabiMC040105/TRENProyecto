import React, { useState, useEffect } from 'react';
import { estaciones } from './GraphComponent';

function ComprarTiquetes() {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fecha, setFecha] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [precioBase, setPrecioBase] = useState(100); // Precio base por tiquete
  const [precioTotal, setPrecioTotal] = useState(0);

  useEffect(() => {
    calcularPrecioTotal();
  }, [cantidad]);

  const calcularPrecioTotal = () => {
    let descuento = 0.02 * (cantidad - 1);
    if (descuento > 0.9) descuento = 0.9;
    const total = cantidad * precioBase * (1 - descuento);
    setPrecioTotal(total);
  };

  const handleCompra = async () => {
    try {
        const response = await fetch('https://localhost:7154/api/Rutas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ origen, destino, fecha, cantidad }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(`Compra realizada con éxito. Precio total: ${data.precioTotal} colones. Ruta: ${data.ruta}. Distancia: ${data.distancia}`);
        } else {
            const errorText = await response.text(); // Obtener el texto del error
            alert(`Error al realizar la compra: ${errorText}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al realizar la compra');
    }
  };

  return (
    <div>
      <h2>Comprar Tiquetes</h2>
      <form>
        <label>
          Origen:
          <select value={origen} onChange={(e) => setOrigen(e.target.value)}>
            <option value="">Seleccione una estación</option>
            {estaciones.map((estacion) => (
              <option key={estacion.id} value={estacion.id}>
                {estacion.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Destino:
          <select value={destino} onChange={(e) => setDestino(e.target.value)}>
            <option value="">Seleccione una estación</option>
            {estaciones.map((estacion) => (
              <option key={estacion.id} value={estacion.id}>
                {estacion.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Fecha:
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </label>
        <br />
        <label>
          Cantidad:
          <input type="number" value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))} min="1" />
        </label>
        <br />
        <button type="button" onClick={handleCompra}>Comprar</button>
      </form>
      <p>Precio total: {precioTotal.toFixed(2)} colones</p>
    </div>
  );
}

export default ComprarTiquetes;


