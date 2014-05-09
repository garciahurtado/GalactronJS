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
	constructor(target){
		super(target);

		this.actions = new Array();
		this.actionRegistry = new Array();
		this.running = false;
	}

	init(){
		super.init();
	}

	/**
	 * Adds an action and triggers it when the previous one finishes. If the optional 
	 * name is provided, it also adds it to the named action registry
	 * @param	action
	 * @param	name
	 */
	chainAction(newAction, name){
		name = name || null;
		
		// Unless this is the first action in the chain, link this new action to the onFinish event
		// of the previous one, so that it starts as soon as the previous one ends
		if(this.actions.length > 0){
			var previousAction = this.actions[this.actions.length - 1];
			
			if (previousAction) {
				var nextAction = newAction;
				previousAction.onFinish(function() {
					nextAction.start();
				});
			}
		}
		
		this.addAction(newAction, name);
		
		return this;
	}

	/**
	 * Adds an action to the list, without chaining it.
	 * @param	newAction
	 * @param	name
	 * @return
	 */
	addAction(newAction, name){
		// Only add the target from the ActionChain if no target was previously set
		if (!newAction.target && target) {
			newAction.target = target;
		}
		
		this.actions.push(newAction);
		if(name){
			this.actionRegistry[name] = newAction;
		}
		return this;
	}

	/**
	 * If the action chain is currently stopped, it starts the first action in the chain. Otherwise, it has no effect
	 */
	start(){
		this.reset();
		if(this.actions[0]){
			this.actions[0].start();
			this.running = true;	
		}
	}

	/**
	 * As long as the Action Chain is running, update all the actions in the chain which are currently running
	 */
	update(){
		if (!this.running) {
			return;
		} else {
			for (var action in this.actions) {
				if(action.running){
					action.update();
				}
			}
		}
	}

	/**
	 * Stops all actions in the chain
	 */
	stopAll(){
		for (var action in this.actions) {
			action.stop();
		}
		this.running = false;
	}

	/**
	 * Stops all currently running actions on this chain and starts the action specified
	 * @param	actionName
	 */
	switchTo(actionName){
		stopAll();
		this.actionRegistry[actionName].start();
		this.running = true;
	}

	/**
	 * Stops all running actions and resets them to their original state
	 */
	reset(){
		this.running = false;
		for (var index in this.actions) {
			var action = this.actions[index];
			action.init();
		}
	}

	/**
	 * Returns the action from the registry that matches the name provided
	 * 
	 * @param	actionName
	 * @return
	 */
	getAction(actionName){
		if (this.actionRegistry[actionName] != null) {
			return this.actionRegistry[actionName];
		} else {
			throw new Error("There is no action named " + actionName);
		}
	}
}

