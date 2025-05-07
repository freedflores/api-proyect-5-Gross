const db = require("../config/database");
const bcrypt = require("bcrypt");

exports.createUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) return res.status(400).json({ error: "Todos los campos son obligatorios" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
  
  db.query(sql, [nombre, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(201).json({ message: "Usuario creado", id: result.insertId });
  });
};

exports.getUsuarios = (_req, res) => {
  db.query("SELECT id, nombre, email FROM usuarios", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.status(200).json(results);
  });
};