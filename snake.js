// board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// snake
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;
var snakeBody = [];

// food
var foodX;
var foodY;

// score
var score = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keydown", changeDirection); // smoother than keyup
    setInterval(update, 100); // game speed
};

function update() {
    // background
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // draw food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // check if food eaten
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        score++;
        placeFood();
    }

    // move body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = [...snakeBody[i - 1]];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // move head
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    // draw snake
    context.fillStyle = "#32dbbf";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // game over (walls)
    if (
        snakeX < 0 ||
        snakeX >= cols * blockSize ||
        snakeY < 0 ||
        snakeY >= rows * blockSize
    ) {
        gameOver();
    }

    // game over (self collision)
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver();
        }
    }

    // score display
    context.fillStyle = "white";
    context.font = "20px monospace";
    context.fillText("Score: " + score, 10, 20);
}

function changeDirection(e) {
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

function gameOver(){
    //save high score
    if (score > highscore){
        highscore = score;
        localStorage.setItem("highscore", highscore)
    }
}
gameRunning = false;

//draw game over screen
context.fillStyle = "white";
context.font = "30px monospace"; 
context.fillText("Game Over",80,250);
context.font = "20px monospace";
context.fillText("Press space to restart", 40, 300);
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