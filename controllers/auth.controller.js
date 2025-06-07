const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) 
    return res.status(400).json({ error: "Todos los campos son obligatorios" });

  // 🔄 Consulta SQL que une usuarios con personas
  const sql = `
    SELECT u.id, u.email, u.password, u.rol, p.nombre
    FROM usuarios u
    JOIN personas p ON u.PersonaID = p.PersonaID
    WHERE u.email = ?
  `;

  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) 
      return res.status(401).json({ error: "Email no registrado" });

    const user = results[0];
    
    // Validar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) 
      return res.status(401).json({ error: "Contraseña incorrecta" });

    // Generar token con rol y nombre
    const token = jwt.sign(
      { id: user.id, name: user.nombre, rol: user.rol }, 
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    // Enviar respuesta con nombre incluido
    res.status(200).json({ 
      message: "Login exitoso", 
      token: token,
      user: { id: user.id, nombre: user.nombre, rol: user.rol }
    });
  });
};

exports.logout = (_req, res) => {
  res.status(200).json({ message: "Logout exitoso. Token eliminado del cliente." });
};
