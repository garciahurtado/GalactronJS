/**
 * Player spaceship
 */
class PlayerShip extends GalactronSprite {
  constructor(game, x, y){
    super(game, x, y, 'player');

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
    this.bullets.classType = BlueLaser;
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    this.bullets.createMultiple(50);
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);

    this.explosions = game.add.group();
    this.explosions.classType = Explosion;
    this.explosions.createMultiple(5);
  }

  moveUp(elapsed) {
    this.play('up');
    this.body.velocity.y = -this.maxSpeed;
  }

  moveDown(elapsed) {
    this.play('down');
    this.body.velocity.y = this.maxSpeed;
  }

  moveRight(elapsed) {
    this.play('right');
    this.body.velocity.x = this.maxSpeed;
  }

  moveLeft(elapsed) {
    this.play('left');
    this.body.velocity.x = -this.maxSpeed;
  }

  stopMovement() {
    this.play('normal');
    this.body.velocity = {
      x: 0,
      y: 0
    };
  }

  /**
   * Custom death animation (explosion)
   */
  deathAnimation() {
    var explosion = this.explosions.getFirstDead();
    explosion.reset(); // spawn explosion in the middle of the enemy sprite
    explosion.centerAt(this);
    explosion.explode();
  }

  /**
   * If enough time has ellapsed since the last shot was fired, create a
   * new bullet and fire again
   */
  fire() {
    if (this.game.time.now > this.nextBullet && this.bullets.countDead() > 0) {
      this.nextBullet = this.game.time.now + this.shootDelay;
      var bullet = this.bullets.getFirstDead();
      bullet.reset(this.x + 32, this.y + 14); // spawn coords of bullet relative to player
      bullet.body.velocity.x = this.bulletSpeed;
    }
  }
}
