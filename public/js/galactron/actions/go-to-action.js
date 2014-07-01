/**
 * When executed, this action will start another one in the action chain, as referred to by name.
 * This can be used to implement branching and loops in the logic flow of an action chain.
 *
 * This action requires a target to be set, and therefore would not work outside of an ActionChain
 *
 * @author Garcia Hurtado
 */
class GoToAction extends Action {
	// actionNam
	// repeat; // False for infinite repeats, int for running the specified number of loops
	// loopCounter;

	constructor(actionName, repeat = 0) {
		super();
		this.repeat = repeat;
		this.repeatCounter = 0;
		this.actionName = actionName;
	}

	start() {
		if (this.repeat) {
			if (this.repeatCounter++ < this.repeat) {
				this.target.actions.switchTo(this.actionName);
			} else {
				// we've repeated the loop the requested number of times, so give way to the next action
				this.finish(); 
			}
		} else {
			this.target.actions.switchTo(this.actionName);
		}
	}
}