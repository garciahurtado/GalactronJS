"use strict";
var __moduleName = "public/js/dist/galactron/enemies/enemy";
var Enemy = function Enemy(game) {
  var x = arguments[1] !== (void 0) ? arguments[1] : 0;
  var y = arguments[2] !== (void 0) ? arguments[2] : 0;
  var graphic = arguments[3];
  $traceurRuntime.superCall(this, $Enemy.prototype, "constructor", [game, x, y, graphic]);
  this.actions = new ActionChain(game, this);
  game.add.existing(this.actions);
  this.bullets = game.add.group();
};
var $Enemy = Enemy;
($traceurRuntime.createClass)(Enemy, {
  init: function() {
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    if (this.actions) {
      this.actions.start();
    }
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
    var explosion = recycle(Explosion);
    addSubSprite(explosion);
    explosion.centerAt(this);
    explosion.velocity.x = velocity.x;
    explosion.velocity.y = velocity.y;
    explosion.explode();
  },
  hurtAnimation: function() {},
  update: function() {
    $traceurRuntime.superCall(this, $Enemy.prototype, "update", []);
    this.lastShot += this.game.time.delta;
  },
  shoot: function() {
    lastShot = 0;
  },
  createBullet: function(bulletType, x, y) {
    var bullet = spriteFactory.recycle(bulletType);
    bullet.reset(x, y);
    bullet.parentGroup = bullets;
    bullets.add(bullet);
    return bullet;
  },
  addWeapon: function(weapon) {
    weapon.bullets = this.bullets;
    weapon.spriteFactory = spriteFactory;
  },
  reset: function(x, y, health) {
    $traceurRuntime.superCall(this, $Enemy.prototype, "reset", [x, y, health]);
    this.init();
  }
}, {}, Phaser.Sprite);

//# sourceMappingURL=enemy.js.map
