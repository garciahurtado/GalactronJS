"use strict";
var __moduleName = "public/js/dist/galactron/bullet";
var Bullet = function Bullet(game, x, y, sprite) {
  $traceurRuntime.superCall(this, $Bullet.prototype, "constructor", [game, x, y, sprite]);
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.power = 1;
};
var $Bullet = Bullet;
($traceurRuntime.createClass)(Bullet, {}, {}, GalactronSprite);

//# sourceMappingURL=bullet.js.map
