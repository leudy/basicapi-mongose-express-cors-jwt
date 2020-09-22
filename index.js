const express = require('express')
require('dotenv').config()

// crea el servidor express
const app = express();
app.use(express.static('/public'));
//rutas




let port = process.env.PORT;
app.listen(port, () => { console.log('servidor backend runnnig on port ' + process.env.PORT) })