`hitTestRectangle` is a simple JavaScript function that compares the
positions of two sprites, and returns `true` if their areas are
overlapping. You can use it with any sprite scene graph library (like
[Pixi](https://github.com/GoodBoyDigital/pixi.js/)) which has sprites with `x`, `y`, `width` and `height`
properties. Use `hitTestRectangle` to test for a collision between
two sprites like this:
```js
if (hitTestRectangle(spriteOne, spriteTwo)) {
  //A collision has occured  
}
```
`hitTestRectangle` works by measuring the distance between the center points of each sprite checking whether that distance if less than the combined half widths and heights of the sprites. If the distance is less, then you know there's been a collision. 
