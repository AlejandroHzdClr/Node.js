const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    const respuesta = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ usuario, password: contrasena })
    });

    const datos = await respuesta.json();
    document.getElementById('mensaje').textContent = datos.mensaje;
    
    if(respuesta.ok) {
      location.reload();
    }
  
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/usuario', {
    credentials: 'include'
  })
    .then(res => {
      if (!res.ok) throw new Error('No logueado');
      return res.json();
    })
    .then(data => {
      document.getElementById('nav').innerHTML = `
        <ul class="lista_nav">
          <a href="/index.html">Inicio</a>
          <a href="/juego.html">Juego</a>
        </ul>
        <p>Bienvenido, <strong>${data.usuario}</strong></p>
      `;
    })
    .catch(() => {
      document.getElementById('nav').innerHTML = `
        <ul class="lista_nav">
          <a href="/index.html">Login</a> |
          <a href="/registro.html">Registro</a>
        </ul>
      `;
    });
});