const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');

app.use(session({
  secret: 'LosMasTontosDelMundoChaval', // puedes cambiar esto por algo más seguro
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 100000 * 60 * 60 // 100 hora
  }
}));



const app = express();
const PORT = 3000;

// Permitir cors y json en post
app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'Alejandro',
  password: 'Alex_1234',
  database: 'nodejs'
});

db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
  } else {
    console.log('✅ Conexión con la base de datos establecida correctamente.');
  }
});

app.post('/api/registro', (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ mensaje: 'Faltan usuario o contraseña' });
  }

  db.query(
    'INSERT INTO usuarios (usuario, password) VALUES (?, ?)',
    [usuario, password],
    (err, results) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ mensaje: 'Usuario ya existe' });
        }
        return res.status(500).json({ mensaje: 'Error al registrar usuario' });
      }
      res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
    }
  );
});

app.post('/api/login', (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ mensaje: 'Faltan usuario o contraseña' });
  }

  db.query(
    'SELECT * FROM usuarios WHERE usuario = ? AND password = ?',
    [usuario, password],
    (err, results) => {
      if (err) {
        return res.status(500).json({ mensaje: 'Error al consultar usuario' });
      }
      if (results.length > 0) {
        req.session.usuario = usuario; // ✅ GUARDAR EN LA SESIÓN
        res.json({ mensaje: 'Login exitoso' });
      } else {
        res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
      }
    }
  );
});


app.get('/api/usuario', (req, res) => {
  if (req.session.usuario) {
    res.json({ usuario: req.session.usuario });
  } else {
    res.status(401).json({ mensaje: 'No has iniciado sesión' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ mensaje: 'Error al cerrar sesión' });
    res.clearCookie('connect.sid'); // eliminar cookie
    res.json({ mensaje: 'Sesión cerrada correctamente' });
  });
});



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
