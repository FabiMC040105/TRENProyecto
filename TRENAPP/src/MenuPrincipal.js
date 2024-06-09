import React from 'react';

function MenuPrincipal({ navegarARutaTrenes }) {
  return (
    <div>
      <h2>Menú Principal</h2>
      <button onClick={navegarARutaTrenes}>Rutas de Tren </button>
      <br></br>
      <button>Agregar Rutas de Tren</button>  
      <br></br>
      <button>Comprar Tiquetes</button>  
      <br></br>
      <button>Reservaciones</button>  
    </div>
  );
}

export default MenuPrincipal;
