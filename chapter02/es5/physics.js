//Aliases
"use strict";

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    Sprite = PIXI.Sprite;

//Create a Pixi stage and renderer
var stage = new Container(),
    renderer = autoDetectRenderer(512, 512);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//load an image and run the `setup` function when it's done
loader.add("images/pixie96x48.png").load(setup);

//Define any variables that are used in more than one function
var pixie = undefined,
    state = undefined;

function setup() {

  //Create the `pixie` sprite
  pixie = new Sprite.fromImage("images/pixie96x48.png");

  //Center the sprite
  pixie.x = renderer.view.width / 2 - pixie.width / 2;
  pixie.y = renderer.view.height / 2 - pixie.height / 2;

  //Initialize the sprites's velocity variables
  pixie.vx = 0;
  pixie.vy = 0;

  //Acceleration and friction properties
  pixie.accelerationX = 0;
  pixie.accelerationY = 0;
  pixie.frictionX = 1;
  pixie.frictionY = 1;

  //Set the pixie's speed
  pixie.speed = 0.2;

  //The friction resistance
  pixie.drag = 0.98;

  //Add the sprite to the stage
  stage.addChild(pixie);

  //Capture the keyboard arrow keys
  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

  //Left arrow key `press` method
  left.press = function () {

    //Increase the acceleration
    pixie.accelerationX = -pixie.speed;

    //Remove friction so the sprite moves freely
    pixie.frictionX = 1;
  };

  //Left arrow key `release` method
  left.release = function () {

    //If the left arrow has been released, and the right arrow isn't down,
    //stop acceleration and apply friction
    if (!right.isDown) {
      pixie.accelerationX = 0;
      pixie.frictionX = pixie.drag;
    }
  };

  //Up
  up.press = function () {
    pixie.accelerationY = -pixie.speed;
    pixie.frictionY = 1;
  };
  up.release = function () {
    if (!down.isDown) {
      pixie.accelerationY = 0;
      pixie.frictionY = pixie.drag;
    }
  };

  //Right
  right.press = function () {
    pixie.accelerationX = pixie.speed;
    pixie.frictionX = 1;
  };
  right.release = function () {
    if (!left.isDown) {
      pixie.accelerationX = 0;
      pixie.frictionX = pixie.drag;
    }
  };

  //Down
  down.press = function () {
    pixie.accelerationY = pixie.speed;
    pixie.frictionY = 1;
  };
  down.release = function () {
    if (!up.isDown) {
      pixie.accelerationY = 0;
      pixie.frictionY = pixie.drag;
    }
  };

  //Set the game's current state to `play`
  state = play;

  //Start the game loop
  gameLoop();
}

function gameLoop() {

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Update the current game state:
  state();

  //Render the stage
  renderer.render(stage);
}

function play() {

  //Apply acceleration by adding the acceleration
  //to the sprite's velocity
  pixie.vx += pixie.accelerationX;
  pixie.vy += pixie.accelerationY;

  //Apply friction by multiplying sprite's velocity by the friction
  pixie.vx *= pixie.frictionX;
  pixie.vy *= pixie.frictionY;

  //Add optional gravity
  pixie.vy += 0.1;

  //Apply the velocity to the sprite's position to
  //make it move
  pixie.x += pixie.vx;
  pixie.y += pixie.vy;
}

//The `keyboard` helper function
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  //The `downHandler`
  key.downHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener("keydown", key.downHandler.bind(key), false);
  window.addEventListener("keyup", key.upHandler.bind(key), false);

  //Return the key object
  return key;
}
//# sourceMappingURL=physics.js.map