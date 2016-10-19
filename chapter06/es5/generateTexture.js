//Aliases
"use strict";

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    Graphics = PIXI.Graphics;

//Create a Pixi stage and renderer
var stage = new Container(),
    renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//Set the initial game state
var state = play;

setup();

//Define any variables that are used in more than one function

function setup() {

  //Triangle
  var triangle = new Graphics();
  triangle.beginFill(16724736);
  triangle.lineStyle(4, 3368601, 1);
  triangle.moveTo(0, 0);
  triangle.lineTo(-64, 64);
  triangle.lineTo(64, 64);
  triangle.lineTo(0, 0);
  triangle.endFill();

  //The x/y position is the first point of the triangle
  triangle.x = 92;
  triangle.y = 32;
  stage.addChild(triangle);

  var triangleTexture = triangle.generateTexture();
  var triangleSprite = new Sprite(triangleTexture);
  triangleSprite.position.set(92, 128);

  stage.addChild(triangleSprite);

  //Start the game loop
  gameLoop();
}

function gameLoop() {

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Run the current state
  state();

  //Render the stage
  renderer.render(stage);
}

function play() {}
//# sourceMappingURL=generateTexture.js.map