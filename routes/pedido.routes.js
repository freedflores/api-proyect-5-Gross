const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedido.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/pedidos", pedidoController.createPedido);
router.get("/pedidos", pedidoController.getPedidos);
router.get("/pedidos/:id", pedidoController.getPedidoById);
router.put("/pedidos/:id", pedidoController.updatePedido);
router.delete("/pedidos/:id", pedidoController.deletePedido);

module.exports = router;
