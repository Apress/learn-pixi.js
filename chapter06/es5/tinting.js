//Aliases
"use strict";

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    RenderTexture = PIXI.RenderTexture,
    TilingSprite = PIXI.extras.TilingSprite;

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
    hedgehog = undefined,
    tiger = undefined,
    id = undefined;

function setup() {

  //An alias for the texture atlas frame ids
  id = resources["images/animals.json"].textures;

  cat = new Sprite(id["cat.png"]);
  cat.position.set(32, 32);
  stage.addChild(cat);

  hedgehog = new Sprite(id["hedgehog.png"]);
  hedgehog.position.set(96, 96);
  stage.addChild(hedgehog);

  tiger = new Sprite(id["tiger.png"]);
  tiger.position.set(160, 160);
  stage.addChild(tiger);

  //Change the tint
  cat.tint = 16774752;
  tiger.tint = 6750054;
  hedgehog.tint = 16737894;

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
//# sourceMappingURL=tinting.js.map