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

document.getElementById("formulario").addEventListener("submit", function(event){
    event.preventDefault();

    contenedor.innerHTML = "";
    cartas = [];

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
        carta.addEventListener('click', () => {
            carta.classList.remove('sinMostrar');
        });
    });

});