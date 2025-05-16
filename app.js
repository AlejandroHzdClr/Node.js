const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos (ej. public/index.html)
app.use(express.static('public'));

// Ruta de prueba
app.get('/api/saludo', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
