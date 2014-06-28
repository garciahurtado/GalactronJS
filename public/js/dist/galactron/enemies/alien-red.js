"use strict";
var __moduleName = "public/js/dist/galactron/enemies/alien-red";
var AlienRed = function AlienRed(game, x, y) {
  $traceurRuntime.superCall(this, $AlienRed.prototype, "constructor", [game, x, y, 'alien_red']);
  this.x = x;
  this.y = y;
  this.animations.add('wiggle', [4, 5, 6, 7], 6, true);
  this.animations.add('charge', [4, 5, 6, 7], 6, true);
  this.init();
};
var $AlienRed = AlienRed;
($traceurRuntime.createClass)(AlienRed, {}, {}, Alien2);

//# sourceMappingURL=alien-red.js.map
