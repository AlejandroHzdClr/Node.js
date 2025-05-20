const loginForm = document.getElementById('formularioLogin');
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
          <a href="/juegos.html">Juego</a>
        </ul>
        <p>Bienvenido, <strong>${data.usuario}</strong></p>
      `;
      // Oculta el formulario y el título solo si existen
      const form = document.getElementById('formularioLogin');
      if (form) form.style.display = 'none';
      const loginTitle = document.getElementsByClassName('login')[0];
      if (loginTitle) loginTitle.style.display = 'none';
      const intro = document.getElementById('intro');
      if (intro) intro.style.display = 'block';
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