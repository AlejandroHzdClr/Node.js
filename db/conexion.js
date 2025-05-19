const mysql = require('mysql2');

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
    console.log('✅ Conectado a la base de datos');
  }
});

module.exports = db;
