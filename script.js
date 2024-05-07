const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{ x: 10, y: 10 }];
let apple = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;

function drawSnake() {
  snake.forEach(segment => {
    ctx.fillStyle = '#1abc9c';
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
  });
}

function drawApple() {
  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize - 2, gridSize - 2);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === apple.x && head.y === apple.y) {
    score++;
    generateApple();
  } else {
    snake.pop();
  }
}

function generateApple() {
  apple = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
}

function checkCollision() {
  if (snake[0].x < 0 || snake[0].x >= tileCount || snake[0].y < 0 || snake[0].y >= tileCount) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  return false;
}

function drawScore() {
  ctx.fillStyle = '#fff';
  ctx.font = '16px Arial';
  ctx.fillText(`Score: ${score}`, 10, 20);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawApple();
  moveSnake();
  drawScore();
  if (checkCollision()) {
    clearInterval(gameInterval);
    ctx.fillStyle = '#fff';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
  }
}

generateApple();
let gameInterval = setInterval(gameLoop, 100);

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && dy === 0) {
    dx = 0;
    dy = -1;
  }
  if (e.key === 'ArrowDown' && dy === 0) {
    dx = 0;
    dy = 1;
  }
  if (e.key === 'ArrowLeft' && dx === 0) {
    dx = -1;
    dy = 0;
  }
  if (e.key === 'ArrowRight' && dx === 0) {
    dx = 1;
    dy = 0;
  }
});