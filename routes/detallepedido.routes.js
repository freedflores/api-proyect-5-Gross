const express = require("express");
const router = express.Router();
const detallePedidoController = require("../controllers/detallepedido.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/detallePedido", detallePedidoController.createDetallePedido);
router.get("/detallePedido", detallePedidoController.getDetallesPedidos);
router.get("/detallePedido/:id", detallePedidoController.getDetallePedidoById);
router.put("/detallePedido/:id", detallePedidoController.updateDetallePedido);
router.delete("/detallePedido/:id", detallePedidoController.deleteDetallePedido);

module.exports = router;
