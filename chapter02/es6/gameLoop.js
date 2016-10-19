//Aliases
let Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite;

//Create a Pixi stage and renderer and add the 
//renderer.view to the DOM
let stage = new Container(),
  renderer = autoDetectRenderer(512, 512);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//load an image and run the `setup` function when it's done
loader
  .add("images/pixie96x48.png")
  .load(setup);

//Define any variables that are used in more than one function
let pixie;

function setup() {

  //Create the `pixie` sprite 
  pixie = new Sprite(resources["images/pixie96x48.png"]);

  //Center the sprite vertically on the stage
  pixie.y = renderer.view.height / 2 - pixie.height / 2; 

  //Add the sprite to the stage
  stage.addChild(pixie);
 
  //Start the game loop
  gameLoop();
}

function gameLoop(){

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Move the sprite 1 pixel per frame
  pixie.x += 1;

  //Render the stage
  renderer.render(stage);
}

