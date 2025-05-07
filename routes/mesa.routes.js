const express = require("express");
const router = express.Router();
const mesaController = require("../controllers/mesa.controller");


router.post("/mesas", mesaController.createMesa);
router.get("/mesas", mesaController.getMesas);
router.get("/mesas/:id", mesaController.getMesaById);
router.put("/mesas/:id", mesaController.updateMesa);
router.delete("/mesas/:id", mesaController.deleteMesa);

module.exports = router;
