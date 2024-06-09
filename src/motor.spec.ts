import {
  dameCarta,
  obtenerNumAleatorio,
  calcularNumPuntos,
  comprobarPartida,
  getMessage,
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

describe('comprobarPartida', () => {
  it('Debería devolver ganado si la puntuación total del jugador es igual a 7.5 puntos', () => {
    //Arrange
    const StateEsperado: States = 'ganado';
    vi.spyOn(partida, 'totalPuntosJugador', 'get').mockReturnValue(7.5);
    //Act
    const resultado = comprobarPartida(partida.totalPuntosJugador);
    //Assert
    expect(resultado).toBe(StateEsperado);
  });

  it('Debería devolver gameOver si la puntuación total del jugador supera los 7.5 puntos', () => {
    //Arrange
    const StateEsperado: States = 'gameOver';
    vi.spyOn(partida, 'totalPuntosJugador', 'get').mockReturnValue(9);
    //Act
    const resultado = comprobarPartida(partida.totalPuntosJugador);
    //Assert
    expect(resultado).toBe(StateEsperado);
  });

  it('Debería devolver jugando si la puntuación total del jugador es menor que 7.5 puntos', () => {
    //Arrange
    const StateEsperado: States = 'jugando';
    vi.spyOn(partida, 'totalPuntosJugador', 'get').mockReturnValue(5.5);
    //Act
    const resultado = comprobarPartida(partida.totalPuntosJugador);
    //Assert
    expect(resultado).toBe(StateEsperado);
  });
});

describe('getMessage', () => {
  it('Debería devolver el mensaje "Estás jugando" al pasarle el estado "jugando"', () => {
    //Arrange;
    const state: States = 'jugando';
    const mensajeEsperado: string = 'Estás jugando';
    // Act;
    const resultado = getMessage(state, partida.totalPuntosJugador);
    //Assert;
    expect(resultado).toBe(mensajeEsperado);
  });

  it('Debería devolver el mensaje "Has sido muy conservador...." al pasarle el estado "plantado" y una puntuación menor o igual a 4.5', () => {
    //Arrange;
    const state: States = 'plantado';
    const numPuntos: number = 3;
    const mensajeEsperado: string = 'Has sido muy conservador....';
    // Act;
    const resultado = getMessage(state, numPuntos);
    //Assert;
    expect(resultado).toBe(mensajeEsperado);
  });

  it('Debería devolver el mensaje "Te ha entrado el canguelo eh?" al pasarle el estado "plantado" y una puntuación mayor o igual a 5', () => {
    //Arrange;
    const state: States = 'plantado';
    const numPuntos: number = 5.5;
    const mensajeEsperado: string = 'Te ha entrado el canguelo eh?';
    // Act;
    const resultado = getMessage(state, numPuntos);
    //Assert;
    expect(resultado).toBe(mensajeEsperado);
  });

  it('Debería devolver el mensaje "Casi, casi ..." al pasarle el estado "plantado" y una puntuación mayor o igual a 6', () => {
    //Arrange;
    const state: States = 'plantado';
    const numPuntos: number = 6.5;
    const mensajeEsperado: string = 'Casi, casi ...';
    // Act;
    const resultado = getMessage(state, numPuntos);
    //Assert;
    expect(resultado).toBe(mensajeEsperado);
  });

  it('Debería devolver el mensaje "¡Lo has clavado! ¡Enhorabuena!" al pasarle el estado "ganado"', () => {
    //Arrange;
    const state: States = 'ganado';
    const mensajeEsperado: string = '¡Lo has clavado! ¡Enhorabuena!';
    // Act;
    const resultado = getMessage(state, partida.totalPuntosJugador);
    //Assert;
    expect(resultado).toBe(mensajeEsperado);
  });

  it('Debería devolver el mensaje "¡Game Over!😢" al pasarle el estado "gameOver"', () => {
    //Arrange;
    const state: States = 'gameOver';
    const mensajeEsperado: string = '¡Game Over!😢';
    // Act;
    const resultado = getMessage(state, partida.totalPuntosJugador);
    //Assert;
    expect(resultado).toBe(mensajeEsperado);
  });
});
