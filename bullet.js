// bullet.js

// Define and export the Bullet class as a default export
export default class Bullet {
    // Constructor to initialize a bullet instance
    constructor(x, y, direction, game) {
        this.x = x; // Set the initial x-coordinate of the bullet
        this.y = y; // Set the initial y-coordinate of the bullet
        this.width = 5; // Set the width of the bullet
        this.height = 10; // Set the height of the bullet
        this.speed = 5; // Set the speed of the bullet
        this.direction = direction; // Set the direction of the bullet movement
        this.isAlive = true; // Flag to indicate if the bullet is alive
        this.game = game; // Reference to the game object
        // Set the color of the bullet
        this.color = direction === 'up' ? '#D4F1D8' : '#FF8894';
    }

    // Method to update the bullet's state
    update() {
        // Move the bullet up or down based on its direction
        if (this.direction === 'up') {
            this.y -= this.speed; // Move bullet up
        } else {
            this.y += this.speed; // Move bullet down
        }
        // Check if the bullet is out of canvas bounds and mark it as not alive
        if (this.y < 0 || this.y > this.game.canvas.height) {
            this.isAlive = false; // Mark bullet as not alive
        }
    }

    // Method to render the bullet on the canvas
    render(context) {
        context.fillStyle = this.color; // Set the color of the bullet
        context.beginPath(); // Begin a new path for drawing the bullet
        // Draw an ellipse representing the bullet
        context.ellipse(this.x, this.y, this.width 
            / 2, this.height / 2, 0, 0, Math.PI * 2);
        context.fill(); // Fill the ellipse with the current fill color
    }

    // Method to check if the bullet is colliding with a given entity
    isColliding(entity) {
        // Check for collision between the bullet and the entity
        return this.x < entity.x + entity.width &&
               this.x + this.width > entity.x &&
               this.y < entity.y + entity.height &&
               this.y + this.height > entity.y;
    }
}
