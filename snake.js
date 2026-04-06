
//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;


window.onload = function(){
    board = document. getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2D"); //used for drawing on the board

    update()
}

function update() {
    context.fillStyle="#031533";
    context.fillRect(0, 0, board.width, board,height);

    context.fillStyle="#32dbbf";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
}