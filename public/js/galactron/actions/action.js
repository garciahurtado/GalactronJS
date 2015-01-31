/**
 * Base behavior class to be extended in custom behaviors that modify sprite motions and
 * execute time-based actions with each update cycle of the sprite.
 *
 * An action is stopped when first created, until explicitly started with start().
 *
 * An action can have a "Target", which is simply an object upon which the action effects
 * its influence (such as modifying the coordinates of a sprite to cause movement). Not
 * all actions will have an explicit target.
 *
 * @author Garcia
 */
export class Action extends Phaser.Sprite {
	constructor(target = null) {
		super();
		this.target = target;
		this.chain;
		this.visible = false;
		this.running = false;
		this.finished;
		this.finishHandler;

		this.init(); 
	}

	init() {
		// Extend in your own classes
	}

	/**
	 * Called to update the actions of the controlled sprite once per game tick.
	 * Must be overriden to provide custom behaviors.
	 */
	update() {
		if(this.running){
			// Actual update logic
		} else {
			return false;
		}
	}

	/**
	 * Revive the object so that it will continue to update
	 */
	start() {
		this.finished = false;
		this.running = true;
	}

	/**
	 * Stop running the action.
	 * @return
	 */
	stop() {
		this.running = false;
	}

	/**
	 * Called when the action is done executing. It calls the finish handler, if one is set.
	 * It also resets the action to its default state via init();
	 */
	finish() {
		this.finished = true;
		this.running = false;
		
		if (this.finishHandler != null) {
			this.finishHandler();
		}
		this.init();
	}

	/**
	 * Register a function to be executed when the action is finished
	 */
	onFinish(handler) {
		this.finishHandler = handler;
	}
}