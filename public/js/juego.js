class Carta {
    constructor(valor){
        this.valor = valor;
    }

    generarCarta(){
        let carta = document.createElement("div");
        carta.classList.add("sinMostrar");
        carta.classList.add("carta");
        carta.innerHTML = this.valor;
        return carta;
    }
}

let cartas = [];
let contenedor = document.getElementById("contenedor");
let turno = 0;
let cartas_mostradas = 0;
let carta1 = null;
let carta2 = null;
let aciertos = document.getElementById("aciertos");

document.getElementById("formulario").addEventListener("submit", function(event){
    event.preventDefault();

    contenedor.innerHTML = "";
    cartas = [];
    aciertos.innerHTML = 0;

    let numero = parseInt(document.getElementById("numero").value);

    // Generar números únicos del 1 al numero
    let valoresUnicos = [];
    for(let i = 1; i <= numero; i++) {
        valoresUnicos.push(i);
    }

    // Barajar los valores únicos (opcional)
    valoresUnicos.sort(() => Math.random() - 0.5);

    // Crear pares de cartas con valores únicos
    for(let i = 0; i < valoresUnicos.length; i++){
        let valor = valoresUnicos[i];
        let carta = new Carta(valor);
        cartas.push(carta);
        let carta2 = new Carta(valor);
        cartas.push(carta2);
    }

    // Barajar todas las cartas
    cartas.sort(() => Math.random() - 0.5);

    for(let i = 0; i < cartas.length; i++){
        let carta = cartas[i].generarCarta();
        contenedor.appendChild(carta);
    }

    document.querySelectorAll('.carta').forEach(carta => {
        carta.addEventListener('click', function handler() {
            // Si ya está mostrada o acertada, no hacer nada
            if (!carta.classList.contains('sinMostrar') || carta.classList.contains('acierto')) return;
            // Mostrar la carta
            carta.classList.remove('sinMostrar');
            cartas_mostradas += 1;

            if (cartas_mostradas === 1) {
                carta1 = carta;
            } else if (cartas_mostradas === 2) {
                carta2 = carta;
                // Desactivar clics mientras se resuelve
                document.querySelectorAll('.carta').forEach(c => c.style.pointerEvents = "none");
                if (carta1.innerHTML === carta2.innerHTML) {
                    aciertos.innerHTML = parseInt(aciertos.innerHTML) + 1;
                    
                    carta1.classList.add('acierto');
                    carta2.classList.add('acierto');
                    setTimeout(() => {
                        carta1 = null;
                        carta2 = null;
                        cartas_mostradas = 0;
                        document.querySelectorAll('.carta').forEach(c => c.style.pointerEvents = "");
                    }, 500);
                } else {
                    setTimeout(() => {
                        carta1.classList.add('sinMostrar');
                        carta2.classList.add('sinMostrar');
                        carta1 = null;
                        carta2 = null;
                        cartas_mostradas = 0;
                        document.querySelectorAll('.carta').forEach(c => c.style.pointerEvents = "");
                    }, 1000);
                }
            }
        });
    });

});