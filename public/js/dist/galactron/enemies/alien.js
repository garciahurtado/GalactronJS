"use strict";
var __moduleName = "public/js/dist/galactron/enemies/alien";
var Alien = function Alien(game, x, y) {
  $traceurRuntime.superCall(this, $Alien.prototype, "constructor", [game, x, y, 'alien']);
  this.x = x;
  this.y = y;
  this.animations.add('wiggle', [0, 1, 2, 3, 2], 6, true);
  this.init();
};
var $Alien = Alien;
($traceurRuntime.createClass)(Alien, {init: function() {
    $traceurRuntime.superCall(this, $Alien.prototype, "init", []);
    this.score = 100;
    this.health = 10;
    this.body.velocity.x = -50;
    this.animations.play('wiggle');
  }}, {}, Enemy);

//# sourceMappingURL=alien.js.map
