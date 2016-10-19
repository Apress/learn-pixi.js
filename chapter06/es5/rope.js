//Aliases
"use strict";

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    Point = PIXI.Point,
    Rope = PIXI.mesh.Rope,
    RenderTexture = PIXI.RenderTexture,
    TilingSprite = PIXI.extras.TilingSprite;

//Create a Pixi stage and renderer
var stage = new Container(),
    renderer = autoDetectRenderer(750, 300);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//load resources (images and fonts)
loader.add("images/snake.png").load(setup);

//Set the initial game state
var state = play;

//Define any variables that are used in more than one function
var points = undefined,
    counter = undefined,
    ropeSegment = undefined,
    numberOfSegments = undefined,
    imageWidth = undefined;

function setup() {

  //Figure out the length of each rope segment. We want a rope with
  //20 segments, so divide the length of the image, which is 600
  //pixels, by 20
  numberOfSegments = 20;
  imageWidth = 600;
  ropeSegment = imageWidth / numberOfSegments;

  //Create an array of 20 Point object, one for each rope segment
  points = [];
  for (var i = 0; i < numberOfSegments; i++) {
    points.push(new Point(i * ropeSegment, 0));
  }

  //Create the snake as a `Rope` object. The first argument is the
  //texture, the second is the `points` array
  var snake = new Rope(TextureCache["images/snake.png"], points);

  //Add the snake to a container, so it's easier to position
  var snakeContainer = new Container();
  snakeContainer.addChild(snake);

  //Add the container to the stage and position it
  stage.addChild(snakeContainer);
  snakeContainer.position.set(64, 128);

  //Intialize the counter variable
  counter = 0;

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

  //Increment the counter
  counter += 0.1;

  //Loop through all the points and shift them in a circular
  //pattern to produce the rippling effect.
  for (var i = 0; i < points.length; i++) {
    points[i].y = Math.sin(i * 0.5 + counter) * 30;
    points[i].x = i * ropeSegment + Math.cos(i * 0.3 + counter) * numberOfSegments;
  }
}
//# sourceMappingURL=rope.js.map