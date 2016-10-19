//Aliases
"use strict";

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    Graphics = PIXI.Graphics;

//Create a Pixi stage and renderer
var stage = new Container(),
    renderer = autoDetectRenderer(512, 512);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//load an image and run the `setup` function when it's done
loader.add("images/treasureHunter.json").add("images/adventuress.png").load(setup);

//Define any variables that are used in more than one function
var state = undefined,
    player = undefined,
    treasure = undefined,
    blobs = undefined,
    chimes = undefined,
    exit = undefined,
    adventuress = undefined,
    healthBar = undefined,
    message = undefined,
    gameScene = undefined,
    dungeon = undefined,
    door = undefined,
    gameOverScene = undefined,
    enemies = undefined,
    su = undefined,
    b = undefined;

function setup() {

  //Create a new instance of SpriteUtilities
  su = new SpriteUtilities(PIXI);

  //Create a new instance of Bump
  b = new Bump();

  //Make the game scene and add it to the stage
  gameScene = new Container();
  stage.addChild(gameScene);

  //Make the sprites and add them to the `gameScene`

  //Dungeon
  dungeon = su.sprite("dungeon.png");
  gameScene.addChild(dungeon);

  //Door
  door = su.sprite("door.png");
  door.position.set(32, 0);
  gameScene.addChild(door);

  //Adventuress
  var frames = su.filmstrip("images/adventuress.png", 32, 32);
  adventuress = su.sprite(frames);
  adventuress.x = 68;
  adventuress.y = gameScene.height / 2 - adventuress.height / 2;
  adventuress.vx = 0;
  adventuress.vy = 0;
  gameScene.addChild(adventuress);

  //The adventuress's animation states
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

  //Treasure
  treasure = su.sprite("treasure.png");
  treasure.x = gameScene.width - treasure.width - 48;
  treasure.y = gameScene.height / 2 - treasure.height / 2;
  gameScene.addChild(treasure);

  //Make the blobs
  var numberOfBlobs = 6,
      spacing = 48,
      xOffset = 150,
      speed = 2,
      direction = 1;

  //An array to store all the blob monsters
  blobs = [];

  //Make as many blobs as there are `numberOfBlobs`
  for (var i = 0; i < numberOfBlobs; i++) {

    //Make a blob
    var blob = su.sprite("blob.png");

    //Space each blob horizontally according to the `spacing` value.
    //`xOffset` determines the point from the left of the screen
    //at which the first blob should be added
    var x = spacing * i + xOffset;

    //Give the blob a random y position
    var y = randomInt(0, stage.height - blob.height);

    //Set the blob's position
    blob.x = x;
    blob.y = y;

    //Set the blob's vertical velocity. `direction` will be either `1` or
    //`-1`. `1` means the enemy will move down and `-1` means the blob will
    //move up. Multiplying `direction` by `speed` determines the blob's
    //vertical direction
    blob.vy = speed * direction;

    //Reverse the direction for the next blob
    direction *= -1;

    //Push the blob into the `blobs` array
    blobs.push(blob);

    //Add the blob to the `gameScene`
    gameScene.addChild(blob);
  }

  //Create the health bar
  healthBar = new Container();
  healthBar.position.set(stage.width - 170, 4);
  gameScene.addChild(healthBar);

  //Create the black background rectangle
  var innerBar = new Graphics();
  innerBar.beginFill(0);
  innerBar.drawRect(0, 0, 128, 8);
  innerBar.endFill();
  healthBar.addChild(innerBar);

  //Create the front red rectangle
  var outerBar = new Graphics();
  outerBar.beginFill(16724736);
  outerBar.drawRect(0, 0, 128, 8);
  outerBar.endFill();
  healthBar.addChild(outerBar);

  healthBar.outer = outerBar;

  //Create the `gameOver` scene
  gameOverScene = new Container();
  stage.addChild(gameOverScene);

  //Make the `gameOver` scene invisible when the game first starts
  gameOverScene.visible = false;
  //gameScene.visible = false;

  //Create the text sprite and add it to the `gameOver` scene
  message = new Text("The End!", { font: "48px Futura" });
  message.x = 120;
  message.y = stage.height / 2 - 32;
  gameOverScene.addChild(message);

  //Capture the keyboard arrow keys
  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

  //Left arrow key `press` method
  left.press = function () {

    //Play the sprite's `walkLeft` sequence and set the elf's velocity
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

  //use the adventuress's velocity to make it move
  adventuress.x += adventuress.vx;
  adventuress.y += adventuress.vy;

  //Contain the adventuress inside the area of the dungeon
  contain(adventuress, { x: 28, y: 10, width: 488, height: 480 });

  //Set `adventuressHit` to `false` before checking for a collision
  var adventuressHit = false;

  //Loop through all the sprites in the `enemies` array
  blobs.forEach(function (blob) {

    //Move the blob
    blob.y += blob.vy;

    //Check the blob's screen boundaries
    var blobHitsWall = contain(blob, { x: 28, y: 10, width: 488, height: 480 });

    //If the blob hits the top or bottom of the stage, reverse
    //its direction
    if (blobHitsWall) {
      if (blobHitsWall.has("top") || blobHitsWall.has("bottom")) {
        blob.vy *= -1;
      }
    }

    //Test for a collision. If any of the enemies are touching
    //the adventuress, set `adventuressHit` to `true`
    if (b.hitTestRectangle(adventuress, blob)) {
      adventuressHit = true;
    }
  });

  //If the adventuress is hit...
  if (adventuressHit) {

    //Make the adventuress semi-transparent
    adventuress.alpha = 0.5;

    //Reduce the width of the health bar's inner rectangle by 1 pixel
    healthBar.outer.width -= 1;
  } else {

    //Make the adventuress fully opaque (non-transparent) if it hasn't been hit
    adventuress.alpha = 1;
  }

  //Check for a collision between the adventuress and the treasure
  if (b.hitTestRectangle(adventuress, treasure)) {

    //If the treasure is touching the adventuress, center it over the adventuress
    treasure.x = adventuress.x + 8;
    treasure.y = adventuress.y + 8;
  }

  //Does the adventuress have enough health? If the width of the `innerBar`
  //is less than zero, end the game and display "You lost!"
  if (healthBar.outer.width < 0) {
    state = end;
    message.text = "You lost!";
  }

  //If the adventuress has brought the treasure to the exit,
  //end the game and display "You won!"
  if (b.hitTestRectangle(treasure, door)) {
    state = end;
    message.text = "You won!";
  }
}

function end() {
  gameScene.visible = false;
  gameOverScene.visible = true;
}

//The `randomInt` helper function
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

//The contain helper function
function contain(sprite, container) {

  //Create a set called `collision` to keep track of the
  //boundaries with which the sprite is colliding
  var collision = new Set();

  //Left
  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision.add("left");
  }

  //Top
  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision.add("top");
  }

  //Right
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    collision.add("right");
  }

  //Bottom
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
    collision.add("bottom");
  }

  //If there were no collisions, set `collision` to `undefined`
  if (collision.size === 0) collision = undefined;

  //Return the `collision` value
  return collision;
}
//# sourceMappingURL=treasureHunter2.js.map