/**
 * Player spaceship
 */
var PlayerShip = function(game, x, y) {
  // Inherits from Sprite
  Phaser.Sprite.call(this, game, x, y, 'player');

  this.x = x;
  this.y = y;

  this.maxSpeed = 150;
  this.shootDelay = 200; // in millis
  this.nextBullet = 0;
  this.bulletSpeed = 360;

  this.animations.add('normal', [0], 1, false);
  this.animations.add('down', [1], 1, false);
  this.animations.add('up', [2], 1, false);
  this.play('normal');

  // Physics
  this.enableBody = true;
  game.physics.enable(this, Phaser.Physics.ARCADE);

  // Create player bullets
  this.bullets = game.add.group();
  this.bullets.enableBody = true;
  this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

  this.bullets.createMultiple(50, 'laser_blue');
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

  /**
   * If enough time has ellapsed since the last shot was fired, create a
   * new bullet and fire again
   */
  this.fire = function() {
    if (this.game.time.now > this.nextBullet && this.bullets.countDead() > 0) {
      this.nextBullet = this.game.time.now + this.shootDelay;
      var bullet = this.bullets.getFirstDead();
      bullet.reset(this.x + 32, this.y + 14); // spawn coords of bullet relative to player
      bullet.body.velocity.x = this.bulletSpeed;
    }
  }
}

PlayerShip.prototype = Object.create(Phaser.Sprite.prototype);
PlayerShip.prototype.constructor = PlayerShip;