const db = require("../config/database");

// Crear detalle de pedido
exports.createDetallePedido = (req, res) => {
  const { pedidoID, productoID, cantidad, precioUnitario, total } = req.body;
  if (!pedidoID || !productoID || !cantidad || !precioUnitario || !total)
    return res.status(400).json({ error: "Todos los campos son obligatorios" });

  db.query(
    "INSERT INTO DetallePedido (PedidoID, ProductoID, Cantidad, PrecioUnitario, Total) VALUES (?, ?, ?, ?, ?)",
    [pedidoID, productoID, cantidad, precioUnitario, total],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      res.status(201).json({ message: "Detalle de pedido creado", id: result.insertId });
    }
  );
};

// Obtener todos los detalles de pedidos (con Nombre del producto en vez de ProductoID)
exports.getDetallesPedidos = (req, res) => {
  db.query(
    `SELECT 
       dp.DetallePedidoID, 
       dp.PedidoID, 
       p.Nombre AS NombreProducto,
       dp.Cantidad, 
       dp.PrecioUnitario, 
       dp.Total 
     FROM DetallePedido dp 
     JOIN productos p ON dp.ProductoID = p.ProductoID`,
    (err, results) => {
      if (err) {
        console.error("Error en getDetallesPedidos:", err);
        return res.status(500).json({ error: "Error en la base de datos" });
      }
      res.status(200).json(results);
    }
  );
};

// Obtener detalle de pedido por ID (con Nombre del producto en vez de ProductoID)
exports.getDetallePedidoById = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT 
       dp.DetallePedidoID, 
       dp.PedidoID, 
       p.Nombre AS NombreProducto,
       dp.Cantidad, 
       dp.PrecioUnitario, 
       dp.Total 
     FROM DetallePedido dp 
     JOIN productos p ON dp.ProductoID = p.ProductoID 
     WHERE dp.DetallePedidoID = ?`,
    [id],
    (err, result) => {
      if (err) {
        console.error("Error en getDetallePedidoById:", err);
        return res.status(500).json({ error: "Error en la base de datos" });
      }
      if (result.length === 0) return res.status(404).json({ error: "Detalle de pedido no encontrado" });
      res.status(200).json(result[0]);
    }
  );
};

// Eliminar detalle de pedido
exports.deleteDetallePedido = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM DetallePedido WHERE DetallePedidoID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Detalle de pedido no encontrado" });
    res.status(200).json({ message: "Detalle de pedido eliminado" });
  });
};

// Actualizar detalle de pedido
exports.updateDetallePedido = (req, res) => {
  const { id } = req.params;
  const { pedidoID, productoID, cantidad, precioUnitario, total } = req.body;

  if (!pedidoID || !productoID || !cantidad || !precioUnitario || !total)
    return res.status(400).json({ error: "Todos los campos son obligatorios" });

  db.query(
    "UPDATE DetallePedido SET PedidoID = ?, ProductoID = ?, Cantidad = ?, PrecioUnitario = ?, Total = ? WHERE DetallePedidoID = ?",
    [pedidoID, productoID, cantidad, precioUnitario, total, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Detalle de pedido no encontrado" });

      res.status(200).json({ message: "Detalle de pedido actualizado" });
    }
  );
};
