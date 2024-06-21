// cannon.js

// Import the Bullet class to use for creating new bullets
import Bullet from './bullet.js';

// Define and export the Cannon class as a default export
export default class Cannon {
    // Constructor to initialize a cannon instance
    constructor(game) {
        this.game = game; // Reference to the game object
        this.width = 40; // Set the width of the cannon
        this.height = 20; // Set the height of the cannon
        this.x = (game.canvas.width - this.width) / 2;
        // Center the cannon horizontally
        this.y = game.canvas.height - this.height - 10;
        // Position the cannon near the bottom of the canvas
        this.speed = 5; // Set the speed of the cannon movement
        this.canShoot = true; // Flag to indicate if the cannon can shoot
    }

    // Method to update the cannon's state
    update() {
         // Move the cannon left if the left arrow key is pressed
        if (this.game.keys['ArrowLeft']) {
            this.x -= this.speed; // Decrease the x-coordinate by the speed
            if (this.x < 0) this.x = 0; 
            // Prevent the cannon from going off the left edge
        }
        // Move the cannon right if the right arrow key is pressed
        if (this.game.keys['ArrowRight']) {
            this.x += this.speed; // Increase the x-coordinate by the speed
            if (this.x + this.width > this.game.canvas.width) 
                this.x = this.game.canvas.width - this.width;
            // Prevent the cannon from going off the right edge

        }
        // Shoot a bullet if the space bar is pressed and the cannon can shoot
        if (this.game.keys[' '] && this.canShoot) {
            // Create a new bullet and add it to the game's bullets array
            this.game.bullets.push(new Bullet(this.x + this.width 
                / 2, this.y, 'up', this.game));
            this.canShoot = false; // Disable shooting until cooldown
            setTimeout(() => this.canShoot = true, 100);
            // Re-enable shooting after a 100ms cooldown
        }
    }

    // Method to render the cannon on the canvas
    render(context) {
        context.fillStyle = '#D2D8D9'; // Set the color of the cannon
        context.beginPath(); // Begin a new path for drawing the cannon
        context.moveTo(this.x, this.y + this.height);
        // Move to the bottom-left corner of the cannon
        context.lineTo(this.x + this.width, this.y + this.height);
        // Draw line to the bottom-right corner
        context.lineTo(this.x + this.width - 10, this.y);
        // Draw line to the top-right corner (creating a trapezoid shape)
        context.lineTo(this.x + 10, this.y);
        // Draw line to the top-left corner
        context.closePath(); // Close the path to form the cannon shape
        context.fill(); // Fill the shape with the current fill color
    }
}
