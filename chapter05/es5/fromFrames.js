//Aliases
"use strict";

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Rectangle = PIXI.Rectangle,
    MovieClip = PIXI.extras.MovieClip;

//Create a Pixi stage and renderer
var stage = new Container(),
    renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//load resources (images and fonts)
loader.add("images/pixieAtlas.json").load(setup);

//Set the initial game state
var state = play;

//Define any variables that are used in more than one function
var pixie = undefined,
    su = undefined,
    id = undefined;

function setup() {

  //Create a new instance of SpriteUtilities
  su = new SpriteUtilities(PIXI);

  //Create an alias for the texture atlas frame ids
  id = resources["images/pixieAtlas.json"].textures;

  //Create an array that references the frames you want to use
  var frames = [id["pixie0.png"], id["pixie1.png"], id["pixie2.png"]];

  //Use the custom `frameSeries` function to create the frames array
  //let frames = su.frameSeries(0, 2, "pixie", ".png");

  //Create a MoveClip from the frames
  pixie = new MovieClip(frames);

  //Set the sprite's position and add it to the stage
  pixie.position.set(32, 32);
  stage.addChild(pixie);

  pixie.play();
  pixie.animationSpeed = 0.1;
  console.log(pixie.textures);

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
//# sourceMappingURL=fromFrames.js.map