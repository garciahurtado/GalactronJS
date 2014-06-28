"use strict";
var __moduleName = "public/js/dist/galactron/player-ship";
var PlayerShip = function PlayerShip(game, x, y) {
  $traceurRuntime.superCall(this, $PlayerShip.prototype, "constructor", [game, x, y, 'player']);
  this.x = x;
  this.y = y;
  this.maxSpeed = 150;
  this.shootDelay = 200;
  this.nextBullet = 0;
  this.bulletSpeed = 500;
  this.animations.add('normal', [0], 1, false);
  this.animations.add('down', [1], 1, false);
  this.animations.add('up', [2], 1, false);
  this.play('normal');
  this.enableBody = true;
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.bullets = game.add.group();
  this.bullets.classType = BlueLaser;
  this.bullets.enableBody = true;
  this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
  this.bullets.createMultiple(50);
  this.bullets.setAll('checkWorldBounds', true);
  this.bullets.setAll('outOfBoundsKill', true);
  this.sounds = {};
  this.sounds.laser = game.add.audio('laser');
  this.explosions = game.add.group();
  this.explosions.classType = Explosion;
  this.explosions.createMultiple(5);
  var flame = new GalactronSprite(game, -12, 0, 'player_flame');
  flame.animations.add('burn', [0, 1], 20, true);
  flame.play('burn');
  this.addChild(flame);
};
var $PlayerShip = PlayerShip;
($traceurRuntime.createClass)(PlayerShip, {
  moveUp: function(elapsed) {
    this.play('up');
    this.body.velocity.y = -this.maxSpeed;
  },
  moveDown: function(elapsed) {
    this.play('down');
    this.body.velocity.y = this.maxSpeed;
  },
  moveRight: function(elapsed) {
    this.play('right');
    this.body.velocity.x = this.maxSpeed;
  },
  moveLeft: function(elapsed) {
    this.play('left');
    this.body.velocity.x = -this.maxSpeed;
  },
  stopMovement: function() {
    this.play('normal');
    this.body.velocity = {
      x: 0,
      y: 0
    };
  },
  deathAnimation: function() {
    var explosion = this.explosions.getFirstDead();
    explosion.reset();
    explosion.centerAt(this);
    explosion.explode();
  },
  fire: function() {
    if (this.game.time.now > this.nextBullet && this.bullets.countDead() > 0) {
      this.nextBullet = this.game.time.now + this.shootDelay;
      var bullet = this.bullets.getFirstDead();
      bullet.reset(this.x + 32, this.y + 14);
      bullet.body.velocity.x = this.bulletSpeed;
      this.sounds.laser.play();
    }
  },
  update: function() {
    $traceurRuntime.superCall(this, $PlayerShip.prototype, "update", []);
    this.body.position.x = Math.round(this.body.position.x);
    this.body.position.y = Math.round(this.body.position.y);
  }
}, {}, GalactronSprite);

//# sourceMappingURL=player-ship.js.map
