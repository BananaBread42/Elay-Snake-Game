// Board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// Snake
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;
var snakeBody = [];

// Food
var foodX;
var foodY;

// Score
var score = 0;
var highScore = localStorage.getItem("highScore") || 0;

//Game State
var gameRunning = true;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keydown", changeDirection);
    setInterval(update, 100);
};

function update() {
    if (!gameRunning) return;

    // Background
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // Food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Eat Food
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        score++;
        placeFood();
    }

    // Move body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = [...snakeBody[i - 1]];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Move Head
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    // Draw Snake
    context.fillStyle = "#32dbbf";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Wall Collision
    if (
        snakeX < 0 ||
        snakeX >= cols * blockSize ||
        snakeY < 0 ||
        snakeY >= rows * blockSize
    ) {
        gameOver();
    }

    // Self Collision
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver();
        }
    }

    // Score Display
    context.fillStyle = "white";
    context.font = "20px monospace";
    context.fillText("Score: " + score, 10, 20);
    context.fillText("High: " + highScore, 10, 45);
}

function changeDirection(e) {
    // Restart Game
    if (!gameRunning && e.code === "Space") {
        resetGame();
        return;
    }

    if (e.code === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function gameOver() {
    // Save High Score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }

    gameRunning = false;

    // Draw Game Over Screen
    context.fillStyle = "white";
    context.font = "30px monospace";
    context.fillText("Game Over", 80, 250);
    context.font = "20px monospace";
    context.fillText("Press SPACE to Restart", 40, 300);
}

function resetGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    score = 0;
    gameRunning = true;
    placeFood();
}