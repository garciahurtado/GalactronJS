"use strict";
var __moduleName = "public/js/dist/galactron/player-ship";
var PlayerShip = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'player');
  this.x = x;
  this.y = y;
  this.maxSpeed = 150;
  this.shootDelay = 200;
  this.nextBullet = 0;
  this.bulletSpeed = 360;
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
  this.moveUp = function(elapsed) {
    this.play('up');
    this.body.velocity.y = -this.maxSpeed;
  };
  this.moveDown = function(elapsed) {
    this.play('down');
    this.body.velocity.y = this.maxSpeed;
  };
  this.moveRight = function(elapsed) {
    this.play('right');
    this.body.velocity.x = this.maxSpeed;
  };
  this.moveLeft = function(elapsed) {
    this.play('left');
    this.body.velocity.x = -this.maxSpeed;
  };
  this.stopMovement = function() {
    this.play('normal');
    this.body.velocity = {
      x: 0,
      y: 0
    };
  };
  this.fire = function() {
    if (this.game.time.now > this.nextBullet && this.bullets.countDead() > 0) {
      this.nextBullet = this.game.time.now + this.shootDelay;
      var bullet = this.bullets.getFirstDead();
      bullet.reset(this.x + 32, this.y + 14);
      bullet.body.velocity.x = this.bulletSpeed;
    }
  };
};
PlayerShip.prototype = Object.create(Phaser.Sprite.prototype);
PlayerShip.prototype.constructor = PlayerShip;

//# sourceMappingURL=player-ship.js.map
