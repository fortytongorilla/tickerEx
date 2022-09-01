import {tickerChange as getTickerInfo, tickers, searchCache} from "./getTicker.js"
import express from 'express'

const app = express();

const port = process.env.PORT ||3000;  

app.get('/', (req, res) => {
    res.json({
        message: 'Scrapping is fun!'
    })
})

app.get('/ticker/:ticker', (req, res) => {
    getTickerInfo(req.params.ticker)
        .then((tic) => res.json(tic))
})



app.listen(port, () => {
    console.log(`Listening on ${port}`);
})

