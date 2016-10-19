"use strict";

PIXI.loader.add(["images/blob.png", "images/door.png", "images/explorer.png"]).on("progress", loadProgressHandler).load(setup);

function loadProgressHandler(loader, resource) {

  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url);

  //Display the percentage of files currently loaded
  console.log("progress: " + loader.progress);

  //If you gave your files names as the first argument
  //of the `add` method, you can access them like this
  //console.log(`loading: ${resource.name}`);
}

function setup() {
  console.log("All files loaded");
}
//# sourceMappingURL=monitorLoadProgress.js.map