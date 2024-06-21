// game.js

// Import the Alien class from alien.js
import Alien from './alien.js';
// Import the Bullet class from bullet.js
import Bullet from './bullet.js';
// Import the Cannon class from cannon.js
import Cannon from './cannon.js';

// Define and export the Game class as a default export
export default class Game {
    // Constructor to initialize the game instance
    constructor(canvas) {
        this.canvas = canvas; // Reference to the canvas element
        this.context = canvas.getContext('2d'); // 2D drawing context
        this.aliens = []; // Array to hold aliens
        this.bullets = []; // Array to hold bullets
        this.cannon = new Cannon(this); // Create a new cannon instance
        this.keys = {}; // Object to track pressed keys
        this.lives = 3; // Player's lives
        this.score = 0; // Player's score
        this.highScore = localStorage.getItem('highScore') || 0;
        // Retrieve high score from local storage or set to 0
        this.isGameOver = false; // Flag to check if the game is over
        this.animationFrameId = null; // Reference to animation frame
        this.setupEventListeners(); // Setup event listeners for keypresses
        this.createAliens(); // Create aliens
    }

    // Method to setup event listeners for key presses
    setupEventListeners() {
        // Add event listener for keydown to track pressed keys
        window.addEventListener('keydown', (e) => this.keys[e.key] = true);
        // Add event listener for keyup to track released keys
        window.addEventListener('keyup', (e) => this.keys[e.key] = false);
    }

    // Method to create aliens and add them to the aliens array
    createAliens() {
        const rows = 5; // Number of rows of aliens
        const cols = 10; // Number of columns of aliens
        const alienWidth = 30; // Width of an alien
        const alienHeight = 30; // Height of an alien
        const offsetX = 30; // Horizontal offset between aliens
        const offsetY = 30; // Vertical offset between aliens

        // Loop through rows and columns to create aliens
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // Calculate the x and y position for each alien
                const x = col * (alienWidth + offsetX) + offsetX;
                const y = row * (alienHeight + offsetY) + offsetY;
                // Create a new alien and add it to the aliens array
                this.aliens.push(new Alien(x, y, this));
            }
        }
    }
    
    // Method to update the game state
    update() {
        if (this.isGameOver) return;
        // If the game is over, exit the update method

        this.cannon.update(); // Update the cannon's state

        // Update each bullet and remove it if it's not alive
        this.bullets.forEach((bullet, index) => {
            bullet.update(); // Update bullet
            if (!bullet.isAlive) this.bullets.splice(index, 1);
             // Remove bullet if not alive
        });

        // Update each alien and check for collisions with bullets
        this.aliens.forEach((alien) => {
            alien.update(); // Update alien
            if (alien.isAlive && this.bullets.some(bullet => bullet.isColliding(alien) 
                && bullet.direction === 'up')) {
                alien.isAlive = false;// Mark alien as dead if hit by a bullet
                this.score += 10; // Increase score
                this.bullets.forEach(bullet => {
                    if (bullet.isColliding(alien) && bullet.direction === 'up') 
                        bullet.isAlive = false;
                    // Mark bullet as dead if it hits an alien
                });
            }
        });

        // Check for collisions between alien bullets and the cannon
        if (this.bullets.some(bullet => bullet.isColliding(this.cannon) 
            && bullet.direction === 'down')) {
            this.lives--; // Decrease lives
            this.bullets.forEach(bullet => {
                if (bullet.isColliding(this.cannon) && bullet.direction === 'down') 
                    bullet.isAlive = false;
                 // Mark bullet as dead if it hits the cannon
            });
            if (this.lives <= 0) this.gameOver(); // End game if no lives left
        }

        // Filter out dead aliens from the aliens array
        this.aliens = this.aliens.filter(alien => alien.isAlive);

        // Respawn aliens if all are dead
        if (this.aliens.length === 0) this.createAliens();
    }

    // Method to render the game state on the canvas
    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Clear the canvas

         // Draw lives, score, and high score at the top of the canvas
        this.context.fillStyle = 'white'; // Set text color to white
        this.context.font = '20px Arial'; // Set font
        this.context.fillText(`Lives: ${this.lives}`, 10, 22); // Draw lives count
        this.context.fillText(`Score: ${this.score}`, this.canvas.width - 100, 22);
         // Draw score
        this.context.fillText(`High Score: ${this.highScore}`, 
            this.canvas.width / 2 - 50, 22);
         // Draw high score

        this.cannon.render(this.context); // Render the cannon

        // Render each bullet
        this.bullets.forEach(bullet => bullet.render(this.context));
        // Render each alien
        this.aliens.forEach(alien => alien.render(this.context));
    }

    // Method to handle game over state
    gameOver() {
        this.isGameOver = true;
        cancelAnimationFrame(this.animationFrameId); // Cancel the animation frame

        // Display game over message
        this.context.fillStyle = 'red'; // Set text color to red
        this.context.font = '40px Arial'; // Set font
        this.context.fillText('GAME OVER', this.canvas.width 
            / 2 - 100, this.canvas.height / 2);
        this.context.font = '20px Arial'; // Set font for final score
        this.context.fillText(`Final Score: ${this.score}`, 
            this.canvas.width / 2 - 70, this.canvas.height / 2 + 30);
         // Draw final score

        // Update high score if the current score is higher
        if (this.score > this.highScore) {
            this.highScore = this.score; // Update high score
            localStorage.setItem('highScore', this.highScore);
             // Save high score to local storage
        }
    }

    // Method to start the game loop
    start() {
        const loop = () => {
            this.update(); // Update game state
            this.render(); // Render game state
            this.animationFrameId = requestAnimationFrame(loop);
        };
        loop(); // Start the loop
    }

    // Method to remove a specific alien from the aliens array
    removeAlien(alien) {
        this.aliens = this.aliens.filter(a => a !== alien);
         // Filter out the specified alien
    }
}
