/**
 * Floating mine which shoots off arrows / missiles when the player gets within range
 *
 * @TODO: Refactor this class to extend a "ContainerEnemy" which has the "onChildKilled" method
 */
class FloatingMine extends Enemy {
	constructor(game, x, y) {
		super(game, x, y);
		
		this.init();
		this.body.setSize(0, 0); // effectively prevents the body from colliding

		// Add core sprite
		this.core = new FloatingMineCore(this.game, 0, 0);
    this.addChild(this.core);

    // Add spike subsprites
		var spikeSpeed = 150;
		var spikeDuration = 600;

    this.spikeLeft = new FloatingMineSpike(this.game, 0, 8);
    this.spikeLeft.play('left');
    this.spikeLeft.velocityX = -spikeSpeed;
    this.addChild(this.spikeLeft);

    this.spikeLeft.tween = game.add.tween(this.spikeLeft.body.velocity);
    this.spikeLeft.tween.to({x: 0, y: 0}, spikeDuration);
    this.spikeLeft.tween.onComplete.add(this.spikeLeft.kill, this.spikeLeft);
    
    this.spikeTop = new FloatingMineSpike(this.game, 8, 0);
    this.spikeTop.play('top');
    this.spikeTop.velocityY = -spikeSpeed;
    this.addChild(this.spikeTop);

    this.spikeTop.tween = game.add.tween(this.spikeTop.body.velocity);
    this.spikeTop.tween.to({x: 0, y: 0}, spikeDuration);
    this.spikeTop.tween.onComplete.add(this.spikeTop.kill, this.spikeTop);

    this.spikeRight = new FloatingMineSpike(this.game, 16, 8);
    this.spikeRight.play('right');
    this.spikeRight.velocityX = spikeSpeed;
    this.addChild(this.spikeRight);

    this.spikeRight.tween = game.add.tween(this.spikeRight.body.velocity);
    this.spikeRight.tween.to({x: 0, y: 0}, spikeDuration);
    this.spikeRight.tween.onComplete.add(this.spikeRight.kill, this.spikeRight);

    this.spikeBottom = new FloatingMineSpike(this.game, 8, 16);
    this.spikeBottom.play('down');
    this.spikeBottom.velocityY = spikeSpeed;
    this.addChild(this.spikeBottom);

    this.spikeBottom.tween = game.add.tween(this.spikeBottom.body.velocity);
    this.spikeBottom.tween.to({x: 0, y: 0}, spikeDuration);
    this.spikeBottom.tween.onComplete.add(this.spikeBottom.kill, this.spikeBottom);

	}

	init() {
		this.body.velocity.x = -50;
		this.score = 50;
		this.health = 1;
	}

	explode(){		
		this.launchSpikes();
	}

	/**
	 * Check whether all children of this sprite are dead. If so, kill the parent sprite (this) as well.
	 */
	onChildKilled(){
		for (var i = 0; i < this.children.length; i++) {
			if(this.children[i].alive){
				return;
			}
		}

		// No children found alive, kill the parent sprite
		this.kill();
	}

	/**
	 * Upon death of the core, launch spike subsprites. Once the subsprites kill themselves, 
	 * they will call onChildKilled(), which will kill the parent
	 */
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

  /** 
   * Supress death animation, since this is just a holder sprite without graphic
   */
	deathAnimation(){
		return;
	}
}