/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
    playerPaddleY = canvas.height / 2 - 50,
    computerPaddleY = canvas.height / 2 - 50,
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

function keyPressedHandler(e) {
  if (e.keyCode === 38) upPressed = true;else if (e.keyCode === 40) downPressed = true;
}

function keyReleasedHandler(e) {
  if (e.keyCode === 38) upPressed = false;else if (e.keyCode === 40) downPressed = false;
}
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  var relativeY = e.clientY;
  if (relativeX > 0 && relativeX < canvas.width && relativeY > 0 + paddleHeight / 2 && relativeY < canvas.height - paddleHeight / 2) {
    playerPaddleY = relativeY - paddleHeight / 2;
  }
}
function computeMovement() {
  var computerPaddleCenter = computerPaddleY + paddleHeight / 2;
  if (computerPaddleCenter < y - 20) {
    computerPaddleY += 5;
  } else if (computerPaddleCenter > y + 20) {
    computerPaddleY -= 5;
  }
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
  drawBall();
  drawPaddle(playerPaddleX, playerPaddleY, paddleWidth, paddleHeight);
  drawPaddle(computerPaddleX, computerPaddleY, paddleWidth, paddleHeight);
  computeMovement();

  if (x + dx < ballRadius) {
    if (y > playerPaddleY && y < playerPaddleY + paddleHeight && x < ballRadius + paddleWidth) {
      dx = -dx;
    } else {
      computerScore++;
      if (computerScore === winScore) {
        gameOver = true;
      } else {
        x = canvas.width / 2;
        y = canvas.height / 2;
        randomDirections();
        playerPaddleY = canvas.height / 2 - 50;
      }
    }
  } else if (x + dx > canvas.width - ballRadius) {
    if (y > computerPaddleY && y < computerPaddleY + paddleHeight && x > ballRadius + paddleWidth) {
      dx = -dx;
    } else {
      playerScore++;
      if (playerScore === winScore) {
        gameOver = true;
      } else {
        x = canvas.width / 2;
        y = canvas.height / 2;
        randomDirections();
        playerPaddleY = canvas.height / 2 - 50;
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

/***/ })
/******/ ]);