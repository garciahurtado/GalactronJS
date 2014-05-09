"use strict";
var __moduleName = "public/js/dist/galactron/enemies/alien";
var Alien = function Alien(game, x, y) {
  $traceurRuntime.superCall(this, $Alien.prototype, "constructor", [game, x, y, 'alien']);
  this.x = x;
  this.y = y;
  this.score = 100;
  this.health = 5;
  game.physics.enable(this, Phaser.Physics.ARCADE);
  var anim = this.animations.add('wiggle', [0, 1, 2, 3, 2], 6, true);
  anim.play('wiggle');
};
var $Alien = Alien;
($traceurRuntime.createClass)(Alien, {}, {}, Phaser.Sprite);

//# sourceMappingURL=alien.js.map
