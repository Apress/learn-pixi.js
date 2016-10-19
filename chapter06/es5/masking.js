//Aliases
"use strict";

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
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

//load resources (images and fonts)
loader.add("images/animals.json").load(setup);

//Set the initial game state
var state = play;

//Define any variables that are used in more than one function
var cat = undefined,
    id = undefined;

function setup() {

  //An alias for the texture atlas frame ids
  id = resources["images/animals.json"].textures;

  //Make a sprite
  cat = new Sprite(id["cat.png"]);
  cat.position.set(32, 32);
  cat.scale.set(3, 3);
  stage.addChild(cat);

  //Make a rectangle
  var rectangle = new Graphics();
  rectangle.beginFill(16711680);
  rectangle.drawRect(0, 0, 128, 128);
  rectangle.endFill();
  rectangle.x = 64;
  rectangle.y = 64;
  stage.addChild(rectangle);

  //Mask the cat with the rectangle
  cat.mask = rectangle;

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
//# sourceMappingURL=masking.js.map