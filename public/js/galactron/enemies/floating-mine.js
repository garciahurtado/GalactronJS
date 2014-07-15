/**
 * Floating mine which shoots off arrows / missiles when the player gets within range
 */
class FloatingMine extends Enemy {
	constructor(game, x, y, sprite) {
		sprite = sprite || 'floating_mine';
		super(game, x, y, sprite);
		this.init();

    // Add spike subsprites
		var spikeSpeed = 100;

    this.spikeLeft = new FloatingMineSpike(game, 0, 8);
    this.spikeLeft.play('left');
    this.spikeLeft.velocityX = -spikeSpeed;
    this.addChild(this.spikeLeft);

    this.spikeTop = new FloatingMineSpike(game, 8, 0);
    this.spikeTop.play('top');
    this.spikeTop.velocityY = -spikeSpeed;
    this.addChild(this.spikeTop);

    this.spikeRight = new FloatingMineSpike(game, 16, 8);
    this.spikeRight.play('right');
    this.spikeRight.velocityX = spikeSpeed;
    this.addChild(this.spikeRight);

    this.spikeBottom = new FloatingMineSpike(game, 8, 16);
    this.spikeBottom.play('down');
    this.spikeBottom.velocityY = spikeSpeed;
    this.addChild(this.spikeBottom);
	}

	init() {
		super.init();
		this.body.velocity.x = -50;
		this.score = 50;
		this.health = 10;
	}

	/**
	 * Overrides parent
	 */
	damage(amount){
		super.damage(amount);
	}

	/**
	 * Override parent to launch spike subsprites at time of death
	 */
	kill(){
		this.launchSpikes();
		super();
	}

	launchSpikes(){
		this.spikeLeft.actions.start();
		this.spikeTop.actions.start();
		this.spikeRight.actions.start();
		this.spikeBottom.actions.start();
	}
}