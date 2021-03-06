"use strict";
var __moduleName = "public/js/dist/galactron/enemies/enemy-wave";
var EnemyWave = function EnemyWave(game, enemyType, spawnCoords) {
  var waveSize = arguments[3] !== (void 0) ? arguments[3] : 1;
  var spawnDelay = arguments[4] !== (void 0) ? arguments[4] : 0;
  $traceurRuntime.superCall(this, $EnemyWave.prototype, "constructor", [game]);
  this.playState = game.state.getCurrentState();
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.game = game;
  this.spawnCoords = spawnCoords;
  this.init();
  this.enemyType = enemyType;
  this.waveSize = waveSize;
  this.spawnDelay = spawnDelay;
  this.onSpawnEnemy = false;
  this.debugSprite = false;
  this.debugColor = '#FF6600';
  this.powerups = game.add.group();
  this.fx = game.add.group();
};
var $EnemyWave = EnemyWave;
($traceurRuntime.createClass)(EnemyWave, {
  init: function() {
    this.spawnTimer = 0;
    this.spawnCounter = 0;
    this.spawnCoordsIndex = 0;
  },
  update: function() {
    $traceurRuntime.superCall(this, $EnemyWave.prototype, "update", []);
    this.spawnTimer += this.game.time.elapsed / 1000;
    if ((this.spawnTimer > this.spawnDelay) && (this.spawnCounter < this.waveSize)) {
      this.spawnEnemy();
      if (this.spawnDelay == 0) {
        this.update();
      }
    }
  },
  spawnEnemy: function() {
    var enemy = false;
    if (!enemy) {
      enemy = new this.enemyType(this.game, 0, 0);
      if (this.onSpawnEnemy) {
        this.onSpawnEnemy(enemy);
      }
    }
    var current = this.spawnCoords[this.spawnCoordsIndex];
    enemy.reset(current.x, current.y);
    if (++this.spawnCoordsIndex >= this.spawnCoords.length) {
      this.spawnCoordsIndex = 0;
    }
    enemy.player = this.player;
    enemy.wave = this;
    this.spawnTimer = 0;
    this.spawnCounter++;
  },
  onEnemyKill: function(enemy) {},
  kill: function() {
    $traceurRuntime.superCall(this, $EnemyWave.prototype, "kill", []);
    if (this.playState) {}
  },
  dropPowerUp: function(x, y) {
    powerup = recycle(PowerUp);
    powerup.x = x;
    powerup.y = y;
    powerups.add(powerup);
  }
}, {}, GalactronSprite);

//# sourceMappingURL=enemy-wave.js.map
