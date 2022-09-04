import {tickerChange as getTickerInfo, tickers, searchCache} from "./getTicker.js";
import express from 'express';
import cors from 'cors'

const app = express();
app.use(cors());

const port = process.env.PORT ||3000;

app.get('/', (req, res) => {
    res.json({
        message: 'Scrapping is fun!'
    })
})

app.get('/ticker/:ticker', (req, res) => {
    getTickerInfo(req.params.ticker)
        .then((tic) => {
            console.log(res);
            return res.json(tic)
        })
})



app.listen(port, () => {
    console.log(`Listening on ${port}`);
})

