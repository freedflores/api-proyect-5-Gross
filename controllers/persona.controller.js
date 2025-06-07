const db = require("../config/database");

// Crear persona
exports.createPersona = (req, res) => {
  const { nombre, dni, numero_telefono, cargo, fecha_ingreso } = req.body;
  if (!nombre) return res.status(400).json({ error: "El nombre es obligatorio" });

  db.query(
    "INSERT INTO Personas (Nombre, DNI, Numero_Telefono, Cargo, Fecha_Ingreso) VALUES (?, ?, ?, ?, ?)",
    [nombre, dni, numero_telefono, cargo, fecha_ingreso],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      res.status(201).json({ message: "Persona creada", id: result.insertId });
    }
  );
};

// Obtener todas las personas
exports.getPersonas = (req, res) => {
  db.query("SELECT * FROM Personas", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};

// Obtener persona por ID
exports.getPersonaById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM Personas WHERE PersonaID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.length === 0) return res.status(404).json({ error: "Persona no encontrada" });
    res.status(200).json(result[0]);
  });
};

// Eliminar persona
exports.deletePersona = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM Personas WHERE PersonaID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Persona no encontrada" });
    res.status(200).json({ message: "Persona eliminada" });
  });
};

// Actualizar persona
exports.updatePersona = (req, res) => {
  const { id } = req.params;
  const { nombre, dni, numero_telefono, cargo, fecha_ingreso } = req.body;

  if (!nombre) return res.status(400).json({ error: "El nombre es obligatorio" });

  db.query(
    "UPDATE Personas SET Nombre = ?, DNI = ?, Numero_Telefono = ?, Cargo = ?, Fecha_Ingreso = ? WHERE PersonaID = ?",
    [nombre, dni, numero_telefono, cargo, fecha_ingreso, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Persona no encontrada" });

      res.status(200).json({ message: "Persona actualizada" });
    }
  );
};
