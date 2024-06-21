// alien.js

// Import the Bullet class to use for creating new bullets
import Bullet from './bullet.js';

// Define and export the Alien class as a default export
export default class Alien {
    // Constructor to initialize an alien instance
    constructor(x, y, game) {
        this.x = x; // Set the initial x-coordinate of the alien
        this.y = y; // Set the initial y-coordinate of the alien
        this.width = 30; // Set the width of the alien
        this.height = 30; // Set the height of the alien
        this.speed = 1; // Set the initial speed of the alien
        this.direction = 1; // Set the initial direction of movement
        this.isAlive = true; // Flag to indicate if the alien is alive
        this.game = game; // Reference to the game object
    }

    // Method to update the alien's state
    update() {
        if (!this.isAlive) return;
        // If the alien is not alive, exit the update method
        this.x += this.speed * this.direction;
        // Move the alien horizontally based on its speed and direction

        // Check if the alien has reached the edges of the canvas
        if (this.x + this.width > this.game.canvas.width || this.x < 0) {
            this.direction *= -1; // Reverse the direction of movement
            this.y += 10; // Move the alien down by 10 pixels
            this.speed += 0.1; // Increase the speed slightly
        }

        // Randomly shoot bullets with a low probability
        if (Math.random() < 0.003) {
            // Create a new bullet and add it to the game's bullets array
            this.game.bullets.push(new Bullet(this.x + this.width 
                / 2, this.y + this.height, 'down', this.game));
        }
    }

    // Method to render the alien on the canvas
    render(context) {
        if (this.isAlive) {
            context.fillStyle = '#ADB5BB'; // Alien color
            context.beginPath(); // Begin a new path for drawing the alien
            context.moveTo(this.x + this.width / 2, this.y);
             // Move to the top middle point of the alien
            context.lineTo(this.x + this.width, this.y + this.height / 2);
             // Draw line to the right middle point
            context.lineTo(this.x + this.width / 2, this.y + this.height);
             // Draw line to the bottom middle point
            context.lineTo(this.x, this.y + this.height / 2);
             // Draw line to the left middle point
            context.closePath(); // Close the path to form a rhombus shape
            context.fill(); // Fill the shape with the current fill color
        }
    }
}
