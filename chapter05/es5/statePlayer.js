//Aliases
"use strict";

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Rectangle = PIXI.Rectangle,
    MovieClip = PIXI.extras.MovieClip;

//Create a Pixi stage and renderer
var stage = new Container(),
    renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//load resources (images and fonts)
loader.add("images/adventuress.png").load(setup);

//Set the initial game state
var state = play;

//Define any variables that are used in more than one function
var adventuress = undefined,
    su = undefined;

function setup() {

  //Create a new instance of SpriteUtilities
  su = new SpriteUtilities(PIXI);

  //Create an array that references the frames you want to use
  //let frames = ["adventuress0.png", "adventuress1.png", "adventuress2.png"];

  //Use the custom `frameSeries` function to create the frames array
  var frames = su.filmstrip("images/adventuress.png", 32, 32);

  //Create a MoveClip from the frames
  //adventuress = new MovieClip(frames);
  adventuress = su.sprite(frames);
  adventuress.vx = 0;
  adventuress.vy = 0;

  //h.addStatePlayer(adventuress);
  //let test = new h.Sprite();

  //Set the sprite's position and add it to the stage
  adventuress.position.set(32, 32);
  stage.addChild(adventuress);

  adventuress.fps = 12;
  //adventuress.playSequence([0, 2]);
  adventuress.states = {
    down: 0,
    left: 3,
    right: 6,
    up: 9,
    walkDown: [0, 2],
    walkLeft: [3, 5],
    walkRight: [6, 8],
    walkUp: [9, 11]
  };

  //Capture the keyboard arrow keys
  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

  /*
  //Left arrow key `press` method
  left.press = () => {
     //Show the left state
    adventuress.show(adventuress.states.left);
     //Change the adventuress's velocity when the key is pressed
    adventuress.vx = -5;
    adventuress.vy = 0;
  };
   //Left arrow key `release` method
  left.release = () => {
     //If the left arrow has been released, and the right arrow isn't down,
    //and the adventuress isn't moving vertically, stop the sprite from moving
    //by setting its velocity to zero
    if (!right.isDown && adventuress.vy === 0) {
      adventuress.vx = 0;
    }
  };
   //Up
  up.press = () => {
    adventuress.show(adventuress.states.up);
    adventuress.vy = -5;
    adventuress.vx = 0;
  };
  up.release = () => {
    if (!down.isDown && adventuress.vx === 0) {
      adventuress.vy = 0;
    }
  };
   //Right
  right.press = () => {
    adventuress.show(adventuress.states.right);
    adventuress.vx = 5;
    adventuress.vy = 0;
  };
  right.release = () => {
    if (!left.isDown && adventuress.vy === 0) {
      adventuress.vx = 0;
    }
  };
   //Down
  down.press = () => {
    adventuress.show(adventuress.states.down);
    adventuress.vy = 5;
    adventuress.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && adventuress.vx === 0) {
      adventuress.vy = 0;
    }
  };
  */

  //Left arrow key `press` method
  left.press = function () {

    //Play the sprite's `walkLeft` sequence
    adventuress.playAnimation(adventuress.states.walkLeft);
    adventuress.vx = -5;
    adventuress.vy = 0;
  };

  //Left arrow key `release` method
  left.release = function () {

    //If the left arrow has been released, and the right arrow isn't down,
    //and the adventuress isn't moving vertically, stop the sprite from moving
    //by setting its velocity to zero
    if (!right.isDown && adventuress.vy === 0) {
      adventuress.vx = 0;
      adventuress.show(adventuress.states.left);
    }
  };

  //Up
  up.press = function () {
    adventuress.playAnimation(adventuress.states.walkUp);
    adventuress.vy = -5;
    adventuress.vx = 0;
  };
  up.release = function () {
    if (!down.isDown && adventuress.vx === 0) {
      adventuress.vy = 0;
      adventuress.show(adventuress.states.up);
    }
  };

  //Right
  right.press = function () {
    adventuress.playAnimation(adventuress.states.walkRight);
    adventuress.vx = 5;
    adventuress.vy = 0;
  };
  right.release = function () {
    if (!left.isDown && adventuress.vy === 0) {
      adventuress.vx = 0;
      adventuress.show(adventuress.states.right);
    }
  };

  //Down
  down.press = function () {
    adventuress.playAnimation(adventuress.states.walkDown);
    adventuress.vy = 5;
    adventuress.vx = 0;
  };
  down.release = function () {
    if (!up.isDown && adventuress.vx === 0) {
      adventuress.vy = 0;
      adventuress.show(adventuress.states.down);
    }
  };

  //adventuress.show(adventuress.states.right);
  //adventuress.animationSpeed = 0.1;

  //Start the game loop
  gameLoop();
}

function gameLoop() {

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Run the current state
  state();

  //Render the stage
  renderer.render(stage);
}

function play() {

  adventuress.x += adventuress.vx;
  adventuress.y += adventuress.vy;
}
//# sourceMappingURL=statePlayer.js.map