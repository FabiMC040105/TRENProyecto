import React, { useState } from 'react';
import { estaciones } from './GraphComponent';

function ModificarRutas({ rutas, agregarRuta, eliminarRuta, modificarRuta, volverAlmenu }) {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAgregar = () => {
    if (origen && destino) {
      agregarRuta({ origen, destino });
      setOrigen('');
      setDestino('');
    }
  };

  const handleEliminar = (index) => {
    eliminarRuta(index);
  };

  const handleModificar = (index) => {
    setEditIndex(index);
    setOrigen(rutas[index].origen);
    setDestino(rutas[index].destino);
  };

  const handleGuardarModificacion = () => {
    modificarRuta(editIndex, { origen, destino });
    setEditIndex(null);
    setOrigen('');
    setDestino('');
  };

  return (
    <div>
      <h2>Modificar Rutas</h2>
      <div>
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
        {editIndex !== null ? (
          <button onClick={handleGuardarModificacion}>Guardar Modificación</button>
        ) : (
          <button onClick={handleAgregar}>Agregar Ruta</button>
        )}
      </div>
      <h3>Rutas Existentes</h3>
      <ul>
        {rutas.map((ruta, index) => (
          <li key={index}>
            {ruta.origen} - {ruta.destino}
            <button onClick={() => handleModificar(index)}>Modificar</button>
            <button onClick={() => handleEliminar(index)}>Eliminar</button>
            </li>
        ))}
      </ul>
      <button onClick={volverAlmenu}>Volver al Menú Principal</button>
    </div>
  );
}

export default ModificarRutas;
