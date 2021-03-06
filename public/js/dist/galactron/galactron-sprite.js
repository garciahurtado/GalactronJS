"use strict";
var __moduleName = "public/js/dist/galactron/galactron-sprite";
var GalactronSprite = function GalactronSprite(game) {
  var x = arguments[1] !== (void 0) ? arguments[1] : 0;
  var y = arguments[2] !== (void 0) ? arguments[2] : 0;
  var graphic = arguments[3];
  this.math = game.math;
  this.immune = false;
  this.debugSprite = false;
  this.debugBody = false;
  this.debugSpriteColor = '#00FF00';
  this.debugBodyColor = '#FF0000';
  $traceurRuntime.superCall(this, $GalactronSprite.prototype, "constructor", [game, x, y, graphic]);
  this.actions = new ActionChain(game, this);
  game.add.existing(this.actions);
  this.sounds = {};
};
var $GalactronSprite = GalactronSprite;
($traceurRuntime.createClass)(GalactronSprite, {
  update: function() {
    if (this.debugBody) {
      this.game.debug.body(this, this.debugBodyColor, false);
    }
    if (this.debugSprite) {
      this.game.debug.spriteBounds(this, this.debugSpriteColor, false);
    }
    if (this.body) {
      this.body.position.x = Math.floor(this.body.position.x);
      this.body.position.y = Math.floor(this.body.position.y);
    }
  },
  reset: function(x, y) {
    $traceurRuntime.superCall(this, $GalactronSprite.prototype, "reset", [x, y, this.health]);
    this.init();
  },
  init: function() {
    if (this.actions) {
      this.actions.start();
    }
  },
  damage: function(amount) {
    $traceurRuntime.superCall(this, $GalactronSprite.prototype, "damage", [amount]);
    if (this.alive) {
      this.damageAnimation();
    }
  },
  damageAnimation: function() {
    return;
  },
  kill: function() {
    $traceurRuntime.superCall(this, $GalactronSprite.prototype, "kill", []);
    if (this.inWorld) {
      this.deathAnimation();
    }
  },
  onChildKilled: function() {},
  deathAnimation: function() {
    return;
  },
  revive: function() {
    $traceurRuntime.superCall(this, $GalactronSprite.prototype, "revive", [this.health]);
  },
  angleTo: function(target) {
    return this.math.angleBetweenPoints(this, target);
  },
  distanceTo: function(target) {
    return this.math.distance(this.x, this.y, target.x, target.y);
  },
  centerAt: function(target) {
    this.x = target.world.x + Math.round(target.width * 0.5);
    this.y = target.world.y + Math.round(target.height * 0.5);
    this.x -= Math.round(this.width / 2);
    this.y -= Math.round(this.height / 2);
  },
  turn: function(angle) {
    angle = angle * (180 / Math.PI);
    this.game.physics.arcade.velocityFromAngle(angle, this.body.speed, this.body.velocity);
  },
  doLater: function(millis, action, context) {
    context = context || this;
    this.game.time.events.add(millis, action, context);
  }
}, {}, Phaser.Sprite);

//# sourceMappingURL=galactron-sprite.js.map
