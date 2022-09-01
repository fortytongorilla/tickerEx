import express from 'express';
const product = require("./api/product");
import {tickerChange as getTickerInfo, tickers, searchCache} from "./getTicker.js"

const app = express();
const PORT = process.env.PORT || 5050;

app.use("/api/product", product); 

app.listen(PORT, () => console.log(`Server runiing on port ${PORT}`));



