export class ParkingClient {
    async getSpacesData() {
        const rawResponse = await fetch("http://localhost/api/spaces");
        const parsedResponse = await rawResponse.json();
        console.log(parsedResponse)
        return parsedResponse;
    }
    
    async getStarWarsData() {
        const rawResponse = await fetch("https://swapi.dev/api/people");
        const parsedResponse = await rawResponse.json();
        return parsedResponse.results;
    }
    async postSpace(detalle) {
        const rawResponse = await fetch("https://localhost/api/spaces",{method:'POST', body:JSON.stringify({'detalle':detalle}),headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
    }
}