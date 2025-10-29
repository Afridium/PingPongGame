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

//ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {
    x: boardWidth / 2 - ballWidth - 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    ballVelocityX: 1,
    ballVelocityY: 2,
}


//keys
const keys = {
    W: 87,
    S: 83,
    UP: 38,
    DOWN: 40
};

let player1Score = 0;
let player2Score = 0;

let isRunning = false;
window.onload = function () {
    board = document.getElementById('board');
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    //draw players or bats
    context.fillStyle = "white";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);
    context.fillRect(player2.x, player2.y, player2.width, player2.height);
    context.fillRect(ball.x, ball.y, ball.width, ball.height);
    document.getElementById('start').addEventListener('click', function () {
        if (isRunning === false) {
            requestAnimationFrame(update);
        }

    })

    document.getElementById('reset').addEventListener('click', function () {
        console.log('reseting');
        location.reload();
    })

    drawMiddleBorder();

    document.addEventListener("keyup", movePlayer);

}

function update() {
    isRunning = true;
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.height, board.width);

    context.fillStyle = "white";
    let newPlayerPos1 = player1.y + player1.playerVelocityY;
    if (!outOfBound(newPlayerPos1)) {
        player1.y = newPlayerPos1;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    let newPlayerPos2 = player2.y + player2.playerVelocityY;
    if (!outOfBound(newPlayerPos2)) {
        player2.y = newPlayerPos2;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    //ball
    context.fillStyle = "white";
    ball.x += ball.ballVelocityX;
    ball.y += ball.ballVelocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);
    if (ball.y <= 0 || (ball.y + ball.height) >= boardHeight) {

        ball.ballVelocityY *= -1;

    }

    //detect Collision
    if (detectCOllision(ball, player1)) {
        if (ball.x <= player1.x + player1.width) {
            ball.ballVelocityX *= -1;
        }
    } else if (detectCOllision(ball, player2)) {
        if (ball.x + ball.width >= player2.x) {
            ball.ballVelocityX *= -1;
        }
    }

    //game over{}
    if (ball.x < 0) {
        player2Score++;
        resetGame(1);
    } else if (ball.x + ball.width > boardWidth) {
        player1Score++;
        resetGame(-1);
    }
    context.font = "45px comic-sans";
    context.fillText(player1Score, boardWidth / 5, 45);
    context.fillText(player2Score, boardWidth * 4 / 5 - 45, 45);

    drawMiddleBorder();
}

function outOfBound(max) {
    return (max < 0 || max + playerHeight > boardHeight);
}

function movePlayer(e) {
    if (e.keyCode === keys.W) {
        player1.playerVelocityY = -3;
    } else if (e.keyCode === keys.S) {
        player1.playerVelocityY = 3;
    }
    if (e.keyCode === keys.UP) {
        player2.playerVelocityY = -3;
    } else if (e.keyCode === keys.DOWN) {
        player2.playerVelocityY = 3;
    }
}

function detectCOllision(a, b) {
    let result = a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
    return result;

}

function resetGame(direction) {
    ball = {
        x: boardWidth / 2,
        y: boardHeight / 2,
        width: ballWidth,
        height: ballHeight,
        ballVelocityX: direction,
        ballVelocityY: 2,
    }
}

function drawMiddleBorder() {
    for (let i = 10; i < board.height; i += 25) {
        context.fillRect(board.width / 2 - 10, i, 5, 5);
    }
}
