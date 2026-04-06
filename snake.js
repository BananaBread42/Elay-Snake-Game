
//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

//food
var foodX;
var foodY;

window.onload = function(){
    board = document. getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2D"); //used for drawing on the board

    placeFood();
    update()
}

function update() {
    context.fillStyle="#031533";
    context.fillRect(0, 0, board.width, board,height);

    context.fillStyle="#32dbbf";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    context.fillStyle="#9c0e0e"
    context.fillRect(foodX, FoodY, blockSize, blocksize);
}


function placeFood(){
    //0.1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random()* cols) * blocksize;
    foodY = Math.floor(Math.random()* rows) * blockSize;
    
}