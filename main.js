// main.js

// Import the Game class from the game.js module
import Game from './game.js';

// Get a reference to the canvas element with the ID 'gameCanvas'
const canvas = document.getElementById('gameCanvas');
// Create a new instance of Game class,passing the canvas element as an argument
const game = new Game(canvas);

// Start the game by calling the start method on the game instance
game.start();
