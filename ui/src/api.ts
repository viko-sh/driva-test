export class Api {
    async submitInformation(data: any) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        return fetch('http://localhost:8080/quote', requestOptions)
            .then(response => response.json())
    }
}