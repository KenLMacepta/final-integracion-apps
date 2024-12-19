const MeseroModel = require('../models/meseroModel.js');
const jwtToken = require('jsonwebtoken');
const settings = require('../global/global');
const bcrypt = require('bcryptjs');

const crearMesero = async (req, res) => {
  try {
    const { nombre, correo, telefono, contraseña } = req.body;

    const contraseñaEncriptada = await bcryptUtil.hash(contraseña, 12);

    const meseroCreado = await MeseroModel.create({
      nombre,
      correo,
      telefono,
      contraseña: contraseñaEncriptada,
      activo: true,
    });

    res.status(201).send(meseroCreado);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const obtenerTodosMeseros = async (req, res) => {
  try {
    const meserosActivos = await MeseroModel.find({ activo: true });
    res.status(200).json({ message: "Meseros encontrados", data: meserosActivos });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const obtenerMesero = async (req, res) => {
  try {
    const { id } = req.params;
    const meseroEncontrado = await MeseroModel.findById(id);
    res.status(200).json({ message: "Mesero encontrado", data: meseroEncontrado });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const modificarMesero = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, telefono, contraseña } = req.body;

    let datosActualizar = { nombre, correo, telefono };

    if (contraseña) {
      datosActualizar.contraseña = await bcryptUtil.hash(contraseña, 12);
    }

    const meseroModificado = await MeseroModel.findByIdAndUpdate(
      id,
      datosActualizar,
      { new: true, runValidators: true }
    );

    res.status(200).send(meseroModificado);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const eliminarMesero = async (req, res) => {
  try {
    const { id } = req.params;

    const meseroDesactivado = await MeseroModel.findByIdAndUpdate(id, { activo: false });
    res.status(200).send(`Mesero eliminado correctamente: ${meseroDesactivado.nombre}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const mesero = await MeseroModel.findOne({ correo });
    if (!mesero) return res.status(400).json({ message: 'Credenciales inválidas' });

    const contraseñaValida = await mesero.validPassword(contraseña);

    console.log('Contraseña ingresada:', contraseña);
    console.log('Contraseña almacenada:', mesero.contraseña);

    if (!contraseñaValida) {
      return res.status(401).json({ auth: false, token: null });
    }

    const tokenGenerado = jwtToken.sign({ id: mesero._id }, settings.secret, {
      expiresIn: 60 * 60 * 24
    });

    res.json({ auth: true, token: tokenGenerado });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  crearMesero,
  obtenerTodosMeseros,
  modificarMesero,
  eliminarMesero,
  obtenerMesero,
  login
};
