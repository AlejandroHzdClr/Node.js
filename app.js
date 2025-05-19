const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware de sesión
app.use(session({
  secret: 'LosMasTontosDelMundoChaval',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 100 } // 100 horas
}));

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const authRoutes = require('./routes/auth');
const usuarioRoutes = require('./routes/usuario');

app.use('/api', authRoutes);
app.use('/api', usuarioRoutes);

// Ruta de prueba
app.get('/api/saludo', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
