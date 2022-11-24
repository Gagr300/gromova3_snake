const cvs = document.getElementById("canvas")
const context = cvs.getContext("2d");

const backGround = new Image();
const apple = new Image();

backGround.src = 'img/background.png';
apple.src = 'img/apple.png';

let grid = 24;
let speed = 0;
let speedgrowing = 4;
const del = 50;

let snake = {
  x: 160,
  y: 160 + del,
  
  dx: grid,
  dy: 0,

  way: [],
  llen: 4,

  maxllen: 4
};

let food = {
  x: 0 ,
  y: 0
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function draw(){
  context.clearRect(0, 0, 600, 600 + del);

  context.drawImage(backGround, 0, 0);
  context.drawImage(apple, food.x, food.y, grid, grid);
  
  context.fillStyle = '#124704';
  context.fillRect(0, 0, 600, 50);
  
  context.drawImage(apple, 0, grid*0.6, grid, grid);

  context.fillStyle = 'white';
  context.font ='22px Arial';
  context.fillText(snake.llen,  grid, grid*1.5);
 
  context.fillStyle = 'white';
  context.font = '12px Arial';
  context.fillText('Max Length:',  500, grid*1.5);

  context.fillStyle = 'white';
  context.font = '22px Arial';
  context.fillText(snake.maxllen,  570, grid*1.5);

}

function refresh(){
  snake.x = 160;
  snake.y = 160;
  snake.way = [];
  snake.llen = 4;
  snake.dx = grid;
  snake.dy = 0;
  speedgrowing = 4;

  food.x = getRandomInt(0, 25) * grid;
  food.y = getRandomInt(0, 25) * grid  + del;
  context.drawImage(apple, food.x , food.y, grid + 5, grid + 5);
}

function growUp(){
  snake.llen++;
  apple.remove();
  
  snake.maxllen=Math.max(snake.maxllen,snake.llen);
  
  food.x = getRandomInt(0, 25) * grid;
  food.y = getRandomInt(0, 25) * grid + del;

  if (speedgrowing > 2.6) speedgrowing -= 0.2;
}

function loop() {
  
  requestAnimationFrame(loop);
  if ((speed += 0.5) < speedgrowing) return;

  speed = 0;
  draw();

  snake.x += snake.dx;
  snake.y += snake.dy;

  context.fillStyle = '#362824';
  snake.way.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
    if (cell.x === food.x && cell.y === food.y) growUp();
    for (var i = index + 1; i < snake.way.length; i++) {  // столкнулась ли змея сама с собой
      if (cell.x == snake.way[i].x && cell.y == snake.way[i].y) refresh();
    }
  });

  // Если змейка достигла края поля
  if (snake.x < 0) snake.x = canvas.width - grid;
  else if (snake.x >= canvas.width)    snake.x = 0;
  if (snake.y < 0 + del) snake.y = canvas.height - grid;
  else if (snake.y >= canvas.height) snake.y = 0 + del;

  snake.way.unshift({ x: snake.x, y: snake.y });
  if (snake.way.length > snake.llen)  snake.way.pop();  

 
}

document.addEventListener('keydown', function (e) {
  if (e.which === 37 && snake.dx === 0) { // влево
    snake.dx = -grid;
    snake.dy = 0;
  }
  else if (e.which === 39 && snake.dx === 0) { // вправо
    snake.dx = grid;
    snake.dy = 0;
  }
  else if (e.which === 38 && snake.dy === 0) { // вверх
    snake.dy = -grid;
    snake.dx = 0;
  }
  else if (e.which === 40 && snake.dy === 0) { // вниз
    snake.dy = grid;
    snake.dx = 0;
  }
});


food.x = getRandomInt(0, 25) * grid;
food.y = getRandomInt(0, 25) * grid  + del;
apple.onload = draw;

requestAnimationFrame(loop);
