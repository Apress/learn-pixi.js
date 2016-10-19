//Create the stage and renderer
let stage = new PIXI.Container(),
    renderer = PIXI.autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Use Pixi's built-in `loader` object to load an image
PIXI.loader
  .add("images/pixie96x48.png")
  .load(setup);

//This `setup` function will run when the image has loaded
function setup() {

  //Create the sprite from the texture
  let pixie = new PIXI.Sprite(
    PIXI.loader.resources["images/pixie96x48.png"].texture
  );

  //Add the sprite to the stage
  stage.addChild(pixie);
  
  //Render the stage   
  renderer.render(stage);
}

//You can alternatively use aliases to stand for Pixi objects and
//methods. Here's what the code above looks like using aliases:
/*
//Create the aliases
let Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

//Create the stage and renderer
let stage = new Container(),
    renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Use Pixi's built-in `loader` object to load an image
loader
  .add("images/pixie96x48.png")
  .load(setup);

//This `setup` function will run when the image has loaded
function setup() {

  //Create the sprite from the texture
  let pixie = new PIXI.Sprite(resources["images/pixie96x48.png"].texture);

  //Add the sprite to the stage
  stage.addChild(pixie);
  
  //Render the stage   
  renderer.render(stage);
}
*/

