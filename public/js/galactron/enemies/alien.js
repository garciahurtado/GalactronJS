/**
 * Green alien enemy with the wiggly tentacles (inherits from Phaser Sprite)
 */
class Alien extends Enemy {
	constructor(game, x, y){
		super(game, x, y, 'alien');

		this.x = x;
		this.y = y;
		this.score = 100;
		this.health = 5;

		game.physics.enable(this, Phaser.Physics.ARCADE);

		var anim = this.animations.add('wiggle', [0, 1, 2, 3, 2], 6, true);
	  // randomFrame(); // add a little interest to the aliens
	  anim.play('wiggle');
	}
}
