window.addEventListener('DOMContentLoaded', () => {
  fetch('/partials/nav.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('nav').innerHTML = data;
    });

  fetch('/partials/footer.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    });
});
