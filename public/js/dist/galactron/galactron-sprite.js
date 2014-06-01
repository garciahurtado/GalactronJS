"use strict";
var __moduleName = "public/js/dist/galactron/galactron-sprite";
var GalactronSprite = function GalactronSprite(game) {
  var x = arguments[1] !== (void 0) ? arguments[1] : 0;
  var y = arguments[2] !== (void 0) ? arguments[2] : 0;
  var graphic = arguments[3];
  this.math = game.math;
  $traceurRuntime.superCall(this, $GalactronSprite.prototype, "constructor", [game, x, y, graphic]);
  this.actions = new ActionChain(game, this);
  game.add.existing(this.actions);
  this.flickering = false;
};
var $GalactronSprite = GalactronSprite;
($traceurRuntime.createClass)(GalactronSprite, {
  flicker: function() {
    var seconds = arguments[0] !== (void 0) ? arguments[0] : 0;
    this.flickering = true;
    if (seconds) {
      this.game.time.events.add(Phaser.Timer.SECOND * seconds, function() {
        this.flickering = false;
        this.alpha = 1;
      }, this);
    }
  },
  update: function() {
    $traceurRuntime.superCall(this, $GalactronSprite.prototype, "update", []);
    if (this.flickering) {
      this.alpha = this.alpha ? 0 : 1;
    }
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
  },
  angleTo: function(target) {
    return this.math.angleBetweenPoints(this, target);
  },
  distanceTo: function(target) {
    return this.math.distance(this.x, this.y, target.x, target.y);
  },
  centerAt: function(target) {
    this.x = target.x + Math.round(target.width * .5);
    this.y = target.y + Math.round(target.height * .5);
    this.x -= Math.round(this.width / 2);
    this.y -= Math.round(this.height / 2);
  }
}, {}, Phaser.Sprite);

//# sourceMappingURL=galactron-sprite.js.map
