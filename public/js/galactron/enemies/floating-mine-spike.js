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

		this.duration = 600;

    // Add the animation tween to slow down the spike after launch
    this.tween = game.add.tween(this.body.velocity);
    this.tween.to({x: 0, y: 0}, this.duration);
    this.tween.onComplete.add(this.kill, this);

    // When the spike dies, it must notify its parent sprite, to allow it to kill itself
		this.events.onKilled.add(function() {
			this.parent.onChildKilled();
		}.bind(this));

		this.init();

		this.debugBounds = true; // render the sprite's bounds
		this.debugColor = '#00FF00'; // default color of the debug outline of the sprite (green)
	}

	init() {
		super();
		this.health = 10000;

		this.actions
			.chainAction(new MethodAction(function() {
				this.body.velocity.x = this.velocityX;
				this.body.velocity.y = this.velocityY;
			}))
			;
	}

	/**
	 * Spikes don't explode
	 */
	deathAnimation(){
		return;
	}
}