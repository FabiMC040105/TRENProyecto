import './App.css';


function Login(){
    return(
        <div className= "App">
                <label> Ingresa tu usuario </label>
                <br></br>
                <br></br>
                <label>Usuario:</label><input type='text'></input>
                <br></br>
                <label>Contraseña:</label><input type='text'></input>

        </div>
    );
}

export default Login;