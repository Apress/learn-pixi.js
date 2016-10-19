//Aliases
let Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
  TextureCache = PIXI.utils.TextureCache,
  Texture = PIXI.Texture,
  Sprite = PIXI.Sprite,
  RenderTexture = PIXI.RenderTexture,
  TilingSprite = PIXI.extras.TilingSprite;

//Create a Pixi stage and renderer
let stage = new Container(),
  renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//load resources (images and fonts)
loader
  .add("images/tile.png")
  .load(setup);

//Set the initial game state
let state = play;

//Define any variables that are used in more than one function
let renderTexture, spriteOne, spriteTwo;

function setup() {

  spriteOne = TilingSprite.fromImage("images/tile.png", 128, 128);
  spriteOne.position.set(16, 16);
  stage.addChild(spriteOne);

  renderTexture = new RenderTexture(renderer, 128, 128);
  spriteTwo = new Sprite(renderTexture);
  spriteTwo.position.set(108, 108);
  stage.addChild(spriteTwo);

  renderTexture.render(spriteOne);

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

  
  spriteOne.tilePosition.x += 1;
  spriteOne.tilePosition.y += 1;

  renderTexture.render(spriteOne);
  
}

