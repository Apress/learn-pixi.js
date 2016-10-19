//Aliases
"use strict";

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    RenderTexture = PIXI.RenderTexture,
    resources = PIXI.loader.resources,
    TilingSprite = PIXI.extras.TilingSprite;

//Create a Pixi stage and renderer
var stage = new Container(),
    renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//load resources (images and fonts)
loader.add("video/how.mp4").load(setup);

//Set the initial game state
var state = play;

function setup() {

  console.log("loaded");

  var videoTexture = new PIXI.VideoBaseTexture.fromUrl("video/how.mp4");
  var video = new Sprite(videoTexture);
  stage.addChild(video);

  var videoSource = videoTexture.baseTexture.source;
  videoSource.play();
  /* 
   let videoTexture = Texture.fromVideo("video/how.mp4");
   let videoSprite = new Sprite(videoTexture);
   stage.addChild(videoSprite);
   
    let videoSource = videoTexture.baseTexture.source;
   videoSource.play();
   */

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
//# sourceMappingURL=video.js.map