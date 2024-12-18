const express = require('express')
const { crearMesero, obtenerTodosMeseros, modificarMesero, eliminarMesero, login, obtenerMesero } = require('../controllers/mesero')

const router = express.Router()

router.post("/api/mesero", crearMesero)
router.get("/api/meseros", obtenerTodosMeseros)
router.get("/api/mesero/:id", obtenerMesero)
router.put("/api/mesero/:id", modificarMesero)
router.delete("/api/mesero/:id", eliminarMesero)
router.post("/api/auth", login)

module.exports = router;
