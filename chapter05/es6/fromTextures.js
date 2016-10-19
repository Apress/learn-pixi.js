//Aliases
let Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
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
let pixie;

function setup() {

  //Get a reference to the base texture
  let base = TextureCache["images/pixieFrames.png"];

  //The first texture
  let texture0 = new Texture(base);
  texture0.frame = new Rectangle(0, 0, 48, 32);

  //The second texture
  let texture1 = new Texture(base);
  texture1.frame = new Rectangle(48, 0, 48, 32);

  //The third texture
  let texture2 = new Texture(base);
  texture2.frame = new Rectangle(96, 0, 48, 32);

  //Make an array of textures
  let textures = [texture0, texture1, texture2];
  
  //You can replace those lines above with this:
  /*
  let textures = [0, 48, 96].map(x => {
    let texture = new Texture(base);
    texture.frame = new Rectangle(x, 0, 48, 32);
    return texture; 
  });
  */

  //Or, better yet, you can use the `filmstrip` utility function
  /*
  let su = new SpriteUtilities(PIXI);
  let textures = su.filmstrip("images/pixieFrames.png", 48, 32);
  */

  //But if you need to use a subset of frames from the tileset, use
  //the `frames` utility function to specify the x/y positions of the
  //frames to use
  /* 
  let textures = su.frames(
    "images/pixieFrames.png",
    [[0,0],[48,0],[96,0]],
    48, 32
  );
  */
  
  
  //Create the `MovieClip` sprite using the `textures` array
  pixie = new MovieClip(textures);

  //Set the sprite's position and add it to the stage
  pixie.position.set(32, 32);
  stage.addChild(pixie);

  pixie.play();
  pixie.animationSpeed = 0.2;

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

