"use strict";
var __moduleName = "public/js/dist/galactron/play-state";
var PlayState = function PlayState(game) {
  this.camera;
  this.player;
  this.playerLayer;
  this.playerBullets;
  this.fx;
  this.events;
  this.enemies;
  this.waves;
  this.enemyBullets;
  this.powerups;
  this.background;
  this.isGameOver;
  this.score;
  this.gui;
  this.lives;
  this.livesSprites;
  this.scoreDisplay;
  this.controls;
  this.game = game;
  game.plugins.add(new Phaser.Plugin.Flicker());
};
($traceurRuntime.createClass)(PlayState, {
  preload: function() {
    this.game.load.script('abstracFilter', '/js/lib/pixi/abstract-filter.js');
    this.game.load.script('filter', '/js/lib/pixi/color-matrix-filter.js');
  },
  create: function() {
    this.events = new ActionChain(this.game);
    this.score = 0;
    this.scoreDisplay;
    this.lives = 3;
    this.isGameOver = false;
    this.background = this.game.add.group();
    this.waves = this.game.add.group();
    this.enemies = [];
    this.enemyLayer = this.game.add.group();
    this.enemyBullets = this.game.add.group();
    this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.game.physics.arcade.enable(this.enemyBullets);
    this.playerBullets = this.game.add.group();
    this.playerBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.game.physics.arcade.enable(this.playerBullets);
    this.player;
    this.playerLayer = this.game.add.group();
    this.powerups = this.game.add.group();
    this.fx = this.game.add.group();
    this.gui = this.game.add.group();
    this.livesSprites = this.game.add.group();
    this.spawnPlayer();
    this.createHud();
    this.enableInput();
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.debug.font = "8px Courier";
  },
  createHud: function() {
    var offset = 0;
    for (var i = 0; i < this.lives; i++) {
      var life = new Phaser.Sprite(this.game, 5 + offset, 5, 'player_life');
      this.livesSprites.add(life);
      offset += 18;
    }
    this.scoreDisplay = this.createText("00000000", 370, 16, 8, 'FirewireBlack', '#FFFFFF', 'right');
    this.addStatic(this.scoreDisplay);
  },
  addScore: function(points) {
    this.score += points;
    this.scoreDisplay.text = Utils.padString(this.score.toString(), 8, 0);
  },
  addStatic: function(sprite) {
    this.gui.add(sprite);
  },
  update: function() {
    this.debugText("Num sprites: " + this.game.stage.currentRenderOrderID);
    this.playerInput(this.game.time.elapsed);
    this.events.update();
    if (this.isGameOver) {
      return;
    }
    for (var i = 0; i < this.enemies.length; i++) {
      this.game.physics.arcade.overlap(this.playerBullets, this.enemies[i], this.enemyHit, null, this);
    }
    ;
    if (!this.player.immune && this.player.exists) {
      for (var i = 0; i < this.enemies.length; i++) {
        this.game.physics.arcade.overlap(this.player, this.enemies[i], this.playerHit, null, this);
      }
      ;
      this.game.physics.arcade.overlap(this.player, this.enemyBullets, this.playerHit, null, this);
    }
  },
  spawnWave: function(enemyType, spawnCoords, count, delay) {
    delay = typeof delay !== 'undefined' ? delay : 0;
    count = typeof count !== 'undefined' ? count : 1;
    var wave = this.waves.getFirstExists(false);
    if (!wave) {
      wave = new EnemyWave(this.game, enemyType, spawnCoords, count, delay);
      var playState = this;
      wave.onSpawnEnemy = function(enemy) {
        playState.onSpawnEnemy(enemy);
      };
      this.waves.add(wave);
    }
    wave.init();
    wave.enemies = this.enemies;
    wave.player = this.player;
    return wave;
  },
  onSpawnEnemy: function(enemy) {
    this.enemies.push(enemy);
    this.enemyLayer.add(enemy);
    if (enemy.children) {
      this.enemies.push(enemy.children);
    }
    var gameBullets = this.enemyBullets;
    if (this.enemyBullets) {
      this.enemyBullets.addMany(enemy.bullets);
    }
    enemy.bullets = gameBullets;
  },
  enemyHit: function(enemy, bullet) {
    bullet.kill();
    enemy.damage(bullet.power);
    if (!enemy.alive) {
      this.addScore(enemy.score);
    }
  },
  playerHit: function(player, enemy) {
    if (!player.alive) {
      return;
    }
    this.player.kill();
    var lostLife = this.livesSprites.children[this.lives - 1];
    lostLife.kill();
    this.lives--;
    var sec = Phaser.Timer.SECOND;
    var self = this;
    if (this.lives > 0) {
      this.game.time.events.add(sec * 2, function() {
        this.spawnPlayer();
      }, this);
    } else {
      this.game.time.events.add(sec * 0.6, function() {
        this.gameOver();
      }, this);
    }
  },
  playerInput: function(elapsed) {
    var keys = this.controls;
    if (!this.isGameOver) {
      if (!this.player.exists) {
        return false;
      }
      if (keys.up.isDown) {
        this.player.moveUp(elapsed);
      } else if (keys.down.isDown) {
        this.player.moveDown(elapsed);
      } else {
        this.player.stopMovement();
      }
      if (keys.left.isDown) {
        this.player.moveLeft(elapsed);
      } else if (keys.right.isDown) {
        this.player.moveRight(elapsed);
      }
      if (keys.fire.isDown) {
        this.player.fire();
      }
    } else {
      if (keys.enter.isDown) {
        this.isGameOver = false;
        this.game.state.start('Level1');
        return;
      }
    }
  },
  powerUp: function(ship, powerup) {
    var explosion = new LaserExplosion(powerup.x, powerup.y);
    explosion.velocity = powerup.velocity;
    explosion.explode();
    powerup.kill();
    var newWeapon = player.mainWeapon.powerUp();
    if (newWeapon) {
      player.changeWeapon(newWeapon);
    }
  },
  spawnPlayer: function() {
    this.player = new PlayerShip(this.game, 0, 100);
    this.player.flicker(null, 3000);
    this.player.body.velocity.x = 100;
    this.playerBullets = this.player.bullets;
    this.player.body.collideWorldBounds = true;
    this.playerLayer.add(this.player);
  },
  gameOver: function() {
    this.isGameOver = true;
    var left = Math.floor(this.game.width / 2);
    var top = Math.floor(this.game.height / 2);
    var txt = this.createText("GAME OVER", -400, top, 24, 'Firewire', '#FFFFFF', 'center');
    var txt2 = this.createText("GAME OVER", -400, top, 24, 'FirewireBlack', '#FF0000', 'center');
    this.game.add.tween(txt).to({x: left}, 200, Phaser.Easing.Linear.None, true, 0, false);
    this.game.add.tween(txt2).to({x: left}, 200, Phaser.Easing.Linear.None, true, 0, false);
    var moreTxt = this.createText("PRESS ENTER TO RESTART", 500, 200);
    this.game.add.tween(moreTxt).to({x: left}, 200, Phaser.Easing.Linear.None, true, 0, false);
  },
  doLater: function(millis, action, context) {
    var context = context || this;
    this.game.time.events.add(millis, action, context);
  },
  debugText: function(text) {
    var x = arguments[1] !== (void 0) ? arguments[1] : 5;
    var y = arguments[2] !== (void 0) ? arguments[2] : 25;
    this.game.debug.text(text, x, y, '#0F0', '8px FirewireBlack');
  }
}, {}, GameState);

//# sourceMappingURL=play-state.js.map
