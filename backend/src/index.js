const express = require('express')
const connectDB = require('./database/db')


const bodyParser = require('body-parser')
const app = express();


const categoriaRoutes = require('./routes/categoria.routes')
const ordenRoutes = require('./routes/orden.routes')
const meseroRoutes = require('./routes/mesero.routes')
const clienteRoutes = require('./routes/cliente.routes')
const platoRoutes = require('./routes/plato.routes')
const cors = require('cors');

connectDB();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
  }));
  
app.use(express.static(__dirname))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))

app.use(categoriaRoutes)
app.use(ordenRoutes)
app.use(meseroRoutes)
app.use(clienteRoutes)
app.use(platoRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}, http://localhost:${PORT}`)
})
