window.addEventListener('DOMContentLoaded', () => {

  fetch('/partials/footer.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    });
});
