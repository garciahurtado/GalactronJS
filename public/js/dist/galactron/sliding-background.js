"use strict";
var __moduleName = "public/js/dist/galactron/sliding-background";
var SlidingBackground = function SlidingBackground(game) {
  var x = arguments[1] !== (void 0) ? arguments[1] : 0;
  var y = arguments[2] !== (void 0) ? arguments[2] : 0;
  var graphic = arguments[3];
  var speed = arguments[4];
  $traceurRuntime.superCall(this, $SlidingBackground.prototype, "constructor", [game, x, y, graphic]);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.velocity.x = speed;
};
var $SlidingBackground = SlidingBackground;
($traceurRuntime.createClass)(SlidingBackground, {}, {}, GalactronSprite);

//# sourceMappingURL=sliding-background.js.map
