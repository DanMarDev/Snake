SNAKE_INIT_SIZE = 1;
SNAKE_INIT_SPEED = 5;
SNAKE_INIT_DIRECTION = "right";
SNAKE_INIT_COLOR = "green";
SNAKE_INIT_BODY = [{ x: 0, y: 0 }];
FOOD = { x: 0, y: 0 };
CANVAS_WIDTH = 600;
CANVAS_HEIGHT = 600;
gameRunning = true;

(function() {
    // Initialize the game when the page loads
    window.onload = function() {
        const canvas = document.getElementById("gameCanvas");
        canvas.width = 600;
        canvas.height = 600;
        document.addEventListener("keydown", handleKeyPress, false);
        initSnakeGame();
        FOOD = generateFoodPosition();
        placeFood(canvas.getContext("2d"), FOOD);
        gameLoop();
    };

    // Stop the game when the window is closed
    window.onbeforeunload = function() {
        gameRunning = false;
    };
}
)();

// This function starts the game loop and initializes the game
function gameLoop() {
    if (!gameRunning) return;
    
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fill the canvas with a light blue color
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the snake on the canvas
    drawSnake(ctx, SNAKE_INIT_BODY, SNAKE_INIT_COLOR);

    // Place the food on the canvas
    placeFood(ctx, FOOD);

    // Move the snake in the specified direction
    moveSnake(SNAKE_INIT_BODY, SNAKE_INIT_DIRECTION);

    // Check for collisions with walls or itself
    if(checkCollision(SNAKE_INIT_BODY, ctx)) {
        showAlert("Game Over!"); // Show game over alert
        // alert("Game Over!"); // Show game over alert
    }

    setTimeout(gameLoop, 600 / SNAKE_INIT_SPEED); // Control the speed of the game

}

// This function determines if the snake is on the food
function isOnFood(snakeBody, foodPosition) {
    const head = snakeBody[0];
    return head.x === foodPosition.x && head.y === foodPosition.y;
}

// This function grows the snake when it eats food
function growSnake(snakeBody) {
    const tail = snakeBody[snakeBody.length - 1];
    snakeBody.push({ x: tail.x, y: tail.y });
}

// This function places a food item on the canvas intially and
// generates a new food item when the snake eats it
function placeFood(ctx, foodPosition) {
    ctx.fillStyle = "red";
    ctx.fillRect(foodPosition.x, foodPosition.y, 20, 20);
}

// This function generates a random position for the food
function generateFoodPosition() {
    const x = Math.floor(Math.random() * (CANVAS_WIDTH / 20)) * 20;
    const y = Math.floor(Math.random() * (CANVAS_HEIGHT / 20)) * 20;
    return { x, y };
}


// This function checks for collisions with the walls or itself
// and returns true if a collision occurs.
// It also checks if the snake is on the food and grows the snake if it is.
// It returns false if no collision occurs.
function checkCollision(snakeBody, ctx) {
    const head = snakeBody[0];
    // Check for collision with walls
    if (head.x < -21 || head.x >= CANVAS_WIDTH || head.y < -21 || head.y >= CANVAS_HEIGHT) {
        return true;
    }
    // Check for collision with itself
    for (let i = 1; i < snakeBody.length; i++) {
        if (head.x === snakeBody[i].x && head.y === snakeBody[i].y) {
            return true;
        }
    }
    // Check for collision with food
    if (isOnFood(snakeBody, FOOD)) {
        growSnake(snakeBody);
        FOOD = generateFoodPosition();
        placeFood(ctx, FOOD);
    }
    // No collision detected
    return false;
}

// This function handles keyboard input for controlling the snake
function handleKeyPress(event) {
    const key = event.key.toLowerCase();
    if (key === "arrowup") {
        SNAKE_INIT_DIRECTION = "up";
    } else if (key === "arrowdown") {
        SNAKE_INIT_DIRECTION = "down";
    } else if (key === "arrowleft") {
        SNAKE_INIT_DIRECTION = "left";
    } else if (key === "arrowright") {
        SNAKE_INIT_DIRECTION = "right";
    }
}

// This function moves the snake in the specified direction
function moveSnake(snakeBody, direction) {
    const head = { ...snakeBody[0] };

    // Prevent the snake from moving in the opposite direction if its length is more than 1
    if (snakeBody.length > 1) {
        const neck = snakeBody[1];
        if (direction === "up" && head.y - 20 === neck.y) {
            direction = "down";
        } else if (direction === "down" && head.y + 20 === neck.y) {
            direction = "up";
        } else if (direction === "left" && head.x - 20 === neck.x) {
            direction = "right";
        } else if (direction === "right" && head.x + 20 === neck.x) {
            direction = "left";
        }
    }

    switch (direction) {
        case "up":
            head.y -= 20;
            break;
        case "down":
            head.y += 20;
            break;
        case "left":
            head.x -= 20;
            break;
        case "right":
            head.x += 20;
            break;
    }
    // Add the new head to the front of the snake body
    snakeBody.unshift(head);
    // Remove the last segment of the snake body
    snakeBody.pop();
}

// This function initializes the snake game with default values
function initSnakeGame() {
    // Set the initial size of the snake
    let snakeSize = SNAKE_INIT_SIZE;
    let snakeSpeed = SNAKE_INIT_SPEED;
    let snakeDirection = SNAKE_INIT_DIRECTION;
    let snakeColor = SNAKE_INIT_COLOR;
    let snakeBody = SNAKE_INIT_BODY;
}

// This function draws the snake on the canvas
function drawSnake(ctx, snakeBody, snakeColor) {
    ctx.fillStyle = snakeColor;
    for (let i = 0; i < snakeBody.length; i++) {
        ctx.fillRect(snakeBody[i].x, snakeBody[i].y, 20, 20);
    }
}

function resetGame() {
    SNAKE_INIT_SIZE = 1;
    SNAKE_INIT_SPEED = 5;
    SNAKE_INIT_DIRECTION = "right";
    SNAKE_INIT_COLOR = "green";
    SNAKE_INIT_BODY = [{ x: 0, y: 0 }];
    gameRunning = true;
}