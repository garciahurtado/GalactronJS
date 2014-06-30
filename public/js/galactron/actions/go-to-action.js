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
	// loop; // False for infinite loops, int for running the specified number of loops
	// loopCounter;

	constructor(actionName, loop = 0) {
		super();
		this.loop = loop;
		this.loopCounter = loop;
		this.actionName = actionName;
	}

	start() {
		if (this.loop) {
			if (--this.loopCounter > 0) {
				this.target.actions.switchTo(this.actionName);
			} else {
				this.finish();
			}
		} else {
			this.target.actions.switchTo(this.actionName);
		}

	}
}