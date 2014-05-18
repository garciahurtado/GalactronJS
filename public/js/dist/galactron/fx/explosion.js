"use strict";
var __moduleName = "public/js/dist/galactron/fx/explosion";
var Explosion = function Explosion(game, x, y) {
  $traceurRuntime.superCall(this, $Explosion.prototype, "constructor", [game, x, y, 'explosion']);
  this.animations.add('explode', [1, 2, 3, 4, 5], 8);
};
var $Explosion = Explosion;
($traceurRuntime.createClass)(Explosion, {explode: function() {
    this.play('explode');
    this.events.onAnimationComplete.add(function() {
      this.kill();
    }, this);
  }}, {}, GalactronSprite);

//# sourceMappingURL=explosion.js.map
