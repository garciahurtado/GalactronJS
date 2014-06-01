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
};
($traceurRuntime.createClass)(PlayState, {
  preload: function() {},
  create: function() {
    this.events = new ActionChain(this.game);
    this.score = 0;
    this.scoreDisplay;
    this.lives = 3;
    this.isGameOver = false;
    this.background = this.game.add.group();
    this.waves = this.game.add.group();
    this.enemies = this.game.add.group();
    this.enemyBullets = this.game.add.group();
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
  },
  enableInput: function() {
    this.controls = this.game.input.keyboard.createCursorKeys();
    this.controls.fire = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
    this.controls.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.controls.pause = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
    this.controls.pause.onDown.add(function() {
      this.game.paused = !this.game.paused;
    }, this);
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
    this.playerInput(this.game.time.elapsed);
    if (this.isGameOver) {
      return;
    }
    this.game.physics.arcade.overlap(this.playerBullets, this.enemies.children, this.enemyHit, null, this);
    if (!this.player.flickering) {
      this.game.physics.arcade.overlap(this.enemies.children[0], this.player, this.playerHit, null, this);
    }
  },
  addWave: function(x, y, enemyType, count, delay) {
    delay = typeof delay !== 'undefined' ? delay : 0;
    count = typeof count !== 'undefined' ? count : 1;
    var wave = this.waves.getFirstExists(false);
    if (!wave) {
      wave = new EnemyWave(this.game, x, y, enemyType, count, delay);
      this.waves.add(wave);
    }
    wave.reset(x, y);
    wave.player = this.player;
    this.enemies.add(wave.enemies);
    this.enemyBullets.add(wave.bullets);
    return wave;
  },
  enemyHit: function(bullet, enemy) {
    bullet.kill();
    enemy.damage(bullet.power);
    if (!enemy.alive) {
      this.addScore(enemy.score);
    }
  },
  playerHit: function(player, enemy) {
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
    this.player.body.velocity.x = 100;
    this.player.flicker(3);
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
  createText: function(text, x, y) {
    var size = arguments[3] !== (void 0) ? arguments[3] : 8;
    var font = arguments[4] !== (void 0) ? arguments[4] : 'FirewireBlack';
    var color = arguments[5] !== (void 0) ? arguments[5] : "#FFFFFF";
    var align = arguments[6] !== (void 0) ? arguments[6] : 'center';
    var style = {
      font: size + "px " + font,
      fill: color,
      align: align
    };
    var txt = this.game.add.text(x, y, text, style);
    if (align == 'center') {
      txt.anchor.setTo(0.5, 0.5);
    } else if (align == 'right') {
      txt.anchor.setTo(1, 1);
    }
    return txt;
  }
}, {});

//# sourceMappingURL=play-state.js.map
