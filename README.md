# GALACTRON
Galactron is an old school throwback to the golden era side shooters such as F-type and Gradius. It's visual style is somewhere between 8 and 16-bit (12 bit?). It uses deliciously crunchy pixel art sprites and low tech chiptune music and sound effects. It uses the open source game library [Phaser](http://phaser.io/), which itself relies on Pixi.js for [rendering](http://www.pixijs.com/).

## How to run
1. Clone the project
2. Run "npm install"
3. Run "grunt". This launches the node server.
4. Open http://localhost:3000 and waste some aliens!

## ES6
Most of the custom JavaScript code in this project is written in ES6. Don't be weirded out by the class syntax and ES6 syntax, it is mostly syntatic sugar that ends up transpiling to "regular" JS.

It uses the [Traceur](https://github.com/google/traceur-compiler) transpiler to automatically convert to browser-ready ES5. A Grunt task automatically watches all JS source folders while the server is running and ensures that all the latest changes are transpiled on the fly.

Traceur creates source maps of the files it transpiles, so debugging in-browser can be done using the source code that you wrote, rather than the output from Traceur.

## SASS
Although there isn't much CSS in this one page HTML5 game, I am using Compass for SASS > CSS compilation.

## Known issues
- This game is very much unfinished. The engine is about 80% done, but there is no consistent content for the levels
- Aliased pixel art is only currently available in Firefox when using WebGL. Due to the way that Phaser upscales the stage via CSS, there is no easy solution for this at the moment.
- The music is still not in place 
- Level content is pretty much random and only being used for development at the time
- There are several areas requiring performance optimization
- The "Action Chain" system needs to be revamped to be faster, have a cleaner API and leverage Phaser timed events.

## Copyright
All graphic assets, music files, text content and code are the copyright of Garcia Hurtado. You can fork the repo and play around with the code, but please don't steal any of the art, as it is all hand made and a great deal of effort went into it.