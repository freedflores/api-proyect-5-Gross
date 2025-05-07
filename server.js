require("dotenv").config();
const express = require("express");
const cors = require("cors");

//obtengo mis rutas
const authRoutes = require("./routes/auth.routes");
const usuarioRoutes = require("./routes/usuario.routes");
const clienteRoutes = require("./routes/cliente.routes");
const mesaRoutes = require("./routes/mesa.routes");
const productoRoutes = require("./routes/producto.routes");
const promocionRoutes = require("./routes/promocion.routes");
const categoriaRoutes = require("./routes/categoria.routes");
const pedidoRoutes = require("./routes/pedido.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req,res) => {
  res.send("BIENVENIDO AL API");
});

app.use("/api", authRoutes);
app.use("/api/v1", usuarioRoutes);
app.use("/api/v1", clienteRoutes);
app.use("/api/v1", mesaRoutes);
app.use("/api/v1", productoRoutes);
app.use("/api/v1", promocionRoutes);
app.use("/api/v1", categoriaRoutes);
app.use("/api/v1", pedidoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});