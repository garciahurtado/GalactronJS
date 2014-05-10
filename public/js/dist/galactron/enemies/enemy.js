"use strict";
var __moduleName = "public/js/dist/galactron/enemies/enemy";
var Enemy = function Enemy() {
  $traceurRuntime.defaultSuperCall(this, $Enemy.prototype, arguments);
};
var $Enemy = Enemy;
($traceurRuntime.createClass)(Enemy, {
  Enemy: function(game) {
    var x = arguments[1] !== (void 0) ? arguments[1] : 0;
    var y = arguments[2] !== (void 0) ? arguments[2] : 0;
    $traceurRuntime.superCall(this, $Enemy.prototype, "Enemy", [game, x, y]);
  },
  init: function() {
    $traceurRuntime.superCall(this, $Enemy.prototype, "init", []);
    lastShot = 0;
    score = 0;
    offscreenLifespan = 2;
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
    lastShot += FlxG.elapsed;
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
  }
}, {}, Phaser.Sprite);

//# sourceMappingURL=enemy.js.map
