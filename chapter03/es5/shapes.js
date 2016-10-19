//Aliases
"use strict";

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    Sprite = PIXI.Sprite,
    Graphics = PIXI.Graphics;

//Create a Pixi stage and renderer
var stage = new Container(),
    renderer = autoDetectRenderer(512, 512, { antialiasing: false });
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//Set the initial game state
var state = play;

//Run the `setup` function
setup();

//Define any variables that are used in more than one function

function setup() {

  //Rectangle
  var rectangle = new Graphics();
  rectangle.beginFill(13260);
  rectangle.lineStyle(4, 16711680, 1);
  rectangle.drawRect(0, 0, 96, 96);
  //Use `drawRoundedRect` for a rectangle with rounded corners.
  //rectangle.drawRoundedRect(0, 0, 96, 96, 12);
  rectangle.endFill();
  rectangle.x = 64;
  rectangle.y = 64;
  rectangle.alpha = 0.5;
  stage.addChild(rectangle);

  //Circle
  var circle = new Graphics();
  circle.beginFill(16750899);
  circle.lineStyle(4, 26112, 1);
  circle.drawCircle(0, 0, 48);
  circle.endFill();

  //If you want the graphic to be anti-aliased,
  //convert it into a bitmap texture and then use
  //that texture to create a new sprite
  var circleTexture = circle.generateTexture();
  var circleSprite = new Sprite(circleTexture);
  circleSprite.x = 212;
  circleSprite.y = 64;
  stage.addChild(circleSprite);

  //Ellipse
  var ellipse = new Graphics();
  ellipse.beginFill(16776960);
  ellipse.lineStyle(4, 0, 1);
  ellipse.drawEllipse(0, 0, 64, 32);
  ellipse.endFill();
  ellipse.x = 416;
  ellipse.y = 112;
  stage.addChild(ellipse);

  //Line
  var line = new Graphics();
  line.lineStyle(4, 0, 1);
  line.moveTo(0, 0);
  line.lineTo(100, 50);
  line.x = 64;
  line.y = 212;
  stage.addChild(line);

  //Triangle
  var triangle = new Graphics();
  triangle.beginFill(16724736);
  triangle.lineStyle(4, 3368601, 1);
  triangle.moveTo(0, 0);
  triangle.lineTo(-64, 64);
  triangle.lineTo(64, 64);
  triangle.lineTo(0, 0);
  triangle.endFill();

  //The x/y position is the first point of the triangle
  triangle.x = 320;
  triangle.y = 192;
  stage.addChild(triangle);

  //Quadratic curve
  var quadLine = new Graphics();
  quadLine.lineStyle(4, 0, 1);
  quadLine.moveTo(32, 128);
  quadLine.quadraticCurveTo(128, 20, 224, 128);

  //Position the line relative to its 0,0
  //origin point
  quadLine.x = 16;
  quadLine.y = 256;
  stage.addChild(quadLine);

  //Bezier curve
  var bezierLine = new Graphics();
  bezierLine.lineStyle(4, 0, 1);
  bezierLine.moveTo(32, 128);
  bezierLine.bezierCurveTo(32, 20, 224, 20, 224, 128);

  //Position the line relative to its 0,0
  //origin point
  bezierLine.x = 256;
  bezierLine.y = 256;
  stage.addChild(bezierLine);

  //Arc using the `arc` method
  var partialCircle = new Graphics();
  partialCircle.lineStyle(4, 0, 1);
  partialCircle.arc(64, 64, 64, 3.14, 5, false);
  partialCircle.x = 64;
  partialCircle.y = 416;
  stage.addChild(partialCircle);

  //Arc using the `arcTo` method
  var arcLine = new Graphics();
  arcLine.lineStyle(4, 0, 1);
  arcLine.arcTo(0, 128, 128, 128, 64);
  arcLine.x = 64;
  arcLine.y = 416;
  stage.addChild(arcLine);

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

//Any animation code goes here
//# sourceMappingURL=shapes.js.map