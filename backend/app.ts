import express from 'express';

import config from './src/config';

import { errorHandler, notFound } from "./src/middleware";

const app = express();

app.use(express.json());

app.get('/', (req,res) => {
    res.send('Hello world!');
})

app.use(notFound);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Server listen on http://localhost:${config.port}`)
})