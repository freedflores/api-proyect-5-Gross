const db = require("../config/database");
const bcrypt = require("bcrypt");

// Crear usuario con PersonaID (relación con tabla personas)
exports.createUsuario = async (req, res) => {
  const { PersonaID, email, password, rol } = req.body;

  if (!PersonaID || !email || !password)
    return res.status(400).json({ error: "Todos los campos son obligatorios" });

  const userRole = rol ? rol : "cliente";

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO usuarios (PersonaID, email, password, rol)
      VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [PersonaID, email, hashedPassword, userRole], (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos", details: err });
      res.status(201).json({ message: "Usuario creado", id: result.insertId });
    });
  } catch (error) {
    res.status(500).json({ error: "Error al encriptar contraseña" });
  }
};

// Obtener todos los usuarios con el nombre de la persona
exports.getUsuarios = (_req, res) => {
  const sql = `
    SELECT u.id, p.nombre, u.email, u.rol
    FROM usuarios u
    JOIN personas p ON u.PersonaID = p.PersonaID
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos", details: err });
    res.status(200).json(results);
  });
};

// Obtener usuario por ID
exports.getUsuarioById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT u.id, p.nombre, u.email, u.rol
    FROM usuarios u
    JOIN personas p ON u.PersonaID = p.PersonaID
    WHERE u.id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos", details: err });
    if (results.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    res.status(200).json(results[0]);
  });
};

// Actualizar usuario (opcionalmente actualizar contraseña si se envía)
exports.updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { email, password, rol } = req.body;

  try {
    let sql = `UPDATE usuarios SET email = ?, rol = ?`;
    const params = [email, rol];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      sql += `, password = ?`;
      params.push(hashedPassword);
    }

    sql += ` WHERE id = ?`;
    params.push(id);

    db.query(sql, params, (err, result) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos", details: err });
      res.status(200).json({ message: "Usuario actualizado" });
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

// Eliminar usuario
exports.deleteUsuario = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM usuarios WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos", details: err });
    res.status(200).json({ message: "Usuario eliminado" });
  });
};
