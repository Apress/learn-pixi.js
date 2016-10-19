//Aliases
let Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  Graphics = PIXI.Graphics,
  Sprite = PIXI.Sprite,
  MovieClip = PIXI.extras.MovieClip,
  TilingSprite = PIXI.extras.TilingSprite,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Text = PIXI.Text;

//Create a Pixi stage and renderer
let stage = new Container(),
  renderer = autoDetectRenderer(910, 512);
document.body.appendChild(renderer.view);

//Scale the canvas to the maximum window size
let scale = scaleToWindow(renderer.view);

//Set the initial game state
let state = play;

//load resources
loader
  .add("images/pixiePerilousness.json")
  .load(setup);

//Define any variables that might be used in more than one function
let t, b, d, pd, u, id, pointer, circle, pixie, sky, blocks, 
    finish, particleStream, dustFrames;

function setup() {

  /* Intialize all the helper libraries */

  //Create a new instance of Tink, the interactive module. 
  //The last argument, `scale` is
  //the return value of the `scaleToWindow` function above
  t = new Tink(PIXI, renderer.view, scale);

  //Create a new instance of Bump, the collision module
  b = new Bump(PIXI);

  //Create a new instance of SpriteUtilities, for easy sprite creation
  u = new SpriteUtilities(PIXI);

  //Get a reference to the texture atlas id's
  id = resources["images/pixiePerilousness.json"].textures;

  /* Create the sprites */

  //Make the sky background
  sky = new TilingSprite(
    id["clouds.png"], 
    renderer.view.width, 
    renderer.view.height
  );
  stage.addChild(sky);

  //Make the world
  //Create a `Container` for all the blocks
  blocks = new Container();
  stage.addChild(blocks);

  //What should the initial size of the gap be between the pillars?
  let gapSize = 4;

  //How many pillars?
  let numberOfPillars = 15;

  //Loop 15 times to make 15 pillars
  for (let i = 0; i < numberOfPillars; i++) {

    //Randomly place the gap somewhere inside the pillar
    let startGapNumber = randomInt(0, 8 - gapSize); 

    //Reduce the `gapSize` by one after every fifth pillar. This is
    //what makes gaps gradually become narrower
    if (i > 0 && i % 5 === 0) gapSize -= 1; 

    //Create a block if it's not within the range of numbers
    //occupied by the gap
    for (let j = 0; j < 8; j++) {
      if (j < startGapNumber || j > startGapNumber + gapSize - 1) {
        let block = u.sprite(id["greenBlock.png"]);
        blocks.addChild(block);

        //Space each pillar 384 pixels apart. The first pillar will be
        //placed at an x position of 512
        block.x = (i * 384) + 512;
        block.y = j * 64;
      }
    }

    //After the pillars have been created, add the finish image
    //right at the end
    if (i === numberOfPillars - 1) {
      finish = u.sprite(id["finish.png"]);
      blocks.addChild(finish);
      finish.x = (i * 384) + 896;
      finish.y = 192;
    }
  }

  //Make the pixie sprite
  let pixieFrames = [
    id["0.png"], 
    id["1.png"], 
    id["2.png"]
  ];
  pixie = u.sprite(pixieFrames);
  stage.addChild(pixie);
  pixie.fps = 24;
  pixie.position.set(232, 32);
  pixie.vy = 0;
  pixie.oldVy = 0;

  //Create the frames array for the pixie dust images
  //that trail the pixie
  dustFrames = [
    id["pink.png"],
    id["yellow.png"],
    id["green.png"],
    id["violet.png"]
  ];

  //Create the particle emitter.
  //First create a new instance of Dust, the particle
  //effects library
  d = new Dust(PIXI);
  
  //Next, create the emitter
  particleStream = d.emitter(
    300,                                 //The interval
    () => d.create(                     //The function
      pixie.x + 8,                       //x position
      pixie.y + pixie.height / 2,        //y position
      () => u.sprite(dustFrames),        //Particle sprite
      stage,                             //The parent container
      3,                                 //Number of particles
      0,                                 //Gravity
      true,                              //Random spacing
      2.4, 3.6,                          //Min/max angle
      18, 24,                            //Min/max size
      2, 3,                              //Min/max speed
      0.005, 0.01,                       //Min/max scale speed
      0.005, 0.01,                       //Min/max alpha speed
      0.05, 0.1                          //Min/max rotation speed
    )
  );

  //Make the particle stream start playing when the game starts
  particleStream.play();

  //Make the pointer and increase the pixie's 
  //vertical velocity when it's tapped
  pointer = t.makePointer();
  pointer.tap = () => {
    pixie.vy += 1.5;
  };

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

  //Update Dust
  d.update();

  //Render the stage
  renderer.render(stage);
}

