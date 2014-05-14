/**
 * Green alien enemy with the wiggly tentacles (inherits from Phaser Sprite)
 */
class Alien extends Enemy {
	constructor(game, x, y) {
		super(game, x, y, 'alien');

		this.x = x;
		this.y = y;

		this.animations.add('wiggle', [0, 1, 2, 3, 2], 6, true);
		this.init();
	}

	init() {
		super.init();

		this.score = 100;
		this.health = 5;
		this.body.velocity.x = -50;

		// randomFrame(); // add a little interest to the aliens
		this.animations.play('wiggle');
	}
}