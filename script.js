let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];

snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

// default direction
let direction = "right";

// create food in a random position
let food = createRandomFood();

function createBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

function createRandomFood() {
  return {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
  };
}

document.addEventListener("keydown", update);

// Move the snake to a chosen direction
function update(event) {
  if (event.keyCode === 37 && direction !== "right") direction = "left";
  if (event.keyCode === 38 && direction !== "down") direction = "up";
  if (event.keyCode === 39 && direction !== "left") direction = "right";
  if (event.keyCode === 40 && direction !== "up") direction = "down";
}

// Prepare the game environment
function startGame() {
  if (snake[0].x > 15 * box && direction === "right") snake[0].x = 0;
  if (snake[0].x < 0 * box && direction === "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction === "down") snake[0].y = 0;
  if (snake[0].y < 0 * box && direction === "up") snake[0].y = 16 * box;

  // checking for collision with own body
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      clearInterval(jogo);
      alert("Game Over!");
    }
  }

  createBG();
  createSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Updates snake length
  if (direction === "right") snakeX += box;
  if (direction === "left") snakeX -= box;
  if (direction === "up") snakeY -= box;
  if (direction === "down") snakeY += box;

  if (snakeX !== food.x || snakeY !== food.y) {
    snake.pop();
  } else {
    food = createRandomFood();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

let jogo = setInterval(startGame, 100);
