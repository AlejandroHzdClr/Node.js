document.getElementById('formulario').addEventListener('submit', async function (e) {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value;
  const password = document.getElementById('contrasena').value;

  const respuesta = await fetch('/api/registro', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, password })
  });

  const datos = await respuesta.json();
  document.getElementById('mensaje').textContent = datos.mensaje;
});
