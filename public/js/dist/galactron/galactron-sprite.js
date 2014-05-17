"use strict";
var __moduleName = "public/js/dist/galactron/galactron-sprite";
var GalactronSprite = function GalactronSprite() {
  $traceurRuntime.defaultSuperCall(this, $GalactronSprite.prototype, arguments);
};
var $GalactronSprite = GalactronSprite;
($traceurRuntime.createClass)(GalactronSprite, {
  hurt: function(damage) {
    $traceurRuntime.superCall(this, $GalactronSprite.prototype, "hurt", [damage]);
    if (alive) {
      hurtAnimation();
    }
  },
  kill: function() {
    $traceurRuntime.superCall(this, $GalactronSprite.prototype, "kill", []);
    if (this.inWorld) {
      this.deathAnimation();
    }
  },
  centerAt: function(target) {
    this.x = target.x + Math.round(target.width * .5);
    this.y = target.y + Math.round(target.height * .5);
    this.x -= Math.round(this.width / 2);
    this.y -= Math.round(this.height / 2);
  },
  hurtAnimation: function() {
    return;
  },
  deathAnimation: function() {
    return;
  }
}, {}, Phaser.Sprite);

//# sourceMappingURL=galactron-sprite.js.map
