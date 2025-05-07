const db = require("../config/database");

// Crear producto
exports.createProducto = (req, res) => {
  const { categoriaID, nombre, descripcion, precio } = req.body;

  if (!nombre || nombre.trim() === "")
    return res.status(400).json({ error: "El nombre es obligatorio" });

  if (!categoriaID || isNaN(categoriaID))
    return res.status(400).json({ error: "La categoría es obligatoria y debe ser un número" });

  if (precio === undefined || isNaN(precio) || precio < 0)
    return res.status(400).json({ error: "El precio debe ser un número positivo" });

  db.query(
    "INSERT INTO productos (CategoriaID, Nombre, Descripcion, Precio) VALUES (?, ?, ?, ?)",
    [categoriaID, nombre, descripcion, precio],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      res.status(201).json({ message: "Producto creado", id: result.insertId });
    }
  );
};

// Obtener todos los productos
exports.getProductos = (req, res) => {
  db.query("SELECT * FROM productos", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};

// Obtener producto por ID
exports.getProductoById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM productos WHERE ProductoID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.length === 0) return res.status(404).json({ error: "Producto no encontrado" });
    res.status(200).json(result[0]);
  });
};

// Eliminar producto
exports.deleteProducto = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM productos WHERE ProductoID = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Producto no encontrado" });
    res.status(200).json({ message: "Producto eliminado" });
  });
};

// Actualizar producto
exports.updateProducto = (req, res) => {
  const { id } = req.params;
  const { categoriaID, nombre, descripcion, precio } = req.body;

  if (!nombre || nombre.trim() === "")
    return res.status(400).json({ error: "El nombre es obligatorio" });

  if (!categoriaID || isNaN(categoriaID))
    return res.status(400).json({ error: "La categoría es obligatoria y debe ser un número" });

  if (precio === undefined || isNaN(precio) || precio < 0)
    return res.status(400).json({ error: "El precio debe ser un número positivo" });

  db.query(
    "UPDATE productos SET CategoriaID = ?, Nombre = ?, Descripcion = ?, Precio = ? WHERE ProductoID = ?",
    [categoriaID, nombre, descripcion, precio, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Producto no encontrado" });

      res.status(200).json({ message: "Producto actualizado" });
    }
  );
};
