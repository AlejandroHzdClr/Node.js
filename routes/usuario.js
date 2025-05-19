const express = require('express');
const router = express.Router();

router.get('/usuario', (req, res) => {
  if (req.session.usuario) {
    res.json({ usuario: req.session.usuario });
  } else {
    res.status(401).json({ mensaje: 'No has iniciado sesión' });
  }
});

module.exports = router;
