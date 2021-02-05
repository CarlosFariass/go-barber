import express from "express";
import routes from './routes';

const app = express();

app.get('/', (request, response) => {
    return response.json({ message: 'Opa',});
})

app.listen(3333, () => {
    console.log("Server open ma friend!")
})
