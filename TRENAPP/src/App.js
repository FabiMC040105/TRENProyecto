import logo from './favicon.png';
import Registro from './Registro';
import Login from './Login';
import MenuPrincipal from './MenuPrincipal';
import GraphComponent from './GraphComponent';
import grafo from './GraphComponent';
import RutaTrenes from './RutaTrenes';
import ComprarTiquetes from './ComprarTiquetes';
import Reservaciones from './Reservaciones';
import React, { useEffect, useState } from 'react';
import ModificarRutas from './ModificarRutas';
import { GetTrainRoutes } from './Controller';

function App() {
  const [view, setView] = useState('home'); 
  const [estaciones, setEstaciones] = useState([]); 
  const [conexion, setConexiones] = useState([]);
  
  const [routes, setRoutes] = useState([]);
  const [currentTime, setCurrentTime] = useState(Date().toLocaleString());
  const [rutas, setRutas] = useState([
    // poner las rutas 
  ]);

  useEffect(() => {
    async function loadData() {
      let routes = await GetTrainRoutes();
      setRoutes(routes);
    }

    setInterval(() => {
      setCurrentTime(Date().toLocaleString());
    }, 1000)

    setInterval(() => {
      loadData();
    }, 5000)
  }, []);

  function NavegaRegistro() {
    setView('registro');
  }

  function NavegaLogin() {
    setView('login');
  }

  function RegistroUsuario() {
    alert('Usuario Registrado');
    setView('home');
  }

  function IngresaUsuario() {
    setView('menuPrincipal');

  }

  function NavegarARutaTrenes() {
    setView('RutaTrenes');
  }

  function NavegarAComprarTiquetes() {
    setView('comprarTiquetes');
    //
    //
  }

  function NavegarAReservaciones() {
    setView('Reservaciones');
    
  }

  function VolverAHome() {
    setView('home');
  }

  function VolverAMenuPrincipal() {
    setView('menuPrincipal');
  }

  function postData(){
    
  }

  const agregarRuta = (nuevaRuta) => {
    setRutas([...rutas, nuevaRuta]);
  };

  const eliminarRuta = (index) => {
    const nuevasRutas = [...rutas];
    nuevasRutas.splice(index, 1);
    setRutas(nuevasRutas);
  };

  const modificarRuta = (index, rutaModificada) => {
    const nuevasRutas = [...rutas];
    nuevasRutas[index] = rutaModificada;
    setRutas(nuevasRutas);
  };

  function NavegarAModificarRutas() {
    setView('modificarRutas');
  }





  return (
    <div className="App">
      <header className="App-header">
      {currentTime}
      {view === 'home' && (
        <div>
          <img src={logo} className="App-logo" alt="logo" />
          <p>Bienvenidos a TREN</p>
          <br />
          <button onClick={NavegaRegistro}>Registrarme</button>
          <button onClick={NavegaLogin}>Iniciar Sesion</button>
        </div>
      )}
      {view === 'registro' && (
        <div>
          <button onClick={postData}>Enviar Datos</button>
          <br />
          <Registro />
          <button onClick={RegistroUsuario}>Registrar Usuario</button>
          <br />
          <button onClick={VolverAHome}>Volver</button>
        </div>
      )}

      {view === 'login' && (
        <div>
          <br />
          <Login />
          <button onClick={IngresaUsuario}>Ingresar Usuario</button>
          <br />
          <button onClick={VolverAHome}>Volver</button>
        </div>
      )}

      {view === 'menuPrincipal' && (
        <MenuPrincipal 
        navegarARutaTrenes={NavegarARutaTrenes} 
        navegarAComprarTiquetes={NavegarAComprarTiquetes}
        navegarAReservaciones={NavegarAReservaciones}
        navegarAModificarRutas={NavegarAModificarRutas} // Nueva función de navegación

        />
      )}

      {view === 'RutaTrenes' && (
        <div style={{ width: '100vw', height: '100vh', margin: '0 auto', border: '1px solid black', position: 'relative' }}>
          <GraphComponent estaciones={estaciones} conexion={conexion} />
          <RutaTrenes />
          <button 
            onClick={VolverAMenuPrincipal}>Volver al Menú Principal
          </button>
        </div>
      )}

      {view === 'comprarTiquetes' && (
        <div>
          <ComprarTiquetes />
          <button onClick={VolverAMenuPrincipal}>Volver al Menú Principal</button>
        </div>
      )}
      {view === 'Reservaciones' && (
        <div>
          <Reservaciones />
          <button onClick={VolverAMenuPrincipal}>Volver al Menú Principal</button>
        </div>
      )}
      {view === 'modificarRutas' && (
          <ModificarRutas
            rutas={rutas}
            agregarRuta={agregarRuta}
            eliminarRuta={eliminarRuta}
            modificarRuta={modificarRuta}
            volverAlmenu={VolverAMenuPrincipal}
          />
        )}
      </header>
    </div>
  );
}


export default App;
