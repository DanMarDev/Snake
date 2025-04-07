SNAKE_INIT_SIZE = 1;
SNAKE_INIT_SPEED = 5;
SNAKE_INIT_DIRECTION = "right";
SNAKE_INIT_COLOR = "green";
SNAKE_INIT_BODY = [{ x: 0, y: 0 }];
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

    // Move the snake in the specified direction
    moveSnake(SNAKE_INIT_BODY, SNAKE_INIT_DIRECTION);

    if(checkCollision(SNAKE_INIT_BODY)) {
        showAlert("Game Over!"); // Show game over alert
        // alert("Game Over!"); // Show game over alert
    }

    setTimeout(gameLoop, 850 / SNAKE_INIT_SPEED); // Control the speed of the game

}

function checkCollision(snakeBody) {
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

