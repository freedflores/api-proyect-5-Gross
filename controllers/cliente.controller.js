const db = require("../config/database");

// Crear cliente
exports.createCliente = (req, res) => {
  const { nombre, email, telefono, fechaRegistro, direccion } = req.body;
  if (!nombre) return res.status(400).json({ error: "El nombre es obligatorio" });

  db.query(
    "INSERT INTO Clientes (Nombre, Email, Telefono, FechaRegistro, Direccion) VALUES (?, ?, ?, ?, ?)",
    [nombre, email, telefono, fechaRegistro, direccion],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      res.status(201).json({ message: "Cliente creado", id: result.insertId });
    }
  );
};

// Obtener todos los clientes
exports.getClientes = (req, res) => {
  db.query("SELECT * FROM Clientes", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};

// Obtener cliente por ID
exports.getClienteById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM Clientes WHERE ClienteID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.length === 0) return res.status(404).json({ error: "Cliente no encontrado" });
    res.status(200).json(result[0]);
  });
};

// Eliminar cliente
exports.deleteCliente = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM Clientes WHERE ClienteID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Cliente no encontrado" });
    res.status(200).json({ message: "Cliente eliminado" });
  });
};

// Actualizar cliente
exports.updateCliente = (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, fechaRegistro, direccion } = req.body;

  if (!nombre) return res.status(400).json({ error: "El nombre es obligatorio" });

  db.query(
    "UPDATE Clientes SET Nombre = ?, Email = ?, Telefono = ?, FechaRegistro = ?, Direccion = ? WHERE ClienteID = ?",
    [nombre, email, telefono, fechaRegistro, direccion, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Cliente no encontrado" });

      res.status(200).json({ message: "Cliente actualizado" });
    }
  );
};