function play() {

  //Make the sky background scroll by shifting the `tilePosition.x`
  //of the `sky` tiling sprite
  sky.tilePosition.x -= 1;

  //Move the blocks 2 pixels to the left each frame.
  //This will just happen while the finish image is off-screen.
  //As soon as the finish image scrolls into view, the blocks
  //container will stop moving
  if (finish.getGlobalPosition().x > 256) {
    blocks.x -= 2;
  }

  //Add gravity to the pixie
  pixie.vy += -0.05;
  pixie.y -= pixie.vy;

  //Decide whether or not the pixie should flap her wings 
  //If she's starting to go up, make her flap her wings and emit pixie dust
  if (pixie.vy > pixie.oldVy) {
    if(!pixie.animating) {
      pixie.playAnimation();
      if (pixie.visible && !particleStream.playing) {
        particleStream.play();
      }
    }
  }
  //If she's staring to go down, stop flapping her wings, show the first frame 
  //and stop the pixie dust
  if (pixie.vy < 0 && pixie.oldVy > 0) {
    if (pixie.animating) pixie.stopAnimation();
    pixie.show(0);
    if (particleStream.playing) particleStream.stop();
  }

  //Store the pixie's current vy so we can use it
  //to find out if the pixie has changed direction
  //in the next frame. (You have to do this as the last step)
  pixie.oldVy = pixie.vy;

  //Keep the pixie contained inside the stage and 
  //neutralize her velocity if she hits the top or bottom boundary
  let pixieVsCanvas = b.contain(
    pixie,                           
    {                                
      x: 0,                         
      y: 0,                        
      width: renderer.view.width,    
      height: renderer.view.height  
    }
  );
  if (pixieVsCanvas) {
    if (pixieVsCanvas.has("bottom") || pixieVsCanvas.has("top")) {
      pixie.vy = 0;  
    }
  }

  //Loop through all the blocks and check for a collision between
  //each block and the pixie. (`some` will quit the loop as soon as
  //`hitTestRectangle` returns `true`). Set `hitTestRectangle`s third argument
  //to `true` to use the sprites' global coordinates

  let pixieVsBlock = blocks.children.some(block => {
    return b.hitTestRectangle(pixie, block, true);  
  });

  //If there's a collision and the pixie is currently visible,
  //create the explosion effect and reset the game after
  //a three second delay

  if (pixieVsBlock && pixie.visible) {

    //Make the pixie invisible
    pixie.visible = false;

    //Create a pixie dust explosion
    d.create(
      pixie.centerX, pixie.centerY, //x and y position
      () => u.sprite(dustFrames),   //Particle sprite
      stage,                        //The parent container
      20,                           //Number of particles
      0,                            //Gravity
      false,                        //Random spacing
      0, 6.28,                      //Min/max angle
      16, 32,                       //Min/max size
      1, 3                          //Min/max speed
    );
    
    //Stop the dust emitter that's trailing the pixie
    particleStream.stop();

    //Wait 3 seconds and then reset the game
    wait(3000).then(() => reset());
  }
}

//The `reset` function runs if the pixie hits a block
function reset() {

  //Reset the game if the pixie hits a block
  pixie.visible = true;
  pixie.y = 32;
  particleStream.play();
  blocks.x = 0;
}

//Helper functions

//The `randomInt` helper function
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//The `wait` helper function
function wait(duration = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  });
}
