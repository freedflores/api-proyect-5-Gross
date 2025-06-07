const express = require('express');
const router = express.Router();
const { getReporteVentas } = require('../controllers/reporteController');

// Ruta para obtener reporte de ventas
router.get('/ventas', getReporteVentas);

module.exports = router;
