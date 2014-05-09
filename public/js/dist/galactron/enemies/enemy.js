"use strict";
var __moduleName = "public/js/dist/galactron/enemies/enemy";
var Enemy = function Enemy() {
  $traceurRuntime.defaultSuperCall(this, $Enemy.prototype, arguments);
};
var $Enemy = Enemy;
($traceurRuntime.createClass)(Enemy, {
  Enemy: function() {
    var x = arguments[0] !== (void 0) ? arguments[0] : 0;
    var y = arguments[1] !== (void 0) ? arguments[1] : 0;
    bullets = new FlxGroup();
    $traceurRuntime.superCall(this, $Enemy.prototype, "Enemy", [x, y]);
  },
  init: function() {
    $traceurRuntime.superCall(this, $Enemy.prototype, "init", []);
    lastShot = 0;
    score = 0;
    offscreenLifespan = 2;
  },
  kill: function() {
    $traceurRuntime.superCall(this, $Enemy.prototype, "kill", []);
    if (wave) {
      wave.onEnemyKill(this);
    }
  },
  deathAnimation: function() {
    explosion = recycle(Explosion);
    addSubSprite(explosion);
    explosion.centerAt(this);
    explosion.velocity.x = velocity.x;
    explosion.velocity.y = velocity.y;
    explosion.explode();
  },
  hurtAnimation: function() {
    FlxG.play(dentSound);
    this.addColorFill(0xFFFFFF);
    self = this;
    Utils.doLater(30, function() {
      self.removeColorFill();
    });
    Utils.doLater(60, function() {
      self.addColorFill(0xFFFFFF);
    });
    Utils.doLater(90, function() {
      self.removeColorFill();
    });
  },
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
}, {}, Sprite);

//# sourceMappingURL=enemy.js.map
