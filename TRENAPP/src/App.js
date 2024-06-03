import logo from './favicon.png';
import {useState} from 'react';
import Registro from './Registro';
import './App.css';

function App() {
  const [isShown, setIsShown] = useState(false);
  

  function NavegaRegistro(){    
    setIsShown(current => !current);  
  }

  function NavegaLogin(){
    alert('Hola Login')
  }

  
  function RegistroUsuario(){
    alert('Usuario Registrado')
    setIsShown(current => !current);  
  }

  return (
    <div className="App">
      <header className="App-header">
      {!isShown && (
          <div>
        <img src={logo} className="App-logo" alt="logo" />
        
        
        <p>
          Bienvenidos a TREN
        </p>
        
        <br></br>
        <button onClick={NavegaRegistro}>Registrarme</button>
        <button onClick={NavegaLogin}>Iniciar Sesion</button>
        </div>
       )}
        

        {isShown && (
        <div>
          <br></br>
            <Registro></Registro>
            <button onClick={RegistroUsuario}>Registrar Usuario</button>
            <br></br>
            <button onClick={NavegaRegistro}>Volver</button>
        </div>
       )}

      </header>
    </div>
  );
}

export default App;
