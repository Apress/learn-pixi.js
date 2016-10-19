//Aliases
let Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  Graphics = PIXI.Graphics,
  Sprite = PIXI.Sprite,
  Text = PIXI.Text;

//Create a Pixi stage and renderer
let stage = new Container(),
  renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//let scale = scaleToWindow(renderer.view);

//Set the initial game state
let state = play;

//Define any variables that are used in more than one function
let t, circle;

setup();
 
function setup() {

  //Create a new instance of Tink
  t = new Tink(PIXI, renderer.view);

  let circleGraphic = new Graphics();
  circleGraphic.beginFill(0xFF0000);
  circleGraphic.lineStyle(8, 0x006600, 1);
  circleGraphic.drawCircle(0, 0, 64);
  circleGraphic.endFill();

  //If you want the graphic to be anti-aliased,
  //convert it into a bitmap texture and then use
  //that texture to create a new sprite
  let circleTexture = circleGraphic.generateTexture();
  circle = new Sprite(circleTexture);
  circle.x = 64;
  circle.y = 64;
  stage.addChild(circle);

  //Add a `circular` property to the circle
  circle.circular = true;

  //Make the circle interactive
  t.makeInteractive(circle);

  //Create variables that reference hexadecimal
  //color values
  let red = 0xFF0000,
      green = 0x006600,
      orange = 0xFF9933,
      blue = 0x336699,
      yellow = 0xFFFF00;

  //Create an array of all the colors
  let colors = [red, green, orange, blue, yellow];

  //Assign the ball's `press` method
  circle.press = () => {
    updateCircle(
      circle,
      colors[randomInt(0, 3)],
      colors[randomInt(0, 3)]
    );
  };

  //Start the game loop
  gameLoop();
}

function gameLoop(){

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Run the current state
  state();

  //Update Tink
  t.update();

  //Render the stage
  renderer.render(stage);
}

function play() {

}

//The `randomInt` helper function
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//A helper function that draws circle shape, turns it into a 
//texture, and applies the texture to the sprite
function updateCircle(sprite, fillColor, strokeColor) {

  let circleGraphic = new Graphics();
  circleGraphic.beginFill(fillColor);
  circleGraphic.lineStyle(8, strokeColor, 1);
  circleGraphic.drawCircle(0, 0, 64);
  circleGraphic.endFill();
  let circleTexture = circleGraphic.generateTexture();
  sprite.texture = circleTexture; 
}

