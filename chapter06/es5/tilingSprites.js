//Aliases
"use strict";

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    TilingSprite = PIXI.extras.TilingSprite;

//Create a Pixi stage and renderer
var stage = new Container(),
    renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//load resources (images and fonts)
loader.add("images/tile.png").load(setup);

//Set the initial game state
var state = play;

//Define any variables that are used in more than one function
var tilingSprite = undefined;

function setup() {

  tilingSprite = new TilingSprite(TextureCache["images/tile.png"], 192, 192);

  //Alternatively, you can make a tiling sprite from a texture like this:
  //let texture = TextureCache["images/tile.png"];
  //tilingSprite = new TilingSprite(texture, 192, 192);

  tilingSprite.position.set(32, 32);
  stage.addChild(tilingSprite);

  //Optionally offset the tile's x and y positions
  /*
  tilingSprite.tilePosition.x = 32;
  tilingSprite.tilePosition.y = 32; 
  */

  //Optionally change the tile's scale
  //tilingSprite.tileScale.x = 1.5;
  //tilingSprite.tileScale.y = 1.5;

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
//# sourceMappingURL=tilingSprites.js.map