const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/usuario", usuarioController.createUsuario);
router.get("/usuarios", verifyToken, usuarioController.getUsuarios);

module.exports = router;