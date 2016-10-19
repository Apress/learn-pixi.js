//Aliases
let Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
  Sprite = PIXI.Sprite,
  Graphics = PIXI.Graphics;

//Create a Pixi stage and renderer
let stage = new Container(),
  renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//Set the initial game state
let state = play;

//Define any variables that are used in more than one function
let line;

//Run the `setup` function
setup();

function setup() {

  line = new Graphics();
  stage.addChild(line);

  line.angleA = 0;
  line.angleB = 0;

  //Start the game loop
  gameLoop();
}

function gameLoop(){

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Run the current state
  state();

  //Render the stage
  renderer.render(stage);
}

function play() {

  //Make the line's start point rotate clockwise around
  //x/y point 64, 64. `rotateAroundPoint` returns an
  //object with `x` and `y` properties
  //containing the point's new rotated position
  line.angleA += 0.02;
  let rotatingA = rotateAroundPoint(64, 64, 20, 20, line.angleA);

  //Make the line's end point rotate counter-clockwise around x/y point 192, 208
  line.angleB -= 0.03;
  let rotatingB = rotateAroundPoint(192, 208, 20, 20, line.angleB);

  //Clear the line to reset it from the previous frame
  line.clear();

  //Draw the line using the rotating points as start and end points
  line.lineStyle(4, 0x000000, 1);
  line.moveTo(rotatingA.x, rotatingA.y);
  line.lineTo(rotatingB.x, rotatingB.y);
}

function rotateAroundPoint(pointX, pointY, distanceX, distanceY, angle) {
 let point = {};
 point.x = pointX + Math.cos(angle) * distanceX;
 point.y = pointY + Math.sin(angle) * distanceY;
 return point;
}

