//Aliases
let Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
  ParticleContainer = PIXI.ParticleContainer,
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
//renderer.backgroundColor = "0xFFFFFF";

//load resources (images and fonts)
loader
  .add("images/star.png")
  .load(setup);

//Set the initial game state
let state = play;

//Define any variables that are used in more than one function
let su, d;

function setup() {

  //Create a new instance of SpriteUtilities
  su = new SpriteUtilities(PIXI);  

  //Intialize Dust
  d = new Dust(PIXI);

  let stars = new ParticleContainer(
    15000,
    {
      alpha: true, 
      scale: true, 
      rotation: true, 
      uvs: true
    }
  );

  stage.addChild(stars);

  //Create star particles
  let particleStream = d.emitter(
    100,
    () => d.create(
      128, 128,
      () => su.sprite("images/star.png"),
      stars,
      30,
      0.1,
      false,
      3.14, 6.28,
      16, 32,
      2, 5
    ) 
  );

  particleStream.play();

  //Start the game loop
  gameLoop();
}

function gameLoop(){

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Run the current state
  state();

  //Update the particles
  d.update();

  //Render the stage
  renderer.render(stage);
}

function play() {

}

