import express from 'express';
const product = require("./api/product")

const app = express();
const PORT = process.env.PORT || 5050;

app.use("/api/product", product); 

app.listen(PORT, () => console.log(`Server runiing on port ${PORT}`));



