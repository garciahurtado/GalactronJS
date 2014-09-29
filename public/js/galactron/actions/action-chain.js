/**
 * An ActionChain is a manager of actions which can store a list of actions, run them in sequence,
 * and retrieve them by name. The action chain can be started, stopped and restarted.
 *
 * The ActionChain can also be added to another chain as you would add an action, to provide action
 * tree branching.
 *
 * ActionChains can be initialized with a target object, which will be passed to all of the chain's
 * actions as the default target for actions to modify.
 *
 * @author Garcia Hurtado
 */

class ActionChain extends Action {
	constructor(game, target = null) {
		super(target);

		this.game = game;
		this.actions = new Array(); 
		//this.runningActions = game.add.group();
		this.actionRegistry = new Array();
		this.running = false;
	}

	/**
	 * Start the chain from the very beginning
	 */
	start() {
		this.running = true;
		if (this.actions[0]) {
			this.actions[0].start();
		}
	}

	/**
	 * Adds an action to the list, without chaining it to the previous one.
	 * This action will automatically be started with the action chain, provided
	 * that it is the first action to be added, or it will need to be started
	 * manually (if a name for the action is provided).
	 *
	 * @param	newAction
	 * @param	name
	 * @return
	 */
	add(newAction, name) {
		// Only assume the target from the ActionChain if no target was explicitly set in the Action
		if (!newAction.target && this.target) {
			newAction.target = this.target;
		}
		newAction.game = this.game;
		newAction.chain = this;

		this.actions.push(newAction);

		if (name) {
			this.actionRegistry[name] = newAction;
		}

		return this; // fluent interface
	}

	/**
	 * Adds an action to be started when the previous one finishes. If the optional
	 * name is provided, it also adds it to the named action registry.
	 * @param	action
	 * @param	name
	 */
	then(newAction, name = null) {
		// Check for callback type action and wrap it automatically
		if(typeof(newAction) == 'function'){
			newAction = new MethodAction(newAction);
		}

		// Unless this is the first action in the chain, link this new action to the onFinish event
		// of the previous one, so that it starts as soon as the previous one ends
		if (this.actions.length > 0) {
			var previousAction = this.actions[this.actions.length - 1];

			if (previousAction) {
				var nextAction = newAction;
				previousAction.onFinish(function() {
					nextAction.start();
				});
			}
		}

		this.add(newAction, name);

		return this; // fluent interface
	}

	/**
	 * Add a pause before starting the next action. This is a convenience method to make it 
	 * easier to add a WaitAction to the queue
	 *
	 * @param delay Number of seconds to wait before starting the next action.
	 */
	wait(seconds){
		this.then(new WaitAction(seconds));
		return this; // fluent interface
	}

	/**
	 * Adds a pseudo action at this point in the chain which will cause the chain to restart 
	 * from the beginning 
	 * this action.
	 */
	loop(times = 0){
		this.then(new LoopAction(times));
		return this;
	}

	/**
	 * Convenience method to add a GoToAction at this point in the chain. 
	 * @param label Required
	 * @param times Optional. Maximum number of times to execute this goTo Action. Leave
	 * as the default zero for infinite.
	 */
	goTo(label, times = 0){
		this.then(new GoToAction(label, times));
		return this;
	}

	/**
	 * As long as the Action Chain is running, we'll run update() all the actions in the chain 
	 * which are currently running (there could be multiple running at once).
	 */
	update() {
		if (this.running) {
			for (var i = 0; i < this.actions.length; i++) {
				if (this.actions[i].running) {
					this.actions[i].update();
				}
			};
		}
	}

	/**
	 * Stops all actions in the chain
	 */
	stopAll() {
		for (var i = 0; i < this.actions.length; i++) {
			this.actions[i].stop();
		};
		this.running = false;
	}

	/**
	 * Stops all currently running actions on this chain and starts the action specified
	 * @param	actionName
	 */
	switchTo(actionName) {
		this.stopAll();
		this.actionRegistry[actionName].start();
		this.running = true;
	}

	/**
	 * Stops all running actions and resets them to their original state
	 */
	reset() {
		this.running = false;
		this.actions.forEach(function(action){
			action.init();
		}, this);
	}

	/**
	 * Resets the state of all actions and starts the chain all over from the start
	 */
	restart(){
		this.reset();
		this.start();
	}

	/**
	 * Returns the action from the registry that matches the name provided
	 *
	 * @param	actionName
	 * @return
	 */
	getAction(actionName) {
		if (this.actionRegistry[actionName] != null) {
			return this.actionRegistry[actionName];
		} else {
			throw new Error("There is no action named " + actionName);
		}
	}
}
