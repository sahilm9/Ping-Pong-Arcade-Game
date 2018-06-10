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
  leftPaddleX = 0,
  leftPaddleY = (canvas.height / 2) - 50,
  computerPaddleY = (canvas.height / 2) - 50,
  computerPaddleX = canvas.width - paddleWidth,
  upPressed = false,
  downPressed = false,
  winScore = 5,
  playerScore = 0,
  computerScore = 0,
  gameOver = false;

  function drawBall(){
      context.beginPath();
      context.arc(x, y,ballRadius, 0, Math.PI*2 );
      context.fillStyle = '#fff';
      context.fill();
      context.closePath();
    }

    function drawPaddle(leftX,topY, width, height){
      context.beginPath();
      context.rect(leftX,topY,width,height);
      context.fillStyle = "#fff";
      context.fill();
      context.closePath();
    }

    function draw(){
      context.clearRect(0,0,canvas.width,canvas.height);
      drawBall();
      drawPaddle(leftPaddleX, leftPaddleY,paddleWidth, paddleHeight);
      drawPaddle(computerPaddleX, computerPaddleY,paddleWidth, paddleHeight);
      requestAnimationFrame(draw);
    }

  draw();