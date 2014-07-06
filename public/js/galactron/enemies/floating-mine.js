/**
 * Floating mine which shoots off arrows / missiles when the player gets within range
 */
class FloatingMine extends Enemy {
	constructor(game, x, y, sprite) {
		sprite = sprite || 'floating_mine';
		super(game, x, y, sprite);
		this.init();

    // Add spike subsprites
    this.spikeLeft = new FloatingMineSpike(game, 0, 0);
    //this.spikeLeft.body.velocity.x = -50;
    this.addChild(this.spikeLeft);

    this.spikeTop = new FloatingMineSpike(game, 0, 0);
    this.addChild(this.spikeTop);
    //this.spikeLeft.body.velocity.y = -50;

    this.spikeRight = new FloatingMineSpike(game, 0, 0);
    this.addChild(this.spikeRight);

    this.spikeBottom = new FloatingMineSpike(game, 0, 0);
    this.addChild(this.spikeBottom);
	}

	init() {
		super.init();
		this.body.velocity.x = -50;
		this.score = 50;
		this.health = 50;
	}

	/**
	 * Overrides parent
	 */
	damage(amount){
		super.damage(amount);

		this.spikeLeft.actions.start();
		this.spikeTop.actions.start();
		this.spikeRight.actions.start();
		this.spikeBottom.actions.start();
	}
}