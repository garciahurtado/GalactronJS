"use strict";
var __moduleName = "public/js/dist/galactron/enemies/enemy-wave";
var EnemyWave = function EnemyWave(game) {
  var x = arguments[1] !== (void 0) ? arguments[1] : 0;
  var y = arguments[2] !== (void 0) ? arguments[2] : 0;
  var enemyType = arguments[3] !== (void 0) ? arguments[3] : null;
  var waveSize = arguments[4] !== (void 0) ? arguments[4] : 1;
  var spawnDelay = arguments[5] !== (void 0) ? arguments[5] : 0;
  $traceurRuntime.superCall(this, $EnemyWave.prototype, "constructor", [game]);
  this.enableBody = true;
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.game = game;
  this.x = x;
  this.y = y;
  this.enemyType = enemyType;
  this.waveSize = waveSize;
  this.spawnDelay = spawnDelay;
  this.enemies = game.add.group();
  this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
  this.enemies.enableBody = true;
  this.bullets = game.add.group();
  this.powerups = game.add.group();
  this.fx = game.add.group();
};
var $EnemyWave = EnemyWave;
($traceurRuntime.createClass)(EnemyWave, {
  reset: function(x, y) {
    $traceurRuntime.superCall(this, $EnemyWave.prototype, "reset", [x, y]);
    this.spawnTimer = 0;
    this.spawnCounter = 0;
  },
  update: function() {
    $traceurRuntime.superCall(this, $EnemyWave.prototype, "update", []);
    this.spawnTimer += this.game.time.elapsed / 1000;
    if ((this.spawnTimer > this.spawnDelay) && (this.spawnCounter < this.waveSize)) {
      this.spawnEnemy();
    }
  },
  spawnEnemy: function() {
    var enemy = this.enemies.getFirstDead(false);
    if (!enemy) {
      enemy = new this.enemyType(this.game, 0, 0);
      this.enemies.add(enemy);
    }
    enemy.revive();
    enemy.reset(this.x, this.y);
    enemy.bullets = this.bullets;
    enemy.player = this.player;
    enemy.wave = this;
    this.spawnTimer = 0;
    this.spawnCounter++;
  },
  onEnemyKill: function(enemy) {},
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
