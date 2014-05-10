"use strict";
var __moduleName = "public/js/dist/galactron/enemies/enemy-wave";
var EnemyWave = function EnemyWave() {
  $traceurRuntime.defaultSuperCall(this, $EnemyWave.prototype, arguments);
};
var $EnemyWave = EnemyWave;
($traceurRuntime.createClass)(EnemyWave, {
  EnemyWave: function(game) {
    var x = arguments[1] !== (void 0) ? arguments[1] : 0;
    var y = arguments[2] !== (void 0) ? arguments[2] : 0;
    var enemyType = arguments[3] !== (void 0) ? arguments[3] : null;
    var waveSize = arguments[4] !== (void 0) ? arguments[4] : 1;
    var spawnDelay = arguments[5] !== (void 0) ? arguments[5] : 0;
    $traceurRuntime.superCall(this, $EnemyWave.prototype, "EnemyWave", [game]);
    this.x = x;
    this.y = y;
    this.enemyType = enemyType;
    this.waveSize = waveSize;
    this.spawnDelay = spawnDelay;
    this.enemies = new FlxGroup();
    this.bullets = new FlxGroup();
    this.powerups = new FlxGroup();
    this.fx = new FlxGroup();
  },
  reset: function(x, y) {
    $traceurRuntime.superCall(this, $EnemyWave.prototype, "reset", [x, y]);
    this.spawnTimer = 0;
    this.spawnCounter = 0;
    enemies.clear();
  },
  update: function() {
    $traceurRuntime.superCall(this, $EnemyWave.prototype, "update", []);
    this.spawnTimer += FlxG.elapsed;
    if ((spawnTimer > spawnDelay) && (spawnCounter < waveSize)) {
      spawnEnemy();
    }
  },
  spawnEnemy: function() {
    enemy = recycle(enemyType);
    enemy.spriteFactory = spriteFactory;
    enemy.bullets = this.bullets;
    enemy.reset(x, y);
    enemy.revive();
    enemy.player = player;
    enemy.wave = this;
    if (enemies.members.indexOf(enemy) == -1) {
      enemies.add(enemy);
    }
    spawnTimer = 0;
    spawnCounter++;
  },
  onEnemyKill: function(enemy) {
    enemies.remove(enemy);
    bullets.remove(enemy.bullets);
    if (enemies.countLiving() <= 0) {
      kill();
      dropPowerUp(enemy.x, enemy.y);
    }
  },
  kill: function() {
    $traceurRuntime.superCall(this, $EnemyWave.prototype, "kill", []);
    if (playState) {}
  },
  dropPowerUp: function(x, y) {
    powerup = recycle(PowerUp);
    powerup.x = x;
    powerup.y = y;
    powerups.add(powerup);
  }
}, {}, Phaser.Sprite);

//# sourceMappingURL=enemy-wave.js.map
