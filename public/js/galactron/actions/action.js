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
class Action {
	constructor(target = null){
		this.target = target;
		this.running;
		this.finished;
		this.finishHandler;

		//this.init(this); // WHY doesnt this work???
	}

	init(){
		this.running = false;
		this.finished = false;
	}

	/**
	 * Called to update the actions of the controlled sprite once per game tick. 
	 * Override to provide custom behaviors.
	 */
	update() {

	}

	/**
	 * Revive the FlxBasic object so that it will continue to update
	 */
	start()
	{
		this.running = true;
		this.finished = false;
	}

	/**
	 * Stop running the action.
	 * @return
	 */
	stop()
	{
		this.running = false;
		this.finished = true;
	}

	/**
	 * Stops executing the action and calls the finish handler, if one is set.
	 */
	finish()
	{
		this.stop();
		
		if (this.finishHandler != null) {
			this.finishHandler();
		}
		
		this.init();
	}

	/**
	 * Register a function to be executed when the action is finished
	 */
	onFinish(handler)
	{
		this.finishHandler = handler;
	}
}
