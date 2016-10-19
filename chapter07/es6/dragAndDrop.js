//Aliases
let Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  Graphics = PIXI.Graphics,
  Sprite = PIXI.Sprite,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Text = PIXI.Text;

//Create a Pixi stage and renderer
let stage = new Container(),
  renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//let scale = scaleToWindow(renderer.view);

//load resources
loader
  .add("images/animals.json")
  .load(setup);

//Set the initial game state
let state = play;

//Define any variables that are used in more than one function
let t, pointer, rectangle, circle, id, cat, tiger, 
  hedgehog, draggableObjects;
 
function setup() {

  //Create a new instance of Tink
  t = new Tink(PIXI, renderer.view);

  //Get a reference to the texture atlas id's
  id = resources["images/animals.json"].textures;

  //The cat
  cat = new Sprite(id["cat.png"]);
  cat.position.set(32, 32);

  //The hedgehog
  hedgehog = new Sprite(id["hedgehog.png"]);
  hedgehog.position.set(64, 64);

  //The tiger
  tiger = new Sprite(id["tiger.png"]);
  tiger.position.set(96, 96);

  //Create a container for the draggable objects and
  //add the sprites to it
  draggableObjects = new Container();
  draggableObjects.addChild(cat);
  draggableObjects.addChild(hedgehog);
  draggableObjects.addChild(tiger);

  //Add the `draggableObjects` to the stage
  stage.addChild(draggableObjects);

  //Make the sprites draggable
  t.makeDraggable(cat, tiger, hedgehog);

  //Optionally create a `pointer` object
  //pointer = t.makePointer();

  //Start the game loop
  gameLoop();
}

function gameLoop(){

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Run the current state
  state();

  //Update Tink
  t.update();

  //Render the stage
  renderer.render(stage);
}

function play() {

}
