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
    this.controls = this.game.input.keyboard.createCursorKeys();
    this.controls.fire = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  },
  createHud: function() {
    var offset = 0;
    for (var i = 0; i < this.lives; i++) {
      var life = new Phaser.Sprite(this.game, 5 + offset, 5, 'player_life');
      this.livesSprites.add(life);
      offset += 18;
    }
    this.scoreDisplay = this.createText("00000000", 320, 5);
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
    this.game.physics.arcade.overlap(this.playerBullets, this.enemies.children[0], this.enemyHit, null, this);
    if (this.player.flickering == false) {}
  },
  playerInput: function(elapsed) {
    var keys = this.controls;
    if (!this.isGameOver) {
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
    } else {}
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
  },
  playerHit: function(player, enemy) {
    this.player.kill();
    var lostLife = this.livesSprites.members[this.lives - 1];
    lostLife.kill();
    this.lives--;
    if (this.lives > 0) {
      Utils.doLater(2000, function() {
        this.spawnPlayer();
      });
    } else {
      Utils.doLater(600, function() {
        this.gameOver();
      });
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
    this.playerBullets = this.player.bullets;
    this.player.body.collideWorldBounds = true;
    this.playerLayer.add(this.player);
  },
  gameOver: function() {
    isGameOver = true;
    var txt = createText("GAME OVER", -400, Math.floor(FlxG.height / 2) - 20);
    txt.setFormat("firewire", 24);
    var txt2 = createText("GAME OVER", -400, Math.floor(FlxG.height / 2) - 20);
    txt2.setFormat("firewire_black", 24, 0xFFFF0000);
    var moreTxt = createText("PRESS ENTER TO RESTART", 300, 200);
    var gradientColors = FlxGradient.createGradientArray(1, 20, [0xff0000ff, 0xffff00ff, 0xFFFFFF00, 0xFF00FF00], 1);
    var gradientSprite = FlxGradient.createGradientFlxSprite(100, 100, [0xffff0000, 0xffffff00], 2);
    gradientSprite.scrollFactor.x = 0;
    gradientSprite.scrollFactor.y = 0;
    gradientSprite.x = 0;
    gradientSprite.y = 0;
    var maskedGradient = new FlxSprite(100, 100);
    maskedGradient.scrollFactor = txt2.scrollFactor;
    FlxGradient.overlayGradientOnBitmapData(this.player.pixels, 100, 100, gradientColors);
  },
  createText: function(text, x, y, color, width) {
    x = typeof x !== 'undefined' ? x : 0;
    y = typeof y !== 'undefined' ? y : 0;
    color = typeof color !== 'undefined' ? color : 0xFFFFFFFF;
    width = typeof width !== 'undefined' ? width : this.game.world.width;
    var style = {
      font: "8px FirewireBlack",
      fill: "#FFFFFF",
      align: "center"
    };
    var txt = this.game.add.text(x, y, text, style);
    txt.align = 'right';
    return txt;
  }
}, {});

//# sourceMappingURL=play-state.js.map
