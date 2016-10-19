function contain(sprite, container) {

  //Create a `Set` called `collision` to keep track of the
  //boundaries with which the sprite is colliding
  var collision = new Set();

  //Left
  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision.add("left");
  }

  //Top
  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision.add("top");
  }

  //Right
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    collision.add("right");
  }

  //Bottom
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
    collision.add("bottom");
  }

  //If there were no collisions, set `collision` to `undefined`
  if (collision.size === 0) collision = undefined;

  //Return the `collision` value
  return collision;
}

