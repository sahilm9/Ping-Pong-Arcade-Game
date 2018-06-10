
  var canvas = document.getElementById("myCanvas"),
  context = canvas.getContext("2d"),
  width = canvas.width,
  height = canvas.height,
  x = canvas.width/2,
  y = canvas.height/2,
  dx,
  dy,
  ballRadius = 10,
  paddleWidth = 10,
  paddleHeight = 100,
  leftPaddleX = 0,
  leftPaddleY = (canvas.height/2)-50,
  computerPaddleY = (canvas.height/2)-50,
  computerPaddleX = canvas.width-paddleWidth,
  upPressed = false,
  downPressed = false,
  winScore = 5,
  playerScore = 0,
  computerScore = 0,
  gameOver = false;