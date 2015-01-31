/**
 * Floating mine which shoots off arrows / missiles when the player gets within range
 *
 * @TODO: Refactor this class to extend a "ContainerEnemy" which has the "onChildKilled" method
 */
import {Enemy} from './enemy';

export class FloatingMine extends Enemy {
	constructor(game, x, y) {
		super(game, x, y);
		
		this.init();
		this.body.setSize(0, 0); // effectively excludes the body from collision detection

		// Add core sprite
		this.core = new FloatingMineCore(this.game, 0, 0);
    this.addChild(this.core);

    // Add spike subsprites
		var spikeSpeed = 150;

    this.spikeLeft = new FloatingMineSpike(this.game, 0, 8);
    this.spikeLeft.play('left');
    this.spikeLeft.velocityX = -spikeSpeed;
    this.addChild(this.spikeLeft);
    
    this.spikeTop = new FloatingMineSpike(this.game, 8, 0);
    this.spikeTop.play('top');
    this.spikeTop.velocityY = -spikeSpeed;
    this.addChild(this.spikeTop);

    this.spikeRight = new FloatingMineSpike(this.game, 16, 8);
    this.spikeRight.play('right');
    this.spikeRight.velocityX = spikeSpeed;
    this.addChild(this.spikeRight);

    this.spikeBottom = new FloatingMineSpike(this.game, 8, 16);
    this.spikeBottom.play('down');
    this.spikeBottom.velocityY = spikeSpeed;
    this.addChild(this.spikeBottom);
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
		this.spikeTop.actions.start();
		this.spikeRight.actions.start();
		this.spikeBottom.actions.start();
	}

  /** 
   * Supress death animation, since this is just a holder sprite without graphic
   */
	deathAnimation(){
		return;
	}
}