export function GetTrainRoutes() {
    return fetch('https://localhost:7154/api/Rutas')
        .then(response => response.json())
        .then(data => data);
}