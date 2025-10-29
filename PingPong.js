let board;
let boardWidth = 500;
let boardHeight = 500;
let context;
let velocityY = 0;

//pingpong bats or rectangle
let playerWidth = 10;
let playerHeight = 50;

let player1 = {
    x: 10,
    y: boardHeight / 2,
    width: playerWidth,
    height: playerHeight,
    playerVelocityY: velocityY
}

let player2 = {
    x: 480,
    y: boardHeight / 2,
    width: playerWidth,
    height: playerHeight,
    playerVelocityY: velocityY
}

//keys
const keys = {
  W: 87,
  S: 83,
  UP: 38,
  DOWN: 40
};

window.onload = function () {
    board = document.getElementById('board');
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    //draw players or bats
    context.fillStyle = "white";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    requestAnimationFrame(update);
    document.addEventListener("keyup", movePlayer);
    
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0,0,board.height, board.width);
    context.fillStyle = "white";
    player1.y += player1.playerVelocityY;
    context.fillRect(player1.x, player1.y, player1.width, player1.height);
    player2.y += player2.playerVelocityY;
    context.fillRect(player2.x, player2.y, player2.width, player2.height);
}

function movePlayer(e){
    if(e.keyCode === keys.W){
        player1.playerVelocityY = -3;
    }else if(e.keyCode === keys.S){
        player1.playerVelocityY = 3;
    }
    if(e.keyCode === keys.UP){
        player2.playerVelocityY = -3;
    }else if(e.keyCode === keys.DOWN){
        player2.playerVelocityY = 3;
    }
}