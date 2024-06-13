import logo from './favicon.png';
import Registro from './Registro';
import Login from './Login';
import MenuPrincipal from './MenuPrincipal';
import GraphComponent from './GraphComponent';
import grafo from './GraphComponent';
import RutaTrenes from './RutaTrenes';
import ComprarTiquetes from './ComprarTiquetes';
import React, { useEffect, useState } from 'react';
import { GetTrainRoutes } from './Controller';

function App() {
  const [view, setView] = useState('home'); 
  const [estaciones, setEstaciones] = useState([]); 
  const [conexion, setConexiones] = useState([]);
  
  const [routes, setRoutes] = useState([]);
  const [currentTime, setCurrentTime] = useState(Date().toLocaleString());

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

  function VolverAHome() {
    setView('home');
  }

  function VolverAMenuPrincipal() {
    setView('menuPrincipal');
  }

  function postData(){
    
  }



  return (
    <div className="App">
      <header className="App-header">
      {currentTime}
      <table>
        <thead>
          <tr>
            <th>Start</th>
            <th>End</th>
            <th>Cost</th>
            <th>Distance</th>
          </tr>
        </thead>
      {routes.map((element, index) => 
        <tr id={index}>
          <td>{element.start}</td>
          <td>{element.end}</td>
          <td>{element.cost}</td>
          <td>{element.distanceInKm}</td>
        </tr>
      )}    
      </table>  
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
