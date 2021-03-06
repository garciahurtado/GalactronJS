"use strict";
var __moduleName = "public/js/dist/galactron/sprite";
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
    if (parentGroup != null) {
      parentGroup.remove(this);
    }
    if (onScreen()) {
      deathAnimation();
    }
  },
  hurtAnimation: function() {
    return;
  },
  deathAnimation: function() {
    return;
  }
}, {}, Phaser.Sprite);

//# sourceMappingURL=sprite.js.map
