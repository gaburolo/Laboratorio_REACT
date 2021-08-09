export class StarWarsClient {
    async getStarWarsData() {
        const rawResponse = await fetch("http://localhost/api/spaces");
        const parsedResponse = await rawResponse.json();
        console.log(parsedResponse)
        return parsedResponse;
    }
}