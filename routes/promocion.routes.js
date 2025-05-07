const express = require("express");
const router = express.Router();
const promocionController = require("../controllers/promocion.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

// Rutas para promociones
router.post("/promociones", promocionController.createPromocion);
router.get("/promociones", promocionController.getPromociones);
router.get("/promociones/:id", promocionController.getPromocionById);
router.put("/promociones/:id", promocionController.updatePromocion);
router.delete("/promociones/:id", promocionController.deletePromocion);

module.exports = router;
