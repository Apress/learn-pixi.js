//Aliases
let Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Texture = PIXI.Texture,
  Rectangle = PIXI.Rectangle,
  MovieClip = PIXI.extras.MovieClip;

//Create a Pixi stage and renderer
let stage = new Container(),
  renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//load resources (images and fonts)
loader
  .add("images/pixieFrames.png")
  .load(setup);

//Set the initial game state
let state = play;

//Define any variables that are used in more than one function
let pixie, su;

function setup() {

  //Create a new instance of SpriteUtilities
  su = new SpriteUtilities(PIXI);

  //Use the custom `frameSeries` function to create the frames array
  let frames = su.filmstrip("images/pixieFrames.png", 48, 32);

  //Create a MoveClip from the frames
  pixie = new MovieClip(frames);

  //Set the sprite's position and add it to the stage
  pixie.position.set(32, 32);
  stage.addChild(pixie);

  pixie.play();
  pixie.animationSpeed = 0.1;

  //Start the game loop
  gameLoop();
}

function gameLoop(){

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Run the current state
  state();

  //Render the stage
  renderer.render(stage);
}

function play() {

}

