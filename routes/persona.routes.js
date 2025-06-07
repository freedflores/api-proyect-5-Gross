const express = require("express");
const router = express.Router();
const personaController = require("../controllers/persona.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

// Rutas para persona
router.post("/personas", personaController.createPersona);
router.get("/personas", personaController.getPersonas);
router.get("/personas/:id", personaController.getPersonaById);
router.put("/personas/:id", personaController.updatePersona);
router.delete("/personas/:id", personaController.deletePersona);

module.exports = router;
