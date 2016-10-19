//Aliases
let Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite;

//Create a Pixi stage and renderer 
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
let pixie, state;

function setup() {

  //Create the `pixie` sprite 
  pixie = new Sprite(resources["images/pixie96x48.png"]);

  //Center the sprite
  pixie.x = renderer.view.width / 2 - pixie.width / 2;
  pixie.y = renderer.view.height / 2 - pixie.height / 2;

  //Initialize the sprites's velocity variables
  pixie.vx = 0;
  pixie.vy = 0;

  //Add the sprite to the stage
  stage.addChild(pixie);

  //Capture the keyboard arrow keys
  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

  //Left arrow key `press` method
  left.press = () => {

    //Change the pixie.s velocity when the key is pressed
    pixie.vx = -5;
    pixie.vy = 0;
  };

  //Left arrow key `release` method
  left.release = () => {

    //If the left arrow has been released, and the right arrow isn't down,
    //and the pixie isn't moving vertically, stop the sprite from moving
    //by setting its velocity to zero
    if (!right.isDown && pixie.vy === 0) {
      pixie.vx = 0;
    }
  };

  //Up
  up.press = () => {
    pixie.vy = -5;
    pixie.vx = 0;
  };
  up.release = () => {
    if (!down.isDown && pixie.vx === 0) {
      pixie.vy = 0;
    }
  };

  //Right
  right.press = () => {
    pixie.vx = 5;
    pixie.vy = 0;
  };
  right.release = () => {
    if (!left.isDown && pixie.vy === 0) {
      pixie.vx = 0;
    }
  };

  //Down
  down.press = () => {
    pixie.vy = 5;
    pixie.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && pixie.vx === 0) {
      pixie.vy = 0;
    }
  };

  //Set the game's current state to `play`
  state = play;
 
  //Start the game loop
  gameLoop();
}

function gameLoop(){

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Update the current game state:
  state();  

  //Render the stage
  renderer.render(stage);
}

function play() {

  //Apply the velocity values to the sprite's 
  //position to make it move
  pixie.x += pixie.vx;
  pixie.y += pixie.vy;
}

//The `keyboard` helper function
function keyboard(keyCode) {
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event  => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );

  //Return the key object
  return key;
}


