const db = require("../config/database");

// Crear promoción
exports.createPromocion = (req, res) => {
  const { nombre, descripcion, descuento, fecha_inicio, fecha_fin } = req.body;

  if (!nombre || nombre.trim() === "")
    return res.status(400).json({ error: "El nombre es obligatorio" });

  if (descuento === undefined || isNaN(descuento) || descuento < 0)
    return res.status(400).json({ error: "El descuento debe ser un número positivo" });

  // Validar las fechas
  const fechaInicio = new Date(fecha_inicio);
  const fechaFin = new Date(fecha_fin);

  if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
    return res.status(400).json({ error: "Fechas inválidas" });
  }

  if (fechaInicio >= fechaFin) {
    return res.status(400).json({ error: "La fecha de inicio no puede ser mayor o igual a la fecha de fin" });
  }

  db.query(
    "INSERT INTO promociones (Nombre, Descripcion, Descuento, Fecha_Inicio, Fecha_Fin) VALUES (?, ?, ?, ?, ?)",
    [nombre, descripcion, descuento, fecha_inicio, fecha_fin],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      res.status(201).json({ message: "Promoción creada", id: result.insertId });
    }
  );
};

// Obtener todas las promociones
exports.getPromociones = (req, res) => {
  db.query("SELECT * FROM promociones", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};

// Obtener promoción por ID
exports.getPromocionById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM promociones WHERE PromocionID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.length === 0) return res.status(404).json({ error: "Promoción no encontrada" });
    res.status(200).json(result[0]);
  });
};

// Eliminar promoción
exports.deletePromocion = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM promociones WHERE PromocionID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Promoción no encontrada" });
    res.status(200).json({ message: "Promoción eliminada" });
  });
};

// Actualizar promoción
exports.updatePromocion = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, descuento, fecha_inicio, fecha_fin } = req.body;

  if (!nombre || nombre.trim() === "")
    return res.status(400).json({ error: "El nombre es obligatorio" });

  if (descuento === undefined || isNaN(descuento) || descuento < 0)
    return res.status(400).json({ error: "El descuento debe ser un número positivo" });

  // Validar las fechas
  const fechaInicio = new Date(fecha_inicio);
  const fechaFin = new Date(fecha_fin);

  if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
    return res.status(400).json({ error: "Fechas inválidas" });
  }

  if (fechaInicio >= fechaFin) {
    return res.status(400).json({ error: "La fecha de inicio no puede ser mayor o igual a la fecha de fin" });
  }

  db.query(
    "UPDATE promociones SET Nombre = ?, Descripcion = ?, Descuento = ?, Fecha_Inicio = ?, Fecha_Fin = ? WHERE PromocionID = ?",
    [nombre, descripcion, descuento, fecha_inicio, fecha_fin, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Promoción no encontrada" });

      res.status(200).json({ message: "Promoción actualizada" });
    }
  );
};
