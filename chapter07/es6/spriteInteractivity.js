//Aliases
let Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  Graphics = PIXI.Graphics,
  Sprite = PIXI.Sprite,
  Text = PIXI.Text;

//Create a Pixi stage and renderer
let stage = new Container(),
  renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//let scale = scaleToWindow(renderer.view);

//Set the initial game state
let state = play;

//Define any variables that are used in more than one function
let t, pointer, rectangle, circle, message;

setup();
 
function setup() {

  //Create a new instance of Tink
  t = new Tink(PIXI, renderer.view);

  //Make a rectangle and circle
  rectangle = new Graphics();
  rectangle.beginFill(0x0033CC);
  rectangle.drawRect(0, 0, 64, 64);
  rectangle.endFill();
  rectangle.x = 32;
  rectangle.y = 64;
  stage.addChild(rectangle);

  let circleGraphic = new Graphics();
  circleGraphic.beginFill(0xFF0000);
  circleGraphic.drawCircle(0, 0, 32);
  circleGraphic.endFill();

  //If you want the graphic to be anti-aliased,
  //convert it into a bitmap texture and then use
  //that texture to create a new sprite
  let circleTexture = circleGraphic.generateTexture();
  circle = new Sprite(circleTexture);
  circle.x = 160;
  circle.y = 160;
  stage.addChild(circle);

  //Add a `circular` property to the circle
  circle.circular = true;

  //Create a `pointer` object
  pointer = t.makePointer();

  message = new Text(
    "Hello Pixi!", 
    {font: "18px Futura", fill: "black"}
  );
  message.x = 8;
  message.y = 8;

  //Add the text to the stage
  stage.addChild(message);

  //Start the game loop
  gameLoop();
}

function gameLoop(){

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

  if (pointer.hitTestSprite(rectangle)) {
    message.text = "Rectangle!";
    pointer.cursor = "pointer";
  }
  else if (pointer.hitTestSprite(circle)) {
    message.text = "Circle!";
    pointer.cursor = "pointer";
  }
  
  else {
    message.text = "No collision...";
    pointer.cursor = "auto";
  }
}
