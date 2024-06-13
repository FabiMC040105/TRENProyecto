import logo from './favicon.png';
import { useState } from 'react';
import Registro from './Registro';
import Login from './Login';
import MenuPrincipal from './MenuPrincipal';
import GraphComponent from './GraphComponent'; 
import RutaTrenes from './RutaTrenes';
import ComprarTiquetes from './ComprarTiquetes';

function App() {
  const [view, setView] = useState('home'); 
  const [estaciones, setEstaciones] = useState([]); 
  const [conexion, setConexiones] = useState([]);

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
  }

  function VolverAHome() {
    setView('home');
  }

  function VolverAMenuPrincipal() {
    setView('menuPrincipal');
  }

  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
