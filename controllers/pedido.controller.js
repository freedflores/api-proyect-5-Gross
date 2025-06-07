const db = require("../config/database");

// Crear pedido
exports.createPedido = (req, res) => {
  const { ClienteID, FechaPedido, Total, Estado, TipoEntrega, DireccionEntrega, TelefonoContacto } = req.body;

  if (!ClienteID || isNaN(ClienteID))
    return res.status(400).json({ error: "El ClienteID es obligatorio y debe ser un número" });

  if (!FechaPedido || !Date.parse(FechaPedido))
    return res.status(400).json({ error: "La FechaPedido es obligatoria y debe ser una fecha válida" });

  if (Total === undefined || isNaN(Total) || Total < 0)
    return res.status(400).json({ error: "El Total debe ser un número positivo" });

  if (!Estado || Estado.trim() === "")
    return res.status(400).json({ error: "El Estado es obligatorio" });

  if (!TipoEntrega || TipoEntrega.trim() === "")
    return res.status(400).json({ error: "El TipoEntrega es obligatorio" });

  if (!DireccionEntrega || DireccionEntrega.trim() === "")
    return res.status(400).json({ error: "La DireccionEntrega es obligatoria" });

  if (!TelefonoContacto || TelefonoContacto.trim() === "")
    return res.status(400).json({ error: "El TelefonoContacto es obligatorio" });

  db.query(
    "INSERT INTO pedidos (ClienteID, FechaPedido, Total, Estado, TipoEntrega, DireccionEntrega, TelefonoContacto) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [ClienteID, FechaPedido, Total, Estado, TipoEntrega, DireccionEntrega, TelefonoContacto],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      res.status(201).json({ message: "Pedido creado", id: result.insertId });
    }
  );
};

// Obtener todos los pedidos con nombre del cliente
exports.getPedidos = (req, res) => {
  const sql = `
    SELECT 
      pedidos.PedidoID,
      pedidos.FechaPedido,
      pedidos.Total,
      pedidos.Estado,
      pedidos.TipoEntrega,
      pedidos.DireccionEntrega,
      pedidos.TelefonoContacto,
      pedidos.ClienteID,
      clientes.Nombre AS NombreCliente
    FROM pedidos
    INNER JOIN clientes ON pedidos.ClienteID = clientes.ClienteID
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};

// Obtener pedido por ID con nombre del cliente
exports.getPedidoById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      pedidos.PedidoID,
      pedidos.FechaPedido,
      pedidos.Total,
      pedidos.Estado,
      pedidos.TipoEntrega,
      pedidos.DireccionEntrega,
      pedidos.TelefonoContacto,
      pedidos.ClienteID,
      clientes.Nombre AS NombreCliente
    FROM pedidos
    INNER JOIN clientes ON pedidos.ClienteID = clientes.ClienteID
    WHERE pedidos.PedidoID = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.length === 0) return res.status(404).json({ error: "Pedido no encontrado" });
    res.status(200).json(result[0]);
  });
};

// Eliminar pedido
exports.deletePedido = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM pedidos WHERE PedidoID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Pedido no encontrado" });
    res.status(200).json({ message: "Pedido eliminado" });
  });
};

// Actualizar pedido
exports.updatePedido = (req, res) => {
  const { id } = req.params;
  const { ClienteID, FechaPedido, Total, Estado, TipoEntrega, DireccionEntrega, TelefonoContacto } = req.body;

  if (!ClienteID || isNaN(ClienteID))
    return res.status(400).json({ error: "El ClienteID es obligatorio y debe ser un número" });

  if (!FechaPedido || !Date.parse(FechaPedido))
    return res.status(400).json({ error: "La FechaPedido es obligatoria y debe ser una fecha válida" });

  if (Total === undefined || isNaN(Total) || Total < 0)
    return res.status(400).json({ error: "El Total debe ser un número positivo" });

  if (!Estado || Estado.trim() === "")
    return res.status(400).json({ error: "El Estado es obligatorio" });

  if (!TipoEntrega || TipoEntrega.trim() === "")
    return res.status(400).json({ error: "El TipoEntrega es obligatorio" });

  if (!DireccionEntrega || DireccionEntrega.trim() === "")
    return res.status(400).json({ error: "La DireccionEntrega es obligatoria" });

  if (!TelefonoContacto || TelefonoContacto.trim() === "")
    return res.status(400).json({ error: "El TelefonoContacto es obligatorio" });

  db.query(
    "UPDATE pedidos SET ClienteID = ?, FechaPedido = ?, Total = ?, Estado = ?, TipoEntrega = ?, DireccionEntrega = ?, TelefonoContacto = ? WHERE PedidoID = ?",
    [ClienteID, FechaPedido, Total, Estado, TipoEntrega, DireccionEntrega, TelefonoContacto, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Pedido no encontrado" });

      res.status(200).json({ message: "Pedido actualizado" });
    }
  );
};
