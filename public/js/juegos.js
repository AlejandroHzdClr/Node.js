class Juego{
    constructor(titulo,contenido,url){
        this.titulo = titulo;
        this.contenido = contenido;
        this.url = url;
    }

    crearJuego(){
        const contenedor = document.createElement('div');
        contenedor.classList.add('juego');

        const titulo = document.createElement('h2');
        titulo.textContent = this.titulo;

        const contenido = document.createElement('p');
        contenido.textContent = this.contenido;

        const enlace = document.createElement('a');
        enlace.href = this.url;
        enlace.textContent = 'Jugar';

        contenedor.appendChild(titulo);
        contenedor.appendChild(contenido);
        contenedor.appendChild(enlace);

        return contenedor;
    }
}

const juegos = [
    new Juego('Memoria', 'Un juego de cartas para mejorar el nivel de tu memoria', '../memoria.html'),
    new Juego('Bloques', 'Hay unos recuadros, rellena y consigue puntos', '../bloques.html'),
];

const contenedorJuegosPadre = document.createElement('div');
contenedorJuegosPadre.classList.add('juegos');

juegos.forEach(juego => {
    const juegoElemento = juego.crearJuego();
    contenedorJuegosPadre.appendChild(juegoElemento);
});

const contenedorJuegos = document.getElementById('juegos');
if (contenedorJuegos) {
    contenedorJuegos.appendChild(contenedorJuegosPadre);
}