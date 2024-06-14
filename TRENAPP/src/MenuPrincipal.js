import React from 'react';

function MenuPrincipal({ navegarARutaTrenes,  navegarAComprarTiquetes, navegarAReservaciones, navegarAModificarRutas }) {
  return (
    <div>
      <h2>Menú Principal</h2>
      <button onClick={navegarARutaTrenes}>Rutas de Tren </button>
      <br></br>
      <button onClick={navegarAModificarRutas} >Agregar Rutas de Tren</button>  
      <br></br>
      <button  onClick={navegarAComprarTiquetes} >Comprar Tiquetes</button>  
      <br></br>
      <button onClick={navegarAReservaciones}>Reservaciones</button>  
    </div>
  );
}

export default MenuPrincipal;
