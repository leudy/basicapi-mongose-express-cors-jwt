const express = require('express')
require('dotenv').config()
const { dbconnect } = require('./database/config')

// crea el servidor express
const app = express();
dbconnect()
app.use(express.static('/public'));
app.use(express.json())
//rutas
// auth
app.use('/api/auth', require('./routes/Auth'))

app.use('/api/products', (req, resp) => {
    resp.json({ ok: true, msg: 'ruta de producto en construction' })
})
app.use('/api/customers', (req, resp) => {
    resp.json({ ok: true, msg: 'ruta de producto en construction' })
})
app.use('/api/finder', (req, resp) => {
    resp.json({ ok: true, msg: 'ruta de busqueda en construction' })
})
app.use('/api/favorites', (req, resp) => {
    resp.json({ ok: true, msg: 'ruta de busqueda en construction' })
})


let port = process.env.PORT;
app.listen(port, () => { console.log('servidor backend runnnig on port ' + process.env.PORT) })