class Carta {
    constructor(valor, rep){
        this.valor = valor;
        this.rep = rep;
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

    let numero = document.getElementById("numero").value;

    for(let i = 0; i < numero; i++){
        let valor = Math.floor(Math.random() * 10) + 1;
        let rep = Math.floor(Math.random() * 4) + 1;
        let carta = new Carta(valor, rep);
        cartas.push(carta);
        let carta2 = new Carta(valor, rep);
        cartas.push(carta2);
    }

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