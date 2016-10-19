//Aliases
"use strict";

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    Sprite = PIXI.Sprite,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Text = PIXI.Text;

//Create a Pixi stage and renderer
var stage = new Container(),
    renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//let scale = scaleToWindow(renderer.view);

//load resources
loader.add("images/button.json").load(setup);

//Set the initial game state
var state = play;

//Define any variables that are used in more than one function
var t = undefined,
    playButton = undefined,
    id = undefined,
    stateMessage = undefined,
    actionMessage = undefined;

function setup() {

  //Create a new instance of Tink
  t = new Tink(PIXI, renderer.view);

  //Get a reference to the texture atlas id's
  id = resources["images/button.json"].textures;

  //The button state textures
  var buttonFrames = [id["up.png"], id["over.png"], id["down.png"]];

  //The `playButton`
  playButton = t.button(buttonFrames, 32, 96);

  //Add the button to the stage
  stage.addChild(playButton);

  //Define the button's actions
  playButton.over = function () {
    return console.log("over");
  };
  playButton.out = function () {
    return console.log("out");
  };
  playButton.press = function () {
    return console.log("pressed");
  };
  playButton.release = function () {
    return console.log("released");
  };
  playButton.tap = function () {
    return console.log("tapped");
  };

  //Add the `stageMessage`
  stateMessage = new Text("State: ", { font: "18px Futura", fill: "black" });
  stateMessage.position.set(8, 8);
  stage.addChild(stateMessage);

  //Add the `actionMessage`
  actionMessage = new Text("Action: ", { font: "18px Futura", fill: "black" });
  actionMessage.position.set(8, 32);
  stage.addChild(actionMessage);

  //Optionally create a `pointer` object
  //pointer = t.makePointer();

  //Start the game loop
  gameLoop();
}

function gameLoop() {

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
  stateMessage.text = "State: " + playButton.state;
  actionMessage.text = "Action: " + playButton.action;
}
//# sourceMappingURL=button.js.map