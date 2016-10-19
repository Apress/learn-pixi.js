//Aliases
"use strict";

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    RenderTexture = PIXI.RenderTexture,
    TilingSprite = PIXI.extras.TilingSprite;

//Create a Pixi stage and renderer
var stage = new Container(),
    renderer = autoDetectRenderer(512, 512);
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
    c = undefined;

function setup() {

  //Create a new instance of Charm
  c = new Charm();

  //Make the cat
  cat = new Sprite(TextureCache["cat.png"]);
  cat.position.set(32, 32);
  stage.addChild(cat);

  var waypoints = [[32, 32], //First x/y point
  [32, 128], //Next x/y point
  [300, 128], //Next x/y point
  [300, 32], //Next x/y point
  [32, 32] //Last x/y point
  ];

  var catPath = c.walkPath(cat, //The sprite
  waypoints, //The array of waypoints
  300, //Total duration, in frames
  "smoothstep", //Easing type
  true, //Should the path loop?
  true, //Should the path reverse?
  1000 //Delay in milliseconds between segments
  );

  //Make the hedgehog
  hedgehog = new Sprite(TextureCache["hedgehog.png"]);
  hedgehog.position.set(32, 256);
  stage.addChild(hedgehog);

  var curvedWaypoints = [

  //First curve
  [[hedgehog.x, hedgehog.y], [75, 500], [200, 500], [300, 300]],

  //Second curve
  [[300, 300], [250, 100], [100, 100], [hedgehog.x, hedgehog.y]]];

  var hedgehogPath = c.walkCurve(hedgehog, //The sprite
  curvedWaypoints, //Array of curved waypoints
  300, //Total duration, in frames
  "smoothstep", //Easing type
  true, //Should the path loop?
  true, //Should the path yoyo?
  1000 //Delay in ms between segments
  );

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

  //Update all the tweens
  c.update();
}
//# sourceMappingURL=motionPaths.js.map