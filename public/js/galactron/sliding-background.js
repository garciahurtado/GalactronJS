/**
 * A sliding background is a regular sprite which has physics automatically 
 * enabled and moves at a constant horizontal velocity.
 */
class SlidingBackground extends GalactronSprite {
	constructor(game, x = 0, y = 0, graphic, speed) {
		super(game, x, y, graphic);
		this.game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.velocity.x = speed;
	}
}