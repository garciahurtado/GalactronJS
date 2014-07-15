/**
 * Spike of the proximity mine which explodes upon contact
 */
class FloatingMineSpike extends Enemy {
	constructor(game, x, y, sprite) {
		sprite = sprite || 'floating_mine_spike';
		super(game, x, y, sprite);

    this.animations.add('left', 	[0], 1, false);
    this.animations.add('up', 		[1], 1, false);
    this.animations.add('right', 	[2], 1, false);
    this.animations.add('down', 	[3], 1, false);
    this.play('up');

    // Track the velocity that this spike will follow at launch (change after instantiation)
    this.velocityX = 0;
    this.velocityY = 0;

		this.init();
	}

	init() {
		super();
		this.health = 1000;
		this.moves = false;
		this.body.speed = 0;

		this.actions
			.chainAction(new MethodAction(function() {
				this.body.velocity.x = this.velocityX;
				this.body.velocity.y = this.velocityY;
			}))
			;
			
	}
}