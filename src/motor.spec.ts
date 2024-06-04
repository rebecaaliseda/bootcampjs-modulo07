import {
  dameCarta,
  obtenerNumAleatorio,
  calcularNumPuntos,
  obtenerPuntuacionJugador,
  comprobarPartida,
} from './motor';
import { partida, States } from './modelo';
import { vi } from 'vitest';

describe('dameCarta', () => {
  it('', () => {
    it('Debería devolver el mismo número aleatorio en el caso de ser menor o igual a 7. En este caso debe devolver 3.', () => {
      //Arrange
      const numAleatorio: number = 3;
      const numEsperado: number = 3;
      //Act
      const resultado = dameCarta(numAleatorio);
      //Assert
      expect(resultado).toBe(numEsperado);
    });

    it('Deberia devolver el numero esperado (número aleatorio + 2). En este caso debe devolver 11.', () => {
      //Arrange
      const numAleatorio: number = 9;
      const numEsperado: number = 11;
      //Act
      const resultado = dameCarta(numAleatorio);
      //Assert
      expect(resultado).toBe(numEsperado);
    });
  });
});

describe('obtenerNumAleatorio', () => {
  it('Debería devolver el número esperado (0 en este caso)', () => {
    //Arrange
    const numEsperado: number = 0;
    vi.spyOn(global.Math, 'random').mockReturnValue(0);
    //Act
    const resultado = obtenerNumAleatorio();
    //Assert
    expect(resultado).toBe(numEsperado);
  });

  it('Debería devolver el número esperado (10 en este caso)', () => {
    //Arrange
    const numEsperado: number = 10;
    vi.spyOn(global.Math, 'random').mockReturnValue(0.99999);
    //Act
    const resultado = obtenerNumAleatorio();
    //Assert
    expect(resultado).toBe(numEsperado);
  });
});

describe('calcularNumPuntos', () => {
  it('Debería devolver 0.5, ya que el número de carta es mayor que 7 (9 en este caso)', () => {
    //Arrange
    const numCarta: number = 9;
    const puntuacionEsperada = 0.5;
    //Act
    const resultado = calcularNumPuntos(numCarta);
    //Assert
    expect(resultado).toBe(puntuacionEsperada);
  });

  it('Debería devolver el mismo valor de la carta, ya que el número de carta es menor o igual que 7 (4 en este caso)', () => {
    //Arrange
    const numCarta: number = 4;
    const puntuacionEsperada: number = 4;
    //Act
    const resultado = calcularNumPuntos(numCarta);
    //Assert
    expect(resultado).toBe(puntuacionEsperada);
  });
});
describe('obtenerPuntuacionJugador', () => {
  it('Debería devolver la puntuación total del jugador', () => {
    //Arrange
    const puntuacionEsperada: number = 4;
    vi.spyOn(partida, 'totalPuntosJugador', 'get').mockReturnValue(4);
    //Act
    const resultado = obtenerPuntuacionJugador();
    //Assert
    expect(resultado).toBe(puntuacionEsperada);
  });
});

describe('comprobarPartida', () => {
  it('Debería devolver ganado si la puntuación total del jugador es igual a 7.5 puntos', () => {
    //Arrange
    const StateEsperado: States = 'ganado';
    vi.spyOn(partida, 'totalPuntosJugador', 'get').mockReturnValue(7.5);
    //Act
    const resultado = comprobarPartida();
    //Assert
    expect(resultado).toBe(StateEsperado);
  });

  it('Debería devolver gameOver si la puntuación total del jugador supera los 7.5 puntos', () => {
    //Arrange
    const StateEsperado: States = 'gameOver';
    vi.spyOn(partida, 'totalPuntosJugador', 'get').mockReturnValue(9);
    //Act
    const resultado = comprobarPartida();
    //Assert
    expect(resultado).toBe(StateEsperado);
  });

  it('Debería devolver jugando si la puntuación total del jugador es menor que 7.5 puntos', () => {
    //Arrange
    const StateEsperado: States = 'jugando';
    vi.spyOn(partida, 'totalPuntosJugador', 'get').mockReturnValue(5.5);
    //Act
    const resultado = comprobarPartida();
    //Assert
    expect(resultado).toBe(StateEsperado);
  });
});
