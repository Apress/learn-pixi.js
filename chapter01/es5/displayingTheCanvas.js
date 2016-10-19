//Create the renderer
"use strict";

var renderer = PIXI.autoDetectRenderer(144, 256);

/* You can also create a renderer with more advanced options like this:
//Create a Pixi renderer 
let renderer = PIXI.autoDetectRenderer(
  256,                     //Width 
  256,                     //Height
  {                        //Options
    antialiasing: false, 
    transparent: false, 
    resolution: 1
  }, 
  false                    //Optionally force canvas rendering
);

//Force canvas rendering like this: 
//let renderer = new PIXI.CanvasRenderer(256, 256);

//Force WebGL rendering like this:
//let renderer = new PIXI.WebGLRenderer(256, 256);
*/

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`. The `stage` is the
//root container for all your objects
var stage = new PIXI.Container();

//The `renderer.view` is just an ordinary `<canvas>` element.
//Here's how you can reference to add an optional dashed
//border around the canvas
renderer.view.style.border = "1px dashed black";

//To resize the canvas
//renderer.resize(512, 512);

//To change the background color
renderer.backgroundColor = 16777215;

//If you want to make the canvas fill the entire window, you can apply this
//CSS styling:
/*
renderer.view.style.position = "absolute"
renderer.view.style.width = window.innerWidth + "px";
renderer.view.style.height = window.innerHeight + "px";
renderer.view.style.display = "block";
*/

//Tell the renderer to render the stage
renderer.render(stage);

//Use the custom `scaleToWindow` function to scale and align Pixi's
//canvas to the maximum browser window size.
var scale = scaleToWindow(renderer.view);
console.log(scale);

//# sourceMappingURL=displayingTheCanvas.js.map
//# sourceMappingURL=displayingTheCanvas.js.map