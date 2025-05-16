// public/script.js

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value;
  const contrasena = document.getElementById('contrasena').value;

  const respuesta = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, password: contrasena })
  });

  const datos = await respuesta.json();
  document.getElementById('mensaje').textContent = datos.mensaje;
});
