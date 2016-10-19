Contain a sprite inside an area
===============================

This repository hosts a simple but useful JavaScript ES6 function
called `contain`. It can be used to contain a sprite with `x` and
`y` properties inside a rectangular area.

The `contain` function takes two arguments: a sprite with `x` and `y`
properties, and an object literal with `x`, `y`, `width` and `height` properties.
```js
contain(anySprite, {x: 0, y: 0, width: 512, height: 512});
```
The code above will contain the sprite's position inside the 512 by
512 pixel area defined by the object. For example, you could contain
the a sprite inside a 512 by 512 area like this:

If the sprite bumps into any of the containing object's boundaries,
the `contain` function will return a value that tells you which side
the sprite bumped into: “left”, “top”, “right” or “bottom”. Here's how
you could keep the sprite contained and also find out which boundary
it hit:
```js
//Contain the sprite and find the collision value
let collision = contain(anySprite, {x: 0, y: 0, width: 512, height: 512});

//If there's a collision, display the boundary that the collision happened on
if(collision) {
  if collision.has("left") console.log("The sprite hit the left");  
  if collision.has("top") console.log("The sprite hit the top");  
  if collision.has("right") console.log("The sprite hit the right");  
  if collision.has("bottom") console.log("The sprite hit the bottom");  
}
```
If the sprite doesn't hit a boundary, the value of
`collision` will be `undefined`. 
