const express = require('express');
const { getPlatos, addPlato, updatePlato, deletePlato, getPlato } = require('../controllers/plato');

const router = express.Router();

router.get("/api/plato/:id", getPlato);
router.get("/api/platos", getPlatos);
router.post("/api/addPlato", addPlato);
router.put("/api/updatePlato/:id", updatePlato);
router.delete("/api/deletePlato/:id", deletePlato);

module.exports = router;
