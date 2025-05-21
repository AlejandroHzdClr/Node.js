const ancho = 10;
  const alto = 20;

  // Crear tablero
  const tablero = document.getElementById('tablero');
  for(let i=0; i < ancho * alto; i++) {
    const celda = document.createElement('div');
    celda.classList.add('celda');
    tablero.appendChild(celda);
  }

  const celdas = Array.from(tablero.children);

  // Piezas definidas (formas 4x4)
  const piezas = {
    I: [
      [0,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0]
    ],
    J: [
      [1,0,0],
      [1,1,1],
      [0,0,0]
    ],
    L: [
      [0,0,1],
      [1,1,1],
      [0,0,0]
    ],
    O: [
      [1,1],
      [1,1]
    ],
    S: [
      [0,1,1],
      [1,1,0],
      [0,0,0]
    ],
    T: [
      [0,1,0],
      [1,1,1],
      [0,0,0]
    ],
    Z: [
      [1,1,0],
      [0,1,1],
      [0,0,0]
    ]
  };

  // Función para rotar matriz 90º derecha
  function rotar(matriz) {
    const filas = matriz.length;
    const cols = matriz[0].length;
    let rotada = [];
    for(let x=0; x<cols; x++){
      rotada[x] = [];
      for(let y=filas-1; y>=0; y--){
        rotada[x][filas-1-y] = matriz[y][x];
      }
    }
    return rotada;
  }

  class Pieza {
    constructor(form, posX=3, posY=0) {
      this.forma = form;
      this.posX = posX;
      this.posY = posY;
    }

    mover(dx, dy) {
      this.posX += dx;
      this.posY += dy;
    }

    rotarPieza() {
      this.forma = rotar(this.forma);
    }
  }

  // Tablero lógico con 0 o 1 para ocupar celdas
  let tableroLogico = [];
  function crearTableroLogico() {
    tableroLogico = [];
    for(let i=0; i<alto; i++) {
      tableroLogico.push(Array(ancho).fill(0));
    }
  }
  crearTableroLogico();

  // Pintar todo el tablero desde el estado lógico
  function pintarTablero() {
    for(let y=0; y<alto; y++) {
      for(let x=0; x<ancho; x++) {
        const index = y * ancho + x;
        celdas[index].style.backgroundColor = tableroLogico[y][x] ? 'orange' : '#111';
      }
    }
  }

  // Pintar pieza actual sobre tablero lógico temporal
  function pintarPieza(pieza) {
    pintarTablero(); // pinta el fondo primero
    for(let y=0; y<pieza.forma.length; y++) {
      for(let x=0; x<pieza.forma[y].length; x++) {
        if(pieza.forma[y][x]) {
          const px = pieza.posX + x;
          const py = pieza.posY + y;
          if(py >= 0 && py < alto && px >= 0 && px < ancho) {
            const index = py * ancho + px;
            celdas[index].style.backgroundColor = 'cyan';
          }
        }
      }
    }
  }

  // Comprobar colisiones para mover/rotar
  function colision(pieza, dx=0, dy=0, forma = null) {
    const matriz = forma || pieza.forma;
    for(let y=0; y<matriz.length; y++) {
      for(let x=0; x<matriz[y].length; x++) {
        if(matriz[y][x]) {
          const nx = pieza.posX + x + dx;
          const ny = pieza.posY + y + dy;
          if(nx < 0 || nx >= ancho || ny >= alto) return true; // fuera de borde
          if(ny >= 0 && tableroLogico[ny][nx]) return true; // ya ocupado
        }
      }
    }
    return false;
  }

  // Insertar pieza en tablero lógico (fijarla)
  function fijarPieza(pieza) {
    for(let y=0; y<pieza.forma.length; y++) {
      for(let x=0; x<pieza.forma[y].length; x++) {
        if(pieza.forma[y][x]) {
          const px = pieza.posX + x;
          const py = pieza.posY + y;
          if(py >= 0 && py < alto && px >= 0 && px < ancho) {
            tableroLogico[py][px] = 1;
          }
        }
      }
    }
  }

  // Borrar filas completas
  function borrarFilas() {
    for(let y=alto-1; y>=0; y--) {
      if(tableroLogico[y].every(cell => cell === 1)) {
        tableroLogico.splice(y, 1);
        tableroLogico.unshift(Array(ancho).fill(0));
        y++; // recheck same row index
      }
    }
  }

  // Variables globales
  let piezaActual = null;
  let juegoTerminado = false;

  // Crear nueva pieza aleatoria
  function nuevaPieza() {
    const tipos = Object.values(piezas);
    const forma = tipos[Math.floor(Math.random() * tipos.length)];
    piezaActual = new Pieza(forma);
    if(colision(piezaActual)) {
      juegoTerminado = true;
      alert('Game Over!');
    }
  }

  // Control del juego
  function moverPieza(dx, dy) {
    if(!colision(piezaActual, dx, dy)) {
      piezaActual.mover(dx, dy);
      pintarPieza(piezaActual);
      return true;
    }
    return false;
  }

  function rotarPieza() {
    const nuevaForma = rotar(piezaActual.forma);
    if(!colision(piezaActual, 0, 0, nuevaForma)) {
      piezaActual.forma = nuevaForma;
      pintarPieza(piezaActual);
    }
  }

  // Caída automática
  function caer() {
    if(juegoTerminado) return;
    if(!moverPieza(0,1)) {
      fijarPieza(piezaActual);
      borrarFilas();
      pintarTablero();
      nuevaPieza();
      pintarPieza(piezaActual);
    }
  }

  // Eventos teclado
  window.addEventListener('keydown', e => {
    if(juegoTerminado) return;
    if(e.key === 'ArrowLeft') moverPieza(-1, 0);
    else if(e.key === 'ArrowRight') moverPieza(1, 0);
    else if(e.key === 'ArrowDown') moverPieza(0, 1);
    else if(e.key === 'ArrowUp') rotarPieza();
  });

  // Inicializar juego
  nuevaPieza();
  pintarPieza(piezaActual);

  // Bucle caída
  setInterval(caer, 600);