
//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

window.onload = function(){
    board = document. getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2D"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    //update();
    setInterval(update, 1000/10); //100 milliseconds
}

function update() {
    context.fillStyle="#031533";
    context.fillRect(0, 0, board.width, board,height);

    context.fillStyle="#9c0e0e"
    context.fillRect([foodX, FoodY]);

    if (snakeX == foodX && snakeY == FoodY){
        snakeBody.push([foodX, foodY, blockSize, blockSize])
        placeFood();
    }

    for (let i = snakeBody.length-1; i >0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length){
        snakeBody [0] = [snakeX, snakeY];
    }

    context.fillStyle="#32dbbf";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for(let i = 0; i < snakeBody.length; i ++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }
}

function changeDirection(){
    if (e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood(){
    //0.1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random()* cols) * blocksize;
    foodY = Math.floor(Math.random()* rows) * blockSize;
    
}