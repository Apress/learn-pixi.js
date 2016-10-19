Keyboard
========

This repository hosts a simple and easy-to-use function called
`keyboard` that listens for and captures keyboard events. It's really
just a convenient wrapper function for HTML `keyup` and `keydown` events so that you can keep your application code clutter-free and easier to write and read.

Here's how to use the `keyboard` function. Create a new keyboard object like this:
```js
var keyObject = keyboard(asciiKeyCodeNumber);
```
It's one argument is the ASCII key code number of the keyboard key
that you want to listen for. [Here's a list of ASCII key codes you can
use](http://www.asciitable.com).
Then assign `press` and `release` methods to the keyboard object like this:
```js
keyObject.press = function() {
  //key object pressed
};
keyObject.release = function() {
  //key object released
};
```
Keyboard objects also have `isDown` and `isUp` Boolean properties that you can use to check the state of each key. 
