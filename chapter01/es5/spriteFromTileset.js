//Aliases
"use strict";

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;

//Create a Pixi stage and renderer and add the
//renderer.view to the DOM
var stage = new Container(),
    renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//load an image and run the `setup` function when it's done
loader.add("images/tileset.png").load(setup);

function setup() {

  //Create the `tileset` sprite from the texture
  var texture = TextureCache["images/tileset.png"];

  //Fix possible texture bleed
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  //Create a rectangle object that defines the position and
  //size of the sub-image you want to extract from the texture
  var rectangle = new Rectangle(160, 256, 32, 32);

  //Tell the texture to use that rectangular section
  texture.frame = rectangle;

  //Create the sprite from the texture
  var adventuress = new Sprite(texture);

  //Position the sprite on the canvas
  adventuress.x = 64;
  adventuress.y = 64;

  //Scale the sprite up
  adventuress.scale.set(3, 3);

  //Add the sprite to the stage
  stage.addChild(adventuress);

  //Render the stage  
  renderer.render(stage);
}
//# sourceMappingURL=spriteFromTileset.js.map