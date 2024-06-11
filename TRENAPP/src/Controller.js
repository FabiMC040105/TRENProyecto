export function GetTrainRoutes() {
    return fetch('https://localhost:7154/api/routes')
        .then(response => response.json())
        .then(data => data);
}