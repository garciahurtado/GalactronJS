"use strict";
var __moduleName = "public/js/dist/galactron/galactron-sprite";
var GalactronSprite = function GalactronSprite(game) {
  var x = arguments[1] !== (void 0) ? arguments[1] : 0;
  var y = arguments[2] !== (void 0) ? arguments[2] : 0;
  var graphic = arguments[3];
  $traceurRuntime.superCall(this, $GalactronSprite.prototype, "constructor", [game, x, y, graphic]);
  this.actions = new ActionChain(game, this);
  game.add.existing(this.actions);
};
var $GalactronSprite = GalactronSprite;
($traceurRuntime.createClass)(GalactronSprite, {
  centerAt: function(target) {
    this.x = target.x + Math.round(target.width * .5);
    this.y = target.y + Math.round(target.height * .5);
    this.x -= Math.round(this.width / 2);
    this.y -= Math.round(this.height / 2);
  },
  reset: function(x, y, health) {
    $traceurRuntime.superCall(this, $GalactronSprite.prototype, "reset", [x, y, health]);
    this.init();
  },
  init: function() {
    if (this.actions) {
      this.actions.start();
    }
  },
  hurt: function(damage) {
    $traceurRuntime.superCall(this, $GalactronSprite.prototype, "hurt", [damage]);
    if (alive) {
      hurtAnimation();
    }
  },
  hurtAnimation: function() {
    return;
  },
  kill: function() {
    $traceurRuntime.superCall(this, $GalactronSprite.prototype, "kill", []);
    if (this.inWorld) {
      this.deathAnimation();
    }
  },
  deathAnimation: function() {
    return;
  }
}, {}, Phaser.Sprite);

//# sourceMappingURL=galactron-sprite.js.map
