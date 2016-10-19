//Aliases
let Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
  Sprite = PIXI.Sprite,
  Graphics = PIXI.Graphics;

//Create a Pixi stage and renderer
let stage = new Container(),
  renderer = autoDetectRenderer(464, 164);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//Set the initial game state
let state = play;

//Run the `setup` function
setup();
 
function setup() {

  //Create a single graphics context
  let ctx = new Graphics();

  //Draw a rectangle on the context
  ctx.beginFill(0x0033CC);
  ctx.lineStyle(4, 0xFF0000, 1);
  ctx.drawRect(32, 32, 96, 96);
  ctx.endFill();

  //Draw a circle without an outline
  ctx.beginFill(0xFF9933);
  ctx.lineStyle(0);
  ctx.drawCircle(224, 80, 48);
  ctx.endFill();

  //Draw a line
  ctx.lineStyle(4, 0x000000, 1);
  ctx.moveTo(320, 48);
  ctx.lineTo(420, 112);

  //Add the graphics context to the stage
  stage.addChild(ctx);

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

  //Any animation code goes here
}
