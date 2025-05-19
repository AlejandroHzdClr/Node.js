const express = require('express');
const router = express.Router();
const db = require('../db/conexion');

// Registro
router.post('/registro', (req, res) => {
  const { usuario, password } = req.body;
  if (!usuario || !password) {
    return res.status(400).json({ mensaje: 'Faltan usuario o contraseña' });
  }

  db.query(
    'INSERT INTO usuarios (usuario, password) VALUES (?, ?)',
    [usuario, password],
    (err) => {
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

// Login
router.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ mensaje: 'Faltan usuario o contraseña' });
  }

  db.query(
    'SELECT * FROM usuarios WHERE usuario = ? AND password = ?',
    [usuario, password],
    (err, results) => {
      if (err) return res.status(500).json({ mensaje: 'Error en la consulta' });

      if (results.length > 0) {
        req.session.usuario = usuario;
        res.json({ mensaje: 'Login exitoso' });
      } else {
        res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
      }
    }
  );
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ mensaje: 'Error al cerrar sesión' });
    res.clearCookie('connect.sid');
    res.json({ mensaje: 'Sesión cerrada correctamente' });
  });
});

module.exports = router;
