/**
 * Floating mine which shoots off arrows / missiles when the player gets within range
 */
class FloatingMine extends Enemy {
	constructor(game, x, y) {
		super(game, x, y, null);
		this.init();
		
		// Add core sprite
		this.core = new Enemy(this.game, 0, 0, 'floating_mine');
    this.addChild(this.core);

    // Add spike subsprites
		var spikeSpeed = 150;
		var spikeDuration = 600;

    this.spikeLeft = new FloatingMineSpike(this.game, 0, 8);
    this.spikeLeft.play('left');
    this.spikeLeft.velocityX = -spikeSpeed;
    this.addChild(this.spikeLeft);

    this.spikeLeft.tween = game.add.tween(this.spikeLeft.body.velocity);
    this.spikeLeft.tween.to({x: 0}, spikeDuration);
    
    this.spikeTop = new FloatingMineSpike(this.game, 8, 0);
    this.spikeTop.play('top');
    this.spikeTop.velocityY = -spikeSpeed;
    this.addChild(this.spikeTop);

    this.spikeTop.tween = game.add.tween(this.spikeTop.body.velocity);
    this.spikeTop.tween.to({y: 0}, spikeDuration);

    this.spikeRight = new FloatingMineSpike(this.game, 16, 8);
    this.spikeRight.play('right');
    this.spikeRight.velocityX = spikeSpeed;
    this.addChild(this.spikeRight);

    this.spikeRight.tween = game.add.tween(this.spikeRight.body.velocity);
    this.spikeRight.tween.to({x: 0}, spikeDuration);

    this.spikeBottom = new FloatingMineSpike(this.game, 8, 16);
    this.spikeBottom.play('down');
    this.spikeBottom.velocityY = spikeSpeed;
    this.addChild(this.spikeBottom);

    this.spikeBottom.tween = game.add.tween(this.spikeBottom.body.velocity);
    this.spikeBottom.tween.to({y: 0}, spikeDuration);
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
	 * Override parent to launch spike subsprites at time of death, and only
	 * kill the core sprite (rather than the parent sprite, which would destroy
	 * the subsprites too)
	 */
	kill(){
		this.launchSpikes();
		this.core.kill();
	}

	launchSpikes(){
		this.spikeLeft.actions.start();
		this.spikeLeft.tween.start();

		this.spikeTop.actions.start();
		this.spikeTop.tween.start();

		this.spikeRight.actions.start();
		this.spikeRight.tween.start();

		this.spikeBottom.actions.start();
		this.spikeBottom.tween.start();
	}
}