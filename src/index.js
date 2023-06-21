import Game from './game';

const gameContainer = document.getElementById('game-container');
const totalCards = 24; // Ustaw ilość kart tutaj
const rows = 6; // Ustaw ilość wierszy tutaj
const columns = 4; // Ilosc kolumn nie zmienia sie

const game = new Game(gameContainer, rows, columns, totalCards);

game.init();
