var canvas = document.getElementById("myCanvas"),
  context = canvas.getContext("2d"),
  width = canvas.width,
  height = canvas.height,
  x = canvas.width / 2,
  y = canvas.height / 2,
  dx,
  dy,
  ballRadius = 10,
  paddleWidth = 10,
  paddleHeight = 100,
  playerPaddleX = 0,
  playerPaddleY = (canvas.height / 2) - 50,
  computerPaddleY = (canvas.height / 2) - 50,
  computerPaddleX = canvas.width - paddleWidth,
  upPressed = false,
  downPressed = false,
  winScore = 5,
  playerScore = 0,
  computerScore = 0,
  gameOver = false;

function randomDirections() {
  Math.random() < 0.5 ? dx = +6 : dx = -6;
  Math.random() < 0.5 ? dy = -6 : dy = +6;
};
randomDirections();

function drawBall() {
  context.beginPath();
  context.arc(x, y, ballRadius, 0, Math.PI * 2);
  context.fillStyle = '#fff';
  context.fill();
  context.closePath();
}

function drawPaddle(playerX, topY, width, height) {
  context.beginPath();
  context.rect(playerX, topY, width, height);
  context.fillStyle = "#fff";
  context.fill();
  context.closePath();
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle(playerPaddleX, playerPaddleY, paddleWidth, paddleHeight);
  drawPaddle(computerPaddleX, computerPaddleY, paddleWidth, paddleHeight);

  if (x + dx < ballRadius) {
    if ((y > playerPaddleY && y < playerPaddleY + paddleHeight) && x < ballRadius + paddleWidth) {
      dx = -dx;
    } else {
      computerScore++;
      if (computerScore === winScore) {
        gameOver = true;
      } else {
        x = canvas.width / 2;
        y = canvas.height / 2;
        randomDirections();
        playerPaddleY = (canvas.height / 2) - 50;
      }
    }
  } else if (x + dx > canvas.width - ballRadius) {
    if ((y > computerPaddleY && y < computerPaddleY + paddleHeight) && x > ballRadius + paddleWidth) {
      dx = -dx;
    } else {
      playerScore++;
      if (playerScore === winScore) {
        gameOver = true;
      } else {
        x = canvas.width / 2;
        y = canvas.height / 2;
        randomDirections();
        playerPaddleY = (canvas.height / 2) - 50;
      }
    }
  }

  if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
    dy = -dy;
  }
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();