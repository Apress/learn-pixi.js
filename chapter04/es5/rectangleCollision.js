//Aliases
"use strict";

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text;

//Create a Pixi stage and renderer
var stage = new Container(),
    renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//load an image and run the `setup` function when it's done
loader.add("images/cat64x64.png").add("images/box64x64.png").load(setup);

//Define any variables that are used in more than one function
var cat = undefined,
    box = undefined,
    message = undefined,
    state = undefined,
    b = undefined;

function setup() {

  //Create and instance of Bump
  b = new Bump(PIXI);

  //Create the `cat` sprite
  cat = new Sprite(resources["images/cat64x64.png"].texture);

  //Center the sprite
  cat.x = 16;
  cat.y = 32;

  //Initialize the sprites's velocity variables
  cat.vx = 0;
  cat.vy = 0;

  //Add the sprite to the stage
  stage.addChild(cat);

  //Create the `box` sprite and add it to the stage
  box = new Sprite(resources["images/box64x64.png"].texture);
  box.x = renderer.view.width / 2 - box.width / 2;
  box.y = renderer.view.height / 2 - box.height / 2;
  stage.addChild(box);

  //Create the text sprite
  message = new Text("No collision...", { font: "18px sans-serif", fill: "black" });
  message.position.set(8, 8);
  stage.addChild(message);

  //Capture the keyboard arrow keys
  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

  //Left arrow key `press` method
  left.press = function () {

    //Change the cat.s velocity when the key is pressed
    cat.vx = -5;
    cat.vy = 0;
  };

  //Left arrow key `release` method
  left.release = function () {

    //If the left arrow has been released, and the right arrow isn't down,
    //and the cat isn't moving vertically, stop the sprite from moving
    //by setting its velocity to zero
    if (!right.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };

  //Up
  up.press = function () {
    cat.vy = -5;
    cat.vx = 0;
  };
  up.release = function () {
    if (!down.isDown && cat.vx === 0) {
      cat.vy = 0;
    }
  };

  //Right
  right.press = function () {
    cat.vx = 5;
    cat.vy = 0;
  };
  right.release = function () {
    if (!left.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };

  //Down
  down.press = function () {
    cat.vy = 5;
    cat.vx = 0;
  };
  down.release = function () {
    if (!up.isDown && cat.vx === 0) {
      cat.vy = 0;
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

  //Apply the velocity values to the sprite's position to make it move
  cat.x += cat.vx;
  cat.y += cat.vy;

  //Check for a collision between the cat and the box
  if (b.hitTestRectangle(cat, box)) {

    //If there's a collision, change the message text and tint the box red
    message.text = "hit!";
    box.tint = 16724736;
  } else {

    //If there's no collision, reset the message text and the box's color
    message.text = "No collision...";
    box.tint = 16777215;
  }
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
//# sourceMappingURL=rectangleCollision.js.map