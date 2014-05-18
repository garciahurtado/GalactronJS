"use strict";
var __moduleName = "public/js/dist/galactron/enemies/enemy";
var Enemy = function Enemy(game) {
  var x = arguments[1] !== (void 0) ? arguments[1] : 0;
  var y = arguments[2] !== (void 0) ? arguments[2] : 0;
  var graphic = arguments[3];
  $traceurRuntime.superCall(this, $Enemy.prototype, "constructor", [game, x, y, graphic]);
  this.bullets = game.add.group();
  this.explosions = game.add.group();
  this.explosions.classType = Explosion;
  this.explosions.createMultiple(5);
};
var $Enemy = Enemy;
($traceurRuntime.createClass)(Enemy, {
  init: function() {
    $traceurRuntime.superCall(this, $Enemy.prototype, "init", []);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.lastShot = 0;
    this.score = 0;
    this.offscreenLifespan = 2;
  },
  kill: function() {
    $traceurRuntime.superCall(this, $Enemy.prototype, "kill", []);
    if (this.wave) {
      this.wave.onEnemyKill(this);
    }
  },
  deathAnimation: function() {
    var explosion = this.explosions.getFirstDead();
    explosion.reset();
    explosion.centerAt(this);
    explosion.explode();
  },
  hurtAnimation: function() {
    deathAnimation();
  },
  update: function() {
    $traceurRuntime.superCall(this, $Enemy.prototype, "update", []);
    this.lastShot += this.game.time.delta;
  },
  shoot: function() {
    lastShot = 0;
  },
  addWeapon: function(weapon) {
    weapon.bullets = this.bullets;
    weapon.spriteFactory = spriteFactory;
  },
  reset: function(x, y, health) {
    $traceurRuntime.superCall(this, $Enemy.prototype, "reset", [x, y, health]);
    this.init();
  }
}, {}, GalactronSprite);

//# sourceMappingURL=enemy.js.map
