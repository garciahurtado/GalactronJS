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
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.sounds.dent = game.add.audio('dent');
};
var $Enemy = Enemy;
($traceurRuntime.createClass)(Enemy, {
  init: function() {
    $traceurRuntime.superCall(this, $Enemy.prototype, "init", []);
    var colorMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    this.colorFilter = new PIXI.ColorMatrixFilter();
    this.colorFilter.matrix = colorMatrix;
    this.timer = this.game.time.events;
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
    var explosion = this.explosions.getRandom();
    explosion.reset();
    explosion.centerAt(this);
    explosion.explode();
  },
  damageAnimation: function() {
    this.sounds.dent.play();
    this.doLater(0, this.fillWhite, this);
    this.doLater(30, this.resetFilters, this);
    this.doLater(60, this.fillWhite, this);
    this.doLater(90, this.resetFilters, this);
  },
  fillWhite: function() {
    this.colorFilter.matrix = [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1];
    this.filters = [this.colorFilter];
  },
  resetFilters: function() {
    this.filters = null;
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
