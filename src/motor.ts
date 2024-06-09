import { partida, States } from './modelo';

export const getMessage = (state: States, numPuntos: number): string => {
  let mensaje: string = '';
  switch (state) {
    case 'jugando':
      mensaje = 'Estás jugando';
      break;
    case 'plantado':
      mensaje = obtenerMensajeTrasPlantarse(numPuntos);
      break;
    case 'ganado':
      mensaje = '¡Lo has clavado! ¡Enhorabuena!';
      break;
    case 'gameOver':
      mensaje = '¡Game Over!😢';
      break;
    default:
      mensaje = '';
      break;
  }
  return mensaje;
};

export const dameCarta = (numAleatorio: number) => {
  return numAleatorio > 7 ? numAleatorio + 2 : numAleatorio;
};

export const obtenerNumAleatorio = (): number => {
  let numeroAleatorio = Math.ceil(Math.random() * 10);
  return numeroAleatorio;
};

export const calcularNumPuntos = (carta: number): number => {
  let numPuntos = carta > 7 ? 0.5 : carta;
  return numPuntos;
};

export const sumarPuntuacionTotal = (numPuntos: number): number => {
  return partida.totalPuntosJugador + numPuntos;
};
export const crearURLCarta = (numCarta: number): string => {
  let carta: string = '';
  switch (numCarta) {
    case 1:
      carta = '1_as';
      break;
    case 2:
      carta = '2_dos';
      break;
    case 3:
      carta = '3_tres';
      break;
    case 4:
      carta = '4_cuatro';
      break;
    case 5:
      carta = '5_cinco';
      break;
    case 6:
      carta = '6_seis';
      break;
    case 7:
      carta = '7_siete';
      break;
    case 10:
      carta = '10_sota';
      break;
    case 11:
      carta = '11_caballo';
      break;
    case 12:
      carta = '12_rey';
      break;
    default:
      carta = 'No se que ha pasado, pero no deberías estar aquí';
  }
  const rutaCarta = `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/${carta}-copas.jpg`;
  return rutaCarta;
};

export const obtenerMensajeTrasPlantarse = (numPuntos: number): string => {
  let txtMensaje: string = '';
  if (numPuntos <= 4.5) {
    txtMensaje = 'Has sido muy conservador....';
  }
  if (numPuntos >= 5) {
    txtMensaje = 'Te ha entrado el canguelo eh?';
  }
  if (numPuntos >= 6) {
    txtMensaje = 'Casi, casi ...';
  }
  return txtMensaje;
};

export const comprobarPartida = (puntos: number): States => {
  if (puntos === 7.5) {
    return 'ganado';
  }
  return puntos > 7.5 ? 'gameOver' : 'jugando';
};
