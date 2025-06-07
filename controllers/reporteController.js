const db = require("../config/database");

exports.getReporteVentas = (req, res) => {
  const sql = `
    SELECT 
      p.FechaPedido AS fecha,
      p.PedidoID AS numero_pedido,
      c.Nombre AS cliente,
      p.TipoEntrega AS tipo_entrega,
      p.Total AS total,
      p.Estado AS estado
    FROM pedidos p
    INNER JOIN clientes c ON p.ClienteID = c.ClienteID
    ORDER BY p.FechaPedido DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener reporte de ventas:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.status(200).json({ ventas: results });
  });
};
