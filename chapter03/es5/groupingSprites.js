//Aliases
"use strict";

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Graphics = PIXI.Graphics;

//Create a Pixi stage and renderer
var stage = new Container(),
    renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//load resources (images and fonts)
loader.add("images/animals.json").load(setup);

//Set the initial game state
var state = play;

//Define any variables that are used in more than one function
var cat = undefined,
    hedgehog = undefined,
    tiger = undefined,
    animals = undefined;

function setup() {

  //An alias for the texture atlas frame ids
  var id = resources["images/animals.json"].textures;

  //The cat
  cat = new Sprite(id["cat.png"]);
  cat.position.set(0, 0);

  //The hedgehog
  hedgehog = new Sprite(id["hedgehog.png"]);
  hedgehog.position.set(32, 32);

  //The tiger
  tiger = new Sprite(id["tiger.png"]);
  tiger.position.set(64, 64);

  //A container for the animals
  animals = new Container();

  //Add each of the animals to the `animals` container
  animals.addChild(cat);
  animals.addChild(hedgehog);
  animals.addChild(tiger);

  //Add the group to the stage
  stage.addChild(animals);

  //Change the group's width and height
  //animals.width = 200;
  //animals.height = 200;

  //Position the group
  animals.position.set(96, 96);

  //Find the tiger's local position
  console.log("Tiger local x: " + tiger.x);
  console.log("Tiger local y: " + tiger.y);

  //Find the tiger's global position
  console.log("Tiger global x: " + animals.toGlobal(tiger.position).x);
  console.log("Tiger global y: " + animals.toGlobal(tiger.position).y);

  //Find the tiger's world position from the top left corner of the
  //canvas
  console.log("Tiger world x: " + tiger.getGlobalPosition().x);
  console.log("Tiger world y: " + tiger.getGlobalPosition().y);

  //The tiger's position relative to the hedgehog
  console.log("Tiger x relative to the hedgehog: " + tiger.toLocal(tiger.position, hedgehog).x);
  console.log("Tiger y relative to the hedgehog: " + tiger.toLocal(tiger.position, hedgehog).y);

  //Display the child sprites in the group
  console.log(animals.children);

  //Find the width and height
  console.log("Width: " + animals.width + " Height: " + animals.height);

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

function play() {}

//Not required in this example
//# sourceMappingURL=groupingSprites.js.map