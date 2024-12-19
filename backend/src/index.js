const express = require('express');
const connectDB = require('./database/db');
const MeseroModel = require('./models/meseroModel.js');
const bcrypt = require('bcryptjs');  // Asegúrate de importar bcryptjs aquí

const bodyParser = require('body-parser');
const app = express();

const categoriaRoutes = require('./routes/categoria.routes');
const ordenRoutes = require('./routes/orden.routes');
const meseroRoutes = require('./routes/mesero.routes');
const clienteRoutes = require('./routes/cliente.routes');
const platoRoutes = require('./routes/plato.routes');
const cors = require('cors');

connectDB();

app.use(cors({
  origin: 'http://localhost:4200', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.static(__dirname));
app.use(bodyParser.json({ limit: '150mb' }));
app.use(bodyParser.urlencoded({ limit: '150mb', extended: true }));
app.use(express.json());  

// Verificar si existen meseros y agregar uno de prueba si no
const crearMeseroDePrueba = async () => {
  try {
    const meseros = await MeseroModel.find();
    if (meseros.length === 0) {
      // Si no hay meseros, agregar uno de prueba
      const contraseñaEncriptada = await bcrypt.hash('123', 12);  // Usa bcrypt aquí
      await MeseroModel.create({
        nombre: 'test',
        correo: 'test@correo.com',
        telefono: '123456789',
        contraseña: contraseñaEncriptada,
        activo: true,
      });
      console.log('Mesero de prueba creado');
    }
  } catch (error) {
    console.error('Error al crear mesero de prueba:', error.message);
  }
};

// Ejecutar la función de creación de mesero de prueba al iniciar el servidor
crearMeseroDePrueba();

app.use(categoriaRoutes);
app.use(ordenRoutes);
app.use(meseroRoutes);
app.use(clienteRoutes);
app.use(platoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, http://localhost:${PORT}`);
});
