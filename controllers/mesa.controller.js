const db = require("../config/database");

// Crear mesa
exports.createMesa = (req, res) => {
  const { NumeroMesa, Capacidad, Ubicacion, Estado } = req.body;

  // Verificar que 'NumeroMesa' y 'Capacidad' estén presentes en el body de la solicitud
  if (!NumeroMesa || !Capacidad) {
    return res.status(400).json({ message: "Faltan datos obligatorios: número y capacidad." });
  }

  const sql = "INSERT INTO mesas (NumeroMesa, Capacidad, Ubicacion, Estado) VALUES (?, ?, ?, ?)";
  db.query(sql, [NumeroMesa, Capacidad, Ubicacion, Estado], (err, result) => {
    if (err) {
      console.error("Error al insertar mesas:", err); // Mostrar el error real
      return res.status(500).json({ message: "Error al insertar la mesa en la base de datos" });
    }

    res.status(201).json({
      message: "Mesa creada",
      id: result.insertId,
      mesas: { NumeroMesa, Capacidad, Ubicacion, Estado }
    });
  });
};

// Obtener todas las mesas
exports.getMesas = (_req, res) => {
  db.query("SELECT * FROM mesas", (err, results) => {
    if (err) {
      console.error("Error al obtener mesas:", err);
      return res.status(500).json({ message: "Error al obtener las mesas" });
    }
    res.status(200).json(results);
  });
};

// Obtener mesa por ID
exports.getMesaById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM mesas WHERE MesaID = ?", [id], (err, results) => {
    if (err) {
      console.error("Error al obtener la mesas:", err);
      return res.status(500).json({ message: "Error en la base de datos" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Mesa no encontrada" });
    }

    res.status(200).json(results[0]);
  });
};

// Actualizar mesa
exports.updateMesa = (req, res) => {
  const { id } = req.params;
  const { NumeroMesa, Capacidad, Ubicacion, Estado } = req.body;

  if (!NumeroMesa || !Capacidad || !Ubicacion || !Estado) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  const sql = "UPDATE mesas SET NumeroMesa = ?, Capacidad = ?, Ubicacion = ?, Estado = ? WHERE MesaID = ?";
  db.query(sql, [NumeroMesa, Capacidad, Ubicacion, Estado, id], (err, result) => {
    if (err) {
      console.error("Error al actualizar mesa:", err);
      return res.status(500).json({ message: "Error al actualizar la mesa" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Mesa no encontrada" });
    }

    res.status(200).json({ message: "Mesa actualizada" });
  });
};

// Eliminar mesa
exports.deleteMesa = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM mesas WHERE MesaID = ?", [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar mesa:", err);
      return res.status(500).json({ message: "Error al eliminar la mesa" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Mesa no encontrada" });
    }

    res.status(200).json({ message: "Mesa eliminada" });
  });
};
