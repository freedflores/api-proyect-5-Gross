const db = require("../config/database");

// Crear categoría
exports.createCategoria = (req, res) => {
  const { nombre, descripcion } = req.body;

  if (!nombre || nombre.trim() === "")
    return res.status(400).json({ error: "El nombre es obligatorio" });

  db.query(
    "INSERT INTO categorias (Nombre, Descripcion) VALUES (?, ?)",
    [nombre, descripcion],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      res.status(201).json({ message: "Categoría creada", id: result.insertId });
    }
  );
};

// Obtener todas las categorías
exports.getCategorias = (req, res) => {
  db.query("SELECT * FROM categorias", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};

// Obtener categoría por ID
exports.getCategoriaById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM categorias WHERE CategoriaID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.length === 0) return res.status(404).json({ error: "Categoría no encontrada" });
    res.status(200).json(result[0]);
  });
};

// Eliminar categoría
exports.deleteCategoria = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM categorias WHERE CategoriaID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Categoría no encontrada" });
    res.status(200).json({ message: "Categoría eliminada" });
  });
};

// Actualizar categoría
exports.updateCategoria = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  if (!nombre || nombre.trim() === "")
    return res.status(400).json({ error: "El nombre es obligatorio" });

  db.query(
    "UPDATE categorias SET Nombre = ?, Descripcion = ? WHERE CategoriaID = ?",
    [nombre, descripcion, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Categoría no encontrada" });

      res.status(200).json({ message: "Categoría actualizada" });
    }
  );
};
