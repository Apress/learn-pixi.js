//Aliases
"use strict";

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    Graphics = PIXI.Graphics,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text;

//Create a Pixi stage and renderer
var stage = new Container(),
    renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//let scale = scaleToWindow(renderer.view);

//Set the initial game state
var state = play;

//Define any variables that are used in more than one function
var t = undefined,
    circle = undefined;

setup();

function setup() {

  //Create a new instance of Tink
  t = new Tink(PIXI, renderer.view);

  var circleGraphic = new Graphics();
  circleGraphic.beginFill(16711680);
  circleGraphic.lineStyle(8, 26112, 1);
  circleGraphic.drawCircle(0, 0, 64);
  circleGraphic.endFill();

  //If you want the graphic to be anti-aliased,
  //convert it into a bitmap texture and then use
  //that texture to create a new sprite
  var circleTexture = circleGraphic.generateTexture();
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
  var red = 16711680,
      green = 26112,
      orange = 16750899,
      blue = 3368601,
      yellow = 16776960;

  //Create an array of all the colors
  var colors = [red, green, orange, blue, yellow];

  //Assign the ball's `press` method
  circle.press = function () {
    updateCircle(circle, colors[randomInt(0, 3)], colors[randomInt(0, 3)]);
  };

  //Start the game loop
  gameLoop();
}

function gameLoop() {

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Run the current state
  state();

  //Update Tink
  t.update();

  //Render the stage
  renderer.render(stage);
}

function play() {}

//The `randomInt` helper function
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//A helper function that draws circle shape, turns it into a
//texture, and applies the texture to the sprite
function updateCircle(sprite, fillColor, strokeColor) {

  var circleGraphic = new Graphics();
  circleGraphic.beginFill(fillColor);
  circleGraphic.lineStyle(8, strokeColor, 1);
  circleGraphic.drawCircle(0, 0, 64);
  circleGraphic.endFill();
  var circleTexture = circleGraphic.generateTexture();
  sprite.texture = circleTexture;
}
//# sourceMappingURL=interactiveSprite.js.map