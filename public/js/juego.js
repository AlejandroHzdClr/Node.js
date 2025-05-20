class Carta {
    constructor(valor) {
        this.valor = valor;
    }

    generarCarta() {
        let carta = document.createElement("div");
        carta.classList.add("carta");
        carta.setAttribute("data-valor", this.valor);

        // Dorso
        let dorso = document.createElement("div");
        dorso.classList.add("dorso");
        dorso.textContent = "👌"; // Puedes poner un icono si quieres

        // Frente
        let frente = document.createElement("div");
        frente.classList.add("frente");
        frente.textContent = this.valor;

        carta.appendChild(dorso);
        carta.appendChild(frente);

        return carta;
    }
}

let cartas = [];
let contenedor = document.getElementById("contenedor");
let cartas_mostradas = 0;
let carta1 = null;
let carta2 = null;
let aciertos = document.getElementById("aciertos");

document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();

    contenedor.innerHTML = "";
    cartas = [];
    cartas_mostradas = 0;
    carta1 = null;
    carta2 = null;
    aciertos.innerHTML = 0;

    let numero = parseInt(document.getElementById("numero").value);

    // Generar números únicos del 1 al numero
    let valoresUnicos = [];
    for (let i = 1; i <= numero; i++) {
        valoresUnicos.push(i);
    }

    // Barajar los valores únicos
    valoresUnicos.sort(() => Math.random() - 0.5);

    // Crear pares de cartas con valores únicos
    for (let i = 0; i < valoresUnicos.length; i++) {
        let valor = valoresUnicos[i];
        cartas.push(new Carta(valor));
        cartas.push(new Carta(valor));
    }

    // Barajar todas las cartas
    cartas.sort(() => Math.random() - 0.5);

    // Crear y añadir las cartas al contenedor
    for (let i = 0; i < cartas.length; i++) {
        let cartaElem = cartas[i].generarCarta();
        contenedor.appendChild(cartaElem);
    }

    // Lógica de juego
    document.querySelectorAll('.carta').forEach(carta => {
        carta.addEventListener('click', function handler() {
            // Si ya está mostrada o acertada, no hacer nada
            if (carta.classList.contains('volteada') || carta.classList.contains('acierto')) return;

            carta.classList.add('volteada');
            cartas_mostradas += 1;

            if (cartas_mostradas === 1) {
                carta1 = carta;
            } else if (cartas_mostradas === 2) {
                carta2 = carta;
                // Desactivar clics mientras se resuelve
                document.querySelectorAll('.carta').forEach(c => c.style.pointerEvents = "none");

                if (carta1.getAttribute('data-valor') === carta2.getAttribute('data-valor')) {
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
                        carta1.classList.remove('volteada');
                        carta2.classList.remove('volteada');
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