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
document.addEventListener("keydown", keyPressedHandler);
document.addEventListener("keyup", keyReleasedHandler);
document.addEventListener("mousemove", mouseMoveHandler);
canvas.addEventListener("click", clickHandler);

function keyPressedHandler(e) {
  if (e.keyCode === 38) upPressed = true;
  else if (e.keyCode === 40) downPressed = true;
}

function keyReleasedHandler(e) {
  if (e.keyCode === 38) upPressed = false;
  else if (e.keyCode === 40) downPressed = false;
}

function clickHandler(e) {
  if (gameOver) {
    document.location.reload();
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  var relativeY = e.clientY;
  if ((relativeX > 0 && relativeX < canvas.width) &&
    (relativeY > 0 + paddleHeight / 2 && relativeY < canvas.height - paddleHeight / 2)) {
    playerPaddleY = relativeY - paddleHeight / 2;
  }
}

function computeMovement() {
  let computerPaddleCenter = computerPaddleY + paddleHeight / 2;
  if (computerPaddleCenter < y - 20) {
    computerPaddleY += 5;
  } else if (computerPaddleCenter > y + 20) {
    computerPaddleY -= 5;
  }
}

function drawScore() {
  context.font = "16px Monospace";
  context.fillStyle = "#fff";
  context.fillText(`Your score: ${playerScore}`, 50, 100);
  context.fillText(`Computer score: ${computerScore}`, canvas.width - 225, 100);

}

function winScreen() {
  context.font = "16px Monospace";
  context.fillStyle = "#fff";
  playerScore === winScore ? context.fillText(`You won`, 280, 200) : context.fillText(`Computer won`, 280, 200);
  context.fillText(`Click anywhere in the canvas to restart`, 150, 500);
}

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
  if (gameOver) {
    winScreen();
    return;
  }
  drawBall();
  drawPaddle(playerPaddleX, playerPaddleY, paddleWidth, paddleHeight);
  drawPaddle(computerPaddleX, computerPaddleY, paddleWidth, paddleHeight);
  computeMovement();
  drawScore();


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
  if (downPressed && playerPaddleY < canvas.height - paddleHeight) {
    playerPaddleY += 4;
  } else if (upPressed && playerPaddleY > 0) {
    playerPaddleY -= 4;
  }
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();