//Aliases
"use strict";

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    TilingSprite = PIXI.extras.TilingSprite;

//Create a Pixi stage and renderer
var stage = new Container(),
    renderer = autoDetectRenderer(512, 512);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//load resources (images and fonts)
loader.add("images/clouds.png").load(setup);

//Set the initial game state
var state = play;

//Define any variables that are used in more than one function
var clouds = undefined;

function setup() {

  clouds = TilingSprite.fromImage("images/clouds.png", 800, 800);
  //clouds.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  stage.addChild(clouds);

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

function play() {

  clouds.tilePosition.x -= 1;
}
//# sourceMappingURL=scrolling.js.map