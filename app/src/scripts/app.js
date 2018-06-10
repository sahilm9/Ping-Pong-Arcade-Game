// Storing the reference of the canvas element in canvas variable
var canvas = document.getElementById("myCanvas"),
// a variable to store the 2D rendering context, the actual tool used to paint the canvas
context = canvas.getContext("2d"),
// a variable to store the center of width(starting position of ball in x-axis)
x = canvas.width / 2,
// a variable to store the starting position of ball in y-axis
y = canvas.height / 2,
// a variale to store the change value of x for every frame
dx,
// a variable to store the change value of y for every frame
dy,
// a variable to store radius of the ball
ballRadius = 10,
// a variable to store the width of the paddle
paddleWidth = 10,
// a variable to store the height of the paddle
paddleHeight = 100,
// a variable to store the starting position of palyer's paddle in X-axis
playerPaddleX = 0,
// a variable to store the starting position of player's paddle in Y-axis
playerPaddleY = (canvas.height / 2) - 50,
// a variable to store the starting position of computer's paddle in Y-axis
computerPaddleY = (canvas.height / 2) - 50,
// a variable to store the starting position of computer's paddle in X-axis
computerPaddleX = canvas.width - paddleWidth,
// a variable to check to help if up button on keyboard is pressed
upPressed = false,
// a variable to check to help if down button on keyboard is pressed
downPressed = false,
// a variable to set the winning core
winScore = 5,
// a variable to set the palyer score
playerScore = 0,
//a variable to set the computer score
computerScore = 0,
// a variable to check game status
gameOver = false;

//beginPath method begins a path or resets the current beginPath
//closePath method creates a path from the current point back to starting point

// a function to generate random directions
function randomDirections() {
  Math.random() < 0.5 ? dx = +6 : dx = -6;
  Math.random() < 0.5 ? dy = -6 : dy = +6;
};
randomDirections();
// eventListener to check for keydown and call callback keyPressHandler
document.addEventListener("keydown", keyPressedHandler);
// eventListener to check for keyup and call callback keyReleasedHandler
document.addEventListener("keyup", keyReleasedHandler);
// eventListener to check for mousemove and call callback mouseMoveHandler
document.addEventListener("mousemove", mouseMoveHandler);
// eventListener to check for click and call callback clickHandler
canvas.addEventListener("click", clickHandler);

// 'e' an object passed with various properties when keyDown event is fired
function keyPressedHandler(e) {
  /*
  checking to see if the up button is pressed on keyboard which corresponds to 38
  and setting the upPressed to true
  */
  if (e.keyCode === 38) upPressed = true;
  /*
  checking to see if the down button is pressed on keyboard which corresponds to 40
  and setting the downPressed to true
  */
  else if (e.keyCode === 40) downPressed = true;
}
// 'e' an object passed with various properties when keyUp event is fired
function keyReleasedHandler(e) {
  /*
  checking to see if the up button is released on keyboard which corresponds to 38
  and setting the upPressed to false
  */
  if (e.keyCode === 38) upPressed = false;
  /*
  checking to see if the down button is released on keyboard which corresponds to 40
  and setting the downPressed to false
  */
  else if (e.keyCode === 40) downPressed = false;
}
// 'e' an object passed with various properties when mousemove event is fired
function clickHandler(e) {
  // check if gameOver is true
  if (gameOver) {
    // reload the page
    document.location.reload();
  }
  // if gameOver is false, do nothing
}
// function for moveMouseHandler
function mouseMoveHandler(e) {
  /*
	clientX returns the horizontal coordinate of the mouse pointer when a mouse
	event was triggered, relative holds the position of starting point of canvas
	*/
  let relativeX = e.clientX - canvas.offsetLeft;
  /*
	clientY returns the vertical coordinate of the mouse pointer when a mouse
	event was triggered, relative holds the position of starting point of canvas
	*/
  let relativeY = e.clientY;
  /*
	Checking to see if pointer is within the canvas boundaries and checking
	when paddle just tocuhes the edge of the walls
	*/
  if ((relativeX > 0 && relativeX < canvas.width) &&
    (relativeY > 0 + paddleHeight / 2 && relativeY < canvas.height - paddleHeight / 2)) {
    // making sure that movement is relative to middle of the paddle
    playerPaddleY = relativeY - paddleHeight / 2;
  }
}
// a function to compute movement of computer paddle
function computeMovement() {
  // store the center of the computer paddle
  let computerPaddleCenter = computerPaddleY + paddleHeight / 2;
  // Chase the ball till y is within 20 pixels above the paddle center position
  if (computerPaddleCenter < y - 20) {
    // move computerPaddle up by 5 pixels
    computerPaddleY += 5;
  }
  // Chase the ball after y is more than 20 pixels below the paddle center position
  else if (computerPaddleCenter > y + 20) {
    // move computerPaddle down by 5 pixels
    computerPaddleY -= 5;
  }
}
// a function to draw score
function drawScore() {
  // setting the font of the text
  context.font = "16px Monospace";
  // fillStyle is used to set property color
  context.fillStyle = "#fff";
  /*
	fill text is used to draw filled text on the canvas, 50, 100 are X and Y
	coordinates on the canvas
	*/
  context.fillText(`Your score: ${playerScore}`, 50, 100);
  context.fillText(`Computer score: ${computerScore}`, canvas.width - 225, 100);

}
// a function to display different content when the game finishes
function winScreen() {
  // setting the font of the text
  context.font = "16px Monospace";
  // fillStyle is used to set property color
  context.fillStyle = "#fff";
  // check which player has won and display the text
  playerScore === winScore ? context.fillText(`You won`, 280, 200) : context.fillText(`Computer won`, 280, 200);
  /*
	fill text is used to draw filled text on the canvas, 150, 500 are X and Y
	coordinates on the canvas
	*/
  context.fillText(`Click anywhere in the canvas to restart`, 150, 500);
}
// a function to draw the ball
function drawBall() {
  context.beginPath();
  /*
	x and y for center point, followed by ballRadius followed
	by start angle, end angle(which are in radians) drawing direction,
	clockwise or anticlockwise, default is false which is clockwise,
	so not specified here
	*/
  context.arc(x, y, ballRadius, 0, Math.PI * 2);
  // fill style is used to set property color
  context.fillStyle = '#fff';
  // fill method is used to fill
  context.fill();
  context.closePath();
}
// a function to draw the paddle
function drawPaddle(playerX, topY, width, height) {
  context.beginPath();
  /*
	the first 2 values specify the co-ordinates from top-left
	of the canvas and next width and height
	*/
  context.rect(playerX, topY, width, height);
  // fillStyle is used to set property color
  context.fillStyle = "#fff";
  // fill method is used to fill
  context.fill();
  context.closePath();
}
// a function to invoke draw functions and game logic
function draw() {
  /*
	 A method that clears the specified pixels within a given a rectangle,
	 clearing the entire canvas below, the method takes 4 parameters,
	 x and y of top left and x and y of bottom right. So, clearing the
	 rectangle for every frame and then drawing required items, so that
	 it appears that the ball is moving
	*/
  context.clearRect(0, 0, canvas.width, canvas.height);
  /*
  Check to see if game is finished, if it is, display the winscreen and exit the function
  */
  if (gameOver) {
    winScreen();
    return;
  }
  // invoke th drawball using drawBall function
  drawBall();
  // draw player paddle using drawPaddle function
  drawPaddle(playerPaddleX, playerPaddleY, paddleWidth, paddleHeight);
  // draw computer paddle using drawPaddle function
  drawPaddle(computerPaddleX, computerPaddleY, paddleWidth, paddleHeight);
  // Computer the movement of computer paddle
  computeMovement();
  // draw scores
  drawScore();
  /*
	checking to see if ball is touching left of the canvas, used ballRadius
	instead of 0 because we want to check the ball just touches the left of
	the canvas and not center of the ball touching the left of the canvas, by
	using ball Radius(10) we are making to sure we check when ball just touches the
	top of the canvas
	*/
  if (x + dx < ballRadius) {
    /*
		checking to see if y postion of the ball is within paddle height,
		playerPaddleY specifies paddle starting position on Y-axis and paddleY+paddleHeight
		specifies the height of the paddle
		*/
    if ((y > playerPaddleY && y < playerPaddleY + paddleHeight) && x < ballRadius + paddleWidth) {
      // reversing the direction of the ball
      dx = -dx;
    } else {
      // if misses the paddles, increment computer score
      computerScore++;
      // check to see if computer score is equal to winScore
      if (computerScore === winScore) {
        // set the gameOver to true
        gameOver = true;
      }
      // else, restart the game
      else {
        // set the co-ordinates of ball
        x = canvas.width / 2;
        y = canvas.height / 2;
        // call randomDirections function to get the direction of the ball
        randomDirections();
        // set the playerPaddleY to it's starting position
        playerPaddleY = (canvas.height / 2) - 50;
      }
    }
  }
  /*
	checking to see if ball is touching right of the canvas, similar to above, we
	want to check when ball just touches the right of the canvas and not the center
	of ball touching the right of the canvas, so we are subtracting canvas width-
	ball radius
	*/
  else if (x + dx > canvas.width - ballRadius) {
    /*
    checking to see if y postion of the ball is within paddle height,
    computerPaddleY specifies paddle starting position on Y-axis and computerPaddleY+paddleHeight
    specifies the height of the paddle
    */
    if ((y > computerPaddleY && y < computerPaddleY + paddleHeight) && x > ballRadius + paddleWidth) {
      // reversing the direction of the bal
      dx = -dx;
    }
    // if misses the paddles
    else {
      // increment player score
      playerScore++;
      // check to see if palyer score is equal to winScore
      if (playerScore === winScore) {
        // set the gameOver to true
        gameOver = true;
      }
      // else, restart the game
      else {
        // set the co-ordinates of ball
        x = canvas.width / 2;
        y = canvas.height / 2;
        // call randomDirections function to get the direction of the ball
        randomDirections();
        // set the playerPaddleY to it's starting position
        playerPaddleY = (canvas.height / 2) - 50;
      }
    }
  }
  /*
	checking to see if ball touches top of the canvas, like above, as we
	want the condition to be ball just touching the top edge of the canvas
	and not when the center of the ball touching the top of the canvas,
  we are comparing y+dy < ballRadius. The other condition is checking if ball is
  touching the bottom of the canvas, as above, we want to check for outside of
  ball just touching, we are writing the condition to be canvas.height-ballRadius
	*/
  if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
    dy = -dy;
  }
  /*
	checking to see if down key is pressed and if the starting of the paddle is
	less than canvas.height-paddleHeight so that we are limiting the movement of
	paddle to right with in the canvas
	*/
  if (downPressed && playerPaddleY < canvas.height - paddleHeight) {
    // moving the paddle up by 4 pixels
    playerPaddleY += 4;
  }
  /*
	checking to see if up key is pressed and if the starting of the paddle is
	greater than 0 so that we are limiting the movement of paddle to left with in
	the canvas
  */
  else if (upPressed && playerPaddleY > 0) {
    // moving the paddle down by 4 pixels
    playerPaddleY -= 4;
  }
  // adding 4 for every frame
  x += dx;
  // subtracting 4 for every frame
  y += dy;
  /*
	helps the browser to render the game better by giving the control of framerate
	to browser. It will sync the framerate accordnily and render the shapes when
	required resulting in efficient and smoother animation loop
	*/
  requestAnimationFrame(draw);
}

draw();