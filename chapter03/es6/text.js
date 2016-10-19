//Aliases
let Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
  Sprite = PIXI.Sprite,
  Graphics = PIXI.Graphics,
  Text = PIXI.Text;

//Create a Pixi stage and renderer
let stage = new Container(),
  renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//load resources (images and fonts)

loader
  .add("fonts/SpicyRice.ttf")
  .add("fonts/PetMe.ttf")
  .load(setup);

//Link the fonts you want to use
linkFont("fonts/SpicyRice.ttf");
linkFont("fonts/PetMe.ttf");

//Set the initial game state
let state = play;

//Define any variables that are used in more than one function
let message;

function setup() {
  
  message = new Text(
    "Hello Pixi!", 
    {font: "48px Impact", fill: "red"}
  );

  //Use the `text` property to change the content
  //message.text = "Text changed!";

  //Use the `style` property to change the text style
  //message.style = {fill: "black", font: "16px PetMe"};

  message.x = renderer.view.width / 2 - message.width / 2;
  message.y = renderer.view.height / 2 - message.height / 2;

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

  //Render the stage
  renderer.render(stage);
}

function play() {

  //Update the font family in the game loop to ensure that it
  //it's being applied after the font file has loaded
  //message.style = {fill: "black", font: "16px PetMe"};

}

function linkFont(source) {

  //Use the font's filename as the `fontFamily` name. This code captures
  //the font file’s name without the extension or file path
  let fontFamily = source.split("/").pop().split(".")[0];

  //Append an `@afont-face` style rule to the head of the HTML document
  let newStyle = document.createElement("style");
  let fontFace
    = "@font-face {font-family: '" + fontFamily + "'; src: url('" + source + "');}";
  newStyle.appendChild(document.createTextNode(fontFace));
  document.head.appendChild(newStyle);
}

