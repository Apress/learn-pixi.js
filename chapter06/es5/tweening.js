//Aliases
"use strict";

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    RenderTexture = PIXI.RenderTexture,
    resources = PIXI.loader.resources,
    TilingSprite = PIXI.extras.TilingSprite;

//Create a Pixi stage and renderer
var stage = new Container(),
    renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//load resources (images and fonts)
loader.add("images/pixie96x48.png").load(setup);

//Set the initial game state
var state = play;

//Define any variables that are used in more than one function
var pixie = undefined,
    c = undefined;

function setup() {

  //Create a new instance of Charm
  c = new Charm(PIXI);
  pixie = new Sprite(resources["images/pixie96x48.png"].texture);
  pixie.position.set(32, 32);
  stage.addChild(pixie);

  /* Tween effects */

  //Selectively un-comment the tween effects below to observe their
  //effects. The first, slide, is a fun one!

  //Slide
  var slidePixie = c.slide(pixie, 128, 128, 120, "smoothstep", true);
  slidePixie.onComplete = function () {
    return console.log("Pixie slide complete");
  };

  //Add some bounce to the slide like this (Make sure to comment-out
  //the 2 lines of code above first):
  /*
  let slidePixie = c.slide(pixie, 128, 128, 120, "bounce 10 -10", true);
  slidePixie.onComplete = () => console.log("Pixie slide complete");
  */

  //Fade out
  //c.fadeOut(pixie);

  //Fade in
  //pixie.alpha = 0;
  //c.fadeIn(pixie);

  //Pulse
  //c.pulse(pixie, 30, 0.2);

  //followCurve
  /*
  pixie.position.set(64, 160);
  pixie.anchor.set(0.5, 0.5);
   //Define the curve as a 2D array of x/y points
  let curve = [
    [pixie.x, pixie.y],   //Start position
    [108, 32],            //Control point 1
    [176, 32],            //Control point 2
    [196, 160]            //End position
  ];
   //Use `followCurve` to make the sprite follow the curve
  let pixieBezier = c.followCurve(
    pixie,                          //The sprite
    curve,                          //The Bezier curve array
    120,                            //Duration, in milliseconds
    "smoothstep",                   //Easing type
    true,                           //Should tween yoyo?
    1000                            //Delay, in ms, before it yoyos
  );
  pixieBezier.onComplete = () => console.log("Cat Bezier complete")
  */

  //Breathe
  //Set the pixie's anchor point to the center
  /*
  pixie.anchor.set(0.5, 0.5);
  pixie.position.set(64, 64);
  c.breathe(pixie);
  */

  //Scale
  //c.scale(pixie);

  //Strobe
  //Set the pixie's anchor point to the center
  /*
  pixie.anchor.set(0.5, 0.5);
  pixie.position.set(64, 64);
  c.strobe(pixie);
  */

  //Wobble
  /*
  pixie.anchor.set(0.5, 0.5);
  pixie.position.set(64, 64);
  c.wobble(pixie);
  */

  //Start the game loop
  gameLoop();
}

function gameLoop() {

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Run the current state
  state();

  //Update all the tweens
  c.update();

  //Render the stage
  renderer.render(stage);
}

function play() {}
//# sourceMappingURL=tweening.js.map