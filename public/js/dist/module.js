(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

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
var Action = require("./action").Action;
var WaitAction = require("./wait-action").WaitAction;
var MethodAction = require("./method-action").MethodAction;
var ActionChain = exports.ActionChain = (function (Action) {
	function ActionChain(game) {
		var target = arguments[1] === undefined ? null : arguments[1];
		_get(Object.getPrototypeOf(ActionChain.prototype), "constructor", this).call(this, target);

		this.game = game;
		this.actions = new Array();
		//this.runningActions = game.add.group();
		this.actionRegistry = new Array();
		this.running = false;
	}

	_inherits(ActionChain, Action);

	_prototypeProperties(ActionChain, null, {
		start: {

			/**
    * Start the chain from the very beginning
    */
			value: function start() {
				_get(Object.getPrototypeOf(ActionChain.prototype), "start", this).call(this);
				if (this.actions[0]) {
					this.actions[0].start();
				}
			},
			writable: true,
			configurable: true
		},
		add: {

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
			value: function add(newAction, name) {
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
			},
			writable: true,
			configurable: true
		},
		then: {

			/**
    * Adds an action to be started when the previous one finishes. If the optional
    * name is provided, it also adds it to the named action registry.
    * @param	action
    * @param	name
    */
			value: function then(newAction) {
				var name = arguments[1] === undefined ? null : arguments[1];
				// Check for callback type action and wrap it automatically
				if (typeof newAction == "function") {
					newAction = new MethodAction(newAction);
				}

				// Unless this is the first action in the chain, link this new action to the onFinish event
				// of the previous one, so that it starts as soon as the previous one ends
				if (this.actions.length > 0) {
					var previousAction = this.actions[this.actions.length - 1];

					if (previousAction) {
						var nextAction = newAction;
						previousAction.onFinish(function () {
							nextAction.start();
						});
					}
				}

				this.add(newAction, name);

				return this; // fluent interface
			},
			writable: true,
			configurable: true
		},
		wait: {

			/**
    * Add a pause before starting the next action. This is a convenience method to make it 
    * easier to add a WaitAction to the queue
    *
    * @param delay Number of seconds to wait before starting the next action.
    */
			value: function wait(seconds) {
				this.then(new WaitAction(seconds));
				return this; // fluent interface
			},
			writable: true,
			configurable: true
		},
		loop: {

			/**
    * Adds a pseudo action at this point in the chain which will cause the chain to restart 
    * from the beginning 
    * this action.
    */
			value: function loop() {
				var times = arguments[0] === undefined ? 0 : arguments[0];
				this.then(new LoopAction(times));
				return this;
			},
			writable: true,
			configurable: true
		},
		goTo: {

			/**
    * Convenience method to add a GoToAction at this point in the chain. 
    * @param label Required
    * @param times Optional. Maximum number of times to execute this goTo Action. Leave
    * as the default zero for infinite.
    */
			value: function goTo(label) {
				var times = arguments[1] === undefined ? 0 : arguments[1];
				this.then(new GoToAction(label, times));
				return this;
			},
			writable: true,
			configurable: true
		},
		update: {

			/**
    * As long as the Action Chain is running, we'll run update() on all the actions in the chain 
    * which are also running (there could be multiple running at once).
    */
			value: function update() {
				if (this.running) {
					for (var i = 0; i < this.actions.length; i++) {
						if (this.actions[i].running) {
							this.actions[i].update();
						}
					};
				}
			},
			writable: true,
			configurable: true
		},
		stopAll: {

			/**
    * Stops all actions in the chain
    */
			value: function stopAll() {
				for (var i = 0; i < this.actions.length; i++) {
					this.actions[i].stop();
				};
				this.running = false;
			},
			writable: true,
			configurable: true
		},
		switchTo: {

			/**
    * Stops all currently running actions on this chain and starts the action specified
    * @param	actionName
    */
			value: function switchTo(actionName) {
				this.stopAll();
				this.actionRegistry[actionName].start();
				this.running = true;
			},
			writable: true,
			configurable: true
		},
		reset: {

			/**
    * Stops all running actions and resets them to their original state
    */
			value: function reset() {
				this.running = false;
				this.actions.forEach(function (action) {
					action.init();
				}, this);
			},
			writable: true,
			configurable: true
		},
		restart: {

			/**
    * Resets the state of all actions and starts the chain all over from the start
    */
			value: function restart() {
				this.reset();
				this.start();
			},
			writable: true,
			configurable: true
		},
		getAction: {

			/**
    * Returns the action from the registry that matches the name provided
    *
    * @param	actionName
    * @return
    */
			value: function getAction(actionName) {
				if (this.actionRegistry[actionName] != null) {
					return this.actionRegistry[actionName];
				} else {
					throw new Error("There is no action named " + actionName);
				}
			},
			writable: true,
			configurable: true
		}
	});

	return ActionChain;
})(Action);
exports.__esModule = true;

},{"./action":2,"./method-action":6,"./wait-action":10}],2:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

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
var Action = exports.Action = (function (_Phaser$Sprite) {
	function Action() {
		var target = arguments[0] === undefined ? null : arguments[0];
		_get(Object.getPrototypeOf(Action.prototype), "constructor", this).call(this);
		this.target = target;
		this.chain;
		this.visible = false;
		this.running = false;
		this.finished;
		this.finishHandler;

		this.init();
	}

	_inherits(Action, _Phaser$Sprite);

	_prototypeProperties(Action, null, {
		init: {
			value: function init() {},
			writable: true,
			configurable: true
		},
		update: {

			/**
    * Called to update the actions of the controlled sprite once per game tick.
    * Must be overriden to provide custom behaviors.
    */
			value: function update() {
				if (this.running) {} else {
					return false;
				}
			},
			writable: true,
			configurable: true
		},
		start: {

			/**
    * Revive the object so that it will continue to update
    */
			value: function start() {
				this.finished = false;
				this.running = true;
			},
			writable: true,
			configurable: true
		},
		stop: {

			/**
    * Stop running the action.
    * @return
    */
			value: function stop() {
				this.running = false;
			},
			writable: true,
			configurable: true
		},
		finish: {

			/**
    * Called when the action is done executing. It calls the finish handler, if one is set.
    * It also resets the action to its default state via init();
    */
			value: function finish() {
				this.finished = true;
				this.running = false;

				if (this.finishHandler != null) {
					this.finishHandler();
				}
				this.init();
			},
			writable: true,
			configurable: true
		},
		onFinish: {

			/**
    * Register a function to be executed when the action is finished
    */
			value: function onFinish(handler) {
				this.finishHandler = handler;
			},
			writable: true,
			configurable: true
		}
	});

	return Action;
})(Phaser.Sprite);
exports.__esModule = true;
// Extend in your own classes
// Actual update logic

},{}],3:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * This action simply plays the specified animation and then finishes
 *
 * @author Garcia Hurtado
 */
var Action = require("./action").Action;
var AnimationAction = exports.AnimationAction = (function (Action) {
	function AnimationAction(animationName) {
		var wait = arguments[1] === undefined ? true : arguments[1];
		_get(Object.getPrototypeOf(AnimationAction.prototype), "constructor", this).call(this);
		this.animationName = animationName;
		this.wait = wait;
	}

	_inherits(AnimationAction, Action);

	_prototypeProperties(AnimationAction, null, {
		start: {

			/**
    * When the animation starts, we check whether we should wait until it completes all
    * frames before starting the next action. If the action shouldn't wait, we finish() the
    * action right away, so the next one can start. If it should wait, we add a callback to
    * check to the animationComplete event.
    */
			value: function start() {
				_get(Object.getPrototypeOf(AnimationAction.prototype), "start", this).call(this);

				this.anim = this.target.animations.getAnimation(this.animationName);

				if (!this.anim) {
					console.log("Unable to find animation named " + this.animationName + " in target");
					return;
				}

				this.target.animations.play(this.animationName);

				if (this.wait) {
					this.anim.onComplete.add(function () {
						this.finish();
					}, this);
				} else {
					this.finish();
				}
			},
			writable: true,
			configurable: true
		}
	});

	return AnimationAction;
})(Action);
exports.__esModule = true;

},{"./action":2}],4:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
* Moves a sprite in a circular motion
* @TODO: Fix the constructor parameters so that a radius can be specified
* @author Garcia
*/
var Action = require("./action").Action;
var CircleMotionAction = exports.CircleMotionAction = (function (Action) {
	// angle;
	//speed;
	//repeat;
	//direction;

	//baseVelocity;

	/**
  * @param	speed Angular velocity (or how quick the sprite rotates). Higher speed means a tighter circle
  * @param	circles Number of circles after which the action will stop. 0 = continue indefinitely
  * @param	direction Either CLOCKWISE or COUNTERCLOCKWISE
  */
	function CircleMotionAction(speed) {
		var circles = arguments[1] === undefined ? 0 : arguments[1];
		var direction = arguments[2] === undefined ? 1 : arguments[2];
		_get(Object.getPrototypeOf(CircleMotionAction.prototype), "constructor", this).call(this);

		this.speed = speed;
		this.circles = circles;
		this.direction = direction;
		this.TWO_PI = 2 * Math.PI;

		this.init();
	}

	_inherits(CircleMotionAction, Action);

	_prototypeProperties(CircleMotionAction, null, {
		init: {
			value: function init() {
				this.angle = 0;
				this.baseVelocity = { x: 0, y: 0 };
			},
			writable: true,
			configurable: true
		},
		start: {

			/**
    * Stores the original velocity of the target sprite before starting to change it
    */
			value: function start() {
				_get(Object.getPrototypeOf(CircleMotionAction.prototype), "start", this).call(this);

				if (this.target) {
					this.baseVelocity = {
						x: this.target.body.velocity.x,
						y: this.target.body.velocity.y
					};
				}
			},
			writable: true,
			configurable: true
		},
		update: {

			/**
    * Rotate the sprite
    */
			value: function update() {
				var elapsed = this.game.time.elapsed / 1000;

				if (this.direction == CircleMotionAction.CLOCKWISE) {
					this.angle -= elapsed * this.speed;
				} else {
					this.angle += elapsed * this.speed;
				}

				var base = this.baseVelocity;
				var angle = this.angle;

				this.target.body.velocity.x = base.x * Math.cos(angle) - base.y * Math.sin(angle);
				this.target.body.velocity.y = base.y * Math.cos(angle) - base.x * Math.sin(angle);

				// stop the action if we've reached the maximum number of cycles
				if (this.circles) {
					if (Math.abs(angle) / this.TWO_PI > this.circles) {
						this.angle = this.circles * this.TWO_PI; // just before finish, correct angle back to max value
						this.finish();
					}
				}
			},
			writable: true,
			configurable: true
		}
	});

	return CircleMotionAction;
})(Action);


CircleMotionAction.CLOCKWISE = 1;
CircleMotionAction.COUNTERCLOCKWISE = 2;
exports.__esModule = true;

},{"./action":2}],5:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * When executed, this action will start another one in the action chain, as referred to by name.
 * This can be used to implement branching and loops in the logic flow of an action chain.
 *
 * This action requires a target to be set, and therefore would not work outside of an ActionChain
 *
 * @author Garcia Hurtado
 */
var Action = require("./action").Action;
var GoToAction = exports.GoToAction = (function (Action) {
	// actionNam
	// repeat; // False for infinite repeats, int for running the specified number of loops
	// loopCounter;

	function GoToAction(actionName) {
		var repeat = arguments[1] === undefined ? 0 : arguments[1];
		_get(Object.getPrototypeOf(GoToAction.prototype), "constructor", this).call(this);
		this.repeat = repeat;
		this.repeatCounter = 0;
		this.actionName = actionName;
	}

	_inherits(GoToAction, Action);

	_prototypeProperties(GoToAction, null, {
		start: {
			value: function start() {
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
			},
			writable: true,
			configurable: true
		}
	});

	return GoToAction;
})(Action);
exports.__esModule = true;

},{"./action":2}],6:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * This action calls the specified method in the target sprite or an anonymous function.
 *
 * If used to execute an anonymous function, the target sprite is available via the 
 * "target" variable (see superclass "Action").
 *
 * Ex. 1 - Calling an existing method:
 *
 * 		var action = new MethodAction(sprite.shoot);
 *
 * Ex. 2 - Calling an anonymous function:
 *
 * 		var action = new MethodAction(function(){
 * 	   		target.velocity.x = 60;
 * 		});
 *
 * @author Garcia Hurtado
 */
var Action = require("./action").Action;
var MethodAction = exports.MethodAction = (function (Action) {
  // method;
  // params;

  function MethodAction(method) {
    var params = arguments[1] === undefined ? null : arguments[1];
    _get(Object.getPrototypeOf(MethodAction.prototype), "constructor", this).call(this);
    this.method = method;
    this.params = params;
  }

  _inherits(MethodAction, Action);

  _prototypeProperties(MethodAction, null, {
    start: {
      value: function start() {
        _get(Object.getPrototypeOf(MethodAction.prototype), "start", this).call(this);

        // Binding this actions' target object to the "this" ref used in the context of the
        // callback allows us to refer to "this" within the callback and access the object that
        // this action belongs to.
        this.method.apply(this.target, this.params);
        this.finish();
      },
      writable: true,
      configurable: true
    }
  });

  return MethodAction;
})(Action);
exports.__esModule = true;

},{"./action":2}],7:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * This action acts as a enemy wave spawn event
 *
 * @author Garcia Hurtado
 */
var Action = require("./action").Action;
var SpawnWaveAction = exports.SpawnWaveAction = (function (Action) {
	function SpawnWaveAction(enemyClass, spawnCoords) {
		var waveSize = arguments[2] === undefined ? 1 : arguments[2];
		var delay = arguments[3] === undefined ? 0 : arguments[3];
		_get(Object.getPrototypeOf(SpawnWaveAction.prototype), "constructor", this).call(this, null);
		this.enemyClass = enemyClass;
		this.spawnCoords = spawnCoords;
		this.waveSize = waveSize;
		this.delay = delay;
	}

	_inherits(SpawnWaveAction, Action);

	_prototypeProperties(SpawnWaveAction, null, {
		start: {

			/**
    * When this action starts, it will create a new enemy wave. We then need to add
    * it to the current game state
    */
			value: function start() {
				_get(Object.getPrototypeOf(SpawnWaveAction.prototype), "start", this).call(this);
				var state = this.game.state.getCurrentState();
				this.wave = state.spawnWave(this.enemyClass, this.spawnCoords, this.waveSize, this.delay);
			},
			writable: true,
			configurable: true
		},
		update: {

			/**
    * Checks to see whether the wave is finished spawing enemies, in order to trigger
    * its finish() callback
    */
			value: function update() {
				_get(Object.getPrototypeOf(SpawnWaveAction.prototype), "update", this).call(this);
				if (this.wave.spawnCounter >= this.waveSize) {
					this.finish();
				}
			},
			writable: true,
			configurable: true
		}
	});

	return SpawnWaveAction;
})(Action);
exports.__esModule = true;

},{"./action":2}],8:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * ...
 * @author Garcia Hurtado
 */
var Action = require("./action").Action;
var StopMotionAction = exports.StopMotionAction = (function (Action) {
	function StopMotionAction() {
		_get(Object.getPrototypeOf(StopMotionAction.prototype), "constructor", this).call(this);
	}

	_inherits(StopMotionAction, Action);

	_prototypeProperties(StopMotionAction, null, {
		start: {
			value: function start() {
				this.target.body.velocity.x = 0;
				this.target.body.velocity.y = 0;
				this.finish();
			},
			writable: true,
			configurable: true
		}
	});

	return StopMotionAction;
})(Action);
exports.__esModule = true;

},{"./action":2}],9:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * This action modifies one or several object properties over time using the specified
 * easing algorithm. It uses the buit in Phaser Tweener
 * 
 * @param subject - Object (or property, this can refer to a deep object like player.velocity)
 *  whose properties will be modified by the Tween.
 * @param properties - Hash of property names to modify and their end values
 * @param time - Duration of the tween, in ms
 * @param transision - Easing function to apply to the Tween (must be a Phaser.Easing)
 * 
 * @author Garcia Hurtado
 */
var Action = require("./action").Action;
var TweenAction = exports.TweenAction = (function (Action) {
  function TweenAction(subject, properties, time) {
    var transition = arguments[3] === undefined ? null : arguments[3];
    _get(Object.getPrototypeOf(TweenAction.prototype), "constructor", this).call(this);
    this.subject = subject;
    this.properties = properties;
    this.time = time;
    this.transition = transition;
  }

  _inherits(TweenAction, Action);

  _prototypeProperties(TweenAction, null, {
    start: {
      value: function start() {
        _get(Object.getPrototypeOf(TweenAction.prototype), "start", this).call(this);
        this.tween = this.target.game.add.tween(this.subject);
        this.tween.to(this.properties, this.time, this.transition);
        this.tween.onComplete.add(this.finish, this);
        this.tween.start();
      },
      writable: true,
      configurable: true
    }
  });

  return TweenAction;
})(Action);
exports.__esModule = true;

},{"./action":2}],10:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * This action simply waits for the seconds specified in the timeout parameter. If zero,
 * the action waits indefinitely.
 * 
 * @author Garcia Hurtado
 */
var Action = require("./action").Action;
var WaitAction = exports.WaitAction = (function (Action) {
	function WaitAction() {
		var timeout = arguments[0] === undefined ? 0 : arguments[0];
		_get(Object.getPrototypeOf(WaitAction.prototype), "constructor", this).call(this);
		this.timeout = timeout;
	}

	_inherits(WaitAction, Action);

	_prototypeProperties(WaitAction, null, {
		start: {
			value: function start() {
				_get(Object.getPrototypeOf(WaitAction.prototype), "start", this).call(this);
				this.timer = 0;
			},
			writable: true,
			configurable: true
		},
		update: {

			/**
    * Check whether enough time has passed to finish the wait
    */
			value: function update() {
				this.timer += this.game.time.elapsed / 1000;
				if (this.timer > this.timeout) {
					this.finish();
				}
			},
			writable: true,
			configurable: true
		}
	});

	return WaitAction;
})(Action);
exports.__esModule = true;

},{"./action":2}],11:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
* Moves a sprite in a sinusoidal wave pattern by affecting its velocity vector. 
* 
* - If the Sprite is static when the action is applied to it, it will begin to move in a circle
* - If the Sprite is moving in a straight line, the wave motion will be applied orthogonal to
* its velocity vector. IE: when a sprite is moving only along the X axis, the motion will only be 
* applied to the Y axis
* 
* @author Garcia
*/
var Action = require("./action").Action;
var WaveMotionAction = exports.WaveMotionAction = (function (Action) {
	// currentAngle; // keep track of the current angle for up and down motion (radians)
	// speed; // how fast to complete a wave cycle
	// amplitude; // the amplitude of the motion wave
	// repeat;

	// baseVelocity;
	// amplitudeX;
	// amplitudeY;


	/**
  * 
  * @param	target Target sprite whose motion will be altered
  * @param	amplitude Amplitude of the wave applied to the motion
  * @param	speed Speed at which the wave cycles
  * @param	repeat Maximum number of cycles after which the action will stop. 0 = infinite cycles
  */
	function WaveMotionAction(target, amplitude, speed) {
		var repeat = arguments[3] === undefined ? 0 : arguments[3];
		_get(Object.getPrototypeOf(WaveMotionAction.prototype), "constructor", this).call(this, target);

		this.amplitude = amplitude;
		this.amplitudeX = this.amplitudeY = 0;
		this.speed = speed;
		this.repeat = repeat;
		this.currentAngle = 0;
	}

	_inherits(WaveMotionAction, Action);

	_prototypeProperties(WaveMotionAction, null, {
		start: {

			/**
    * Stores the original velocity of the target sprite before starting to change it
    */
			value: function start() {
				_get(Object.getPrototypeOf(WaveMotionAction.prototype), "start", this).call(this);
				this.currentAngle = 0;

				this.baseVelocity = {
					x: this.target.body.velocity.x,
					y: this.target.body.velocity.y
				};

				this.amplitudeX = this.baseVelocity.x * this.amplitude;
				this.amplitudeY = this.baseVelocity.y * this.amplitude;
			},
			writable: true,
			configurable: true
		},
		update: {

			/**
    * Called to update the actions of the controlled sprite once per game update cycle
    */
			value: function update() {
				var TWO_PI = 2 * Math.PI;

				this.currentAngle += this.game.time.elapsed / 1000 * this.speed;

				var base = this.baseVelocity;
				var angle = this.currentAngle;
				this.target.body.velocity.y = Math.sin(angle) * this.amplitudeX + base.y;
				this.target.body.velocity.x = Math.cos(angle) * this.amplitudeY + base.x;

				// stop the action if we've reached the maximum number of cycles
				if (this.repeat) {
					if (this.currentAngle / TWO_PI > this.repeat) {
						this.finish();
					}
				}
			},
			writable: true,
			configurable: true
		},
		finish: {

			/**
    * Overrides parent method to restore the velocity vector of the affected sprite to its original values.
    * super() must happen last in order to avoid a potential bug where the following action modifies the
    * velocity, but the WaveMotionAction overrides it right after.
    */
			value: function finish() {
				this.target.body.velocity = this.baseVelocity;
				_get(Object.getPrototypeOf(WaveMotionAction.prototype), "finish", this).call(this);
			},
			writable: true,
			configurable: true
		}
	});

	return WaveMotionAction;
})(Action);
exports.__esModule = true;

},{"./action":2}],12:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * Green alien enemy with the wiggly tentacles (inherits from Phaser Sprite)
 */
var Enemy = require("./enemy").Enemy;
var Alien = exports.Alien = (function (Enemy) {
	function Alien(game, x, y, sprite) {
		sprite = sprite || "alien";
		_get(Object.getPrototypeOf(Alien.prototype), "constructor", this).call(this, game, x, y, sprite);

		this.x = x;
		this.y = y;

		this.animations.add("wiggle", [0, 1, 2, 3, 2], 6, true);
		this.init();
	}

	_inherits(Alien, Enemy);

	_prototypeProperties(Alien, null, {
		init: {
			value: function init() {
				_get(Object.getPrototypeOf(Alien.prototype), "init", this).call(this);

				this.score = 100;
				this.health = 10;
				this.body.velocity.x = -50;

				// randomFrame(); // add a little interest to the aliens
				this.animations.play("wiggle");
			},
			writable: true,
			configurable: true
		}
	});

	return Alien;
})(Enemy);
exports.__esModule = true;

},{"./enemy":18}],13:[function(require,module,exports){
"use strict";

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * Alien enemy that moves up and down using a wave function
 * 
 * @author Garcia Hurtado
 */
var Alien = require("./alien").Alien;
var CircleMotionAction = require("../actions/circle-motion-action").CircleMotionAction;
var StopMotionAction = require("../actions/stop-motion-action").StopMotionAction;
var WaveMotionAction = require("../actions/wave-motion-action").WaveMotionAction;
var Alien1 = exports.Alien1 = (function (Alien) {
	function Alien1(game, x, y) {
		_get(Object.getPrototypeOf(Alien1.prototype), "constructor", this).call(this, game, x, y);

		var Circle = CircleMotionAction;

		this.actions.then(function () {
			this.body.velocity.x = -50;
		}).wait(2).then(new Circle(1, 1, Circle.COUNTERCLOCKWISE)).wait(1.5).then(new Circle(1, 1.5, Circle.CLOCKWISE)).then(new StopMotionAction()).then(function () {
			this.body.velocity = { x: 0, y: 70 }; // switch directions
		}).wait(0.2).then(new WaveMotionAction(this, 1, 5));
	}

	_inherits(Alien1, Alien);

	return Alien1;
})(Alien);
exports.__esModule = true;

},{"../actions/circle-motion-action":4,"../actions/stop-motion-action":8,"../actions/wave-motion-action":11,"./alien":12}],14:[function(require,module,exports){
"use strict";

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
* ...
* @author Garcia
*/
var ArrowShip = require("./arrow-ship").ArrowShip;
var ArrowShipGreen = exports.ArrowShipGreen = (function (ArrowShip) {
	function ArrowShipGreen(game, x, y) {
		_get(Object.getPrototypeOf(ArrowShipGreen.prototype), "constructor", this).call(this, game, x, y, "arrow_ship_green");
		this.animations.add("spin", [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 12, true);
		this.play("spin");
	}

	_inherits(ArrowShipGreen, ArrowShip);

	return ArrowShipGreen;
})(ArrowShip);
exports.__esModule = true;

},{"./arrow-ship":15}],15:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
* Arrow Ship base
*
* @author Garcia
*/
var Enemy = require("./enemy").Enemy;
var ArrowShip = exports.ArrowShip = (function (Enemy) {
	function ArrowShip(game, x, y, sprite) {
		_get(Object.getPrototypeOf(ArrowShip.prototype), "constructor", this).call(this, game, x, y, sprite);
		this.sounds.laser = game.add.audio("bullet_shot");
	}

	_inherits(ArrowShip, Enemy);

	_prototypeProperties(ArrowShip, null, {
		init: {
			value: function init() {
				_get(Object.getPrototypeOf(ArrowShip.prototype), "init", this).call(this);
				this.bulletSpeed = 100;
				this.score = 250;
				this.health = 20;

				this.body.velocity.x = -180;

				var chain = this.actions;

				this.actions.wait(0.1).then(function () {
					this.turn((function () {
						return Math.random() * 1 + Math.PI - 0.6; // random angle in radians
					})());
				}).then(new TweenAction(this.body.velocity, { x: 0, y: 0 }, 2500)).then(this.shoot).then(new TweenAction(this.body.velocity, { x: 200, y: 0 }, 1000)).start();
			},
			writable: true,
			configurable: true
		},
		shoot: {

			/**
    * Shoot a bullet towards the player
    */
			value: function shoot() {
				this.sounds.laser.play();
				var bullet = this.createBullet(OvalBullet);
				bullet.body.velocity.x = -this.bulletSpeed;

				if (this.player) {
					// aim the bullet at the player
					this.game.physics.arcade.moveToObject(bullet, this.player, this.bulletSpeed);
				}
			},
			writable: true,
			configurable: true
		}
	});

	return ArrowShip;
})(Enemy);
exports.__esModule = true;

},{"./enemy":18}],16:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * Cannon Drone: Small spaceship that is impossible to kill before it opens up to reveal
 * its laser eye, which shoots a large constant laser beam
 * @author Garcia
 */
var Enemy = require("./enemy").Enemy;
var BlueLaserBeam = require("../fx/blue-laser-beam").BlueLaserBeam;
var _actionsTweenAction = require("../actions/tween-action");

var TweenAction = _actionsTweenAction.TweenAction;
var StopMotionAction = require("../actions/stop-motion-action").StopMotionAction;
var AnimationAction = require("../actions/animation-action").AnimationAction;
var WaitAction = require("../actions/wait-action").WaitAction;
var GoToAction = require("../actions/go-to-action").GoToAction;
var MethodAction = require("../actions/method-action").MethodAction;
var TweenAction = _actionsTweenAction.TweenAction;
var CannonDrone = exports.CannonDrone = (function (Enemy) {
	function CannonDrone(game) {
		var x = arguments[1] === undefined ? 0 : arguments[1];
		var y = arguments[2] === undefined ? 0 : arguments[2];
		_get(Object.getPrototypeOf(CannonDrone.prototype), "constructor", this).call(this, game, x, y, "cannon_drone");
		this.animations.add("open", [0, 1, 2], 3, false);
		this.animations.add("close", [2, 1, 0], 3, false);
		this.animations.add("stop", [0], 0, false);
		this.play("stop");

		this.sounds.laser = game.add.audio("large_beam");
		this.sounds.laser.loop = true;
		this.laser = this.createBullet(BlueLaserBeam);
		this.laser.x = -533;
		this.laser.y = -1000;

		// this.laser.x = -533;
		// this.laser.y = -1000; // effectively invisible

		this.actions.add(new TweenAction(this, { x: 310 }, 1000, Phaser.Easing.Sinusoidal.Out)) // slow down
		.then(new WaitAction(0.5)).then(new StopMotionAction()).then(new AnimationAction("open"), "openLaser").then(new WaitAction(0.5)).then(new MethodAction(this.laserOn)) // Fire!
		.then(new WaitAction(2)).then(new MethodAction(this.laserOff)).then(new AnimationAction("close"), "close").then(new WaitAction(1)).then(new GoToAction("openLaser", 2)) // repeat a second time
		.then(new TweenAction(this, { x: -50 }, 2000, Phaser.Easing.Sinusoidal.In));
	}

	_inherits(CannonDrone, Enemy);

	_prototypeProperties(CannonDrone, null, {
		init: {
			value: function init() {
				_get(Object.getPrototypeOf(CannonDrone.prototype), "init", this).call(this);

				this.health = 50;
				this.score = 300;
				this.speed = 30;
			},
			writable: true,
			configurable: true
		},
		laserOn: {

			/**
    * Turns the laser weapon on, which remains active until turned off
    */
			value: function laserOn() {
				this.sounds.laser.play();
				this.laser.play("on");
				this.laser.y = this.y;
				this.laser.x = this.x - 532;
			},
			writable: true,
			configurable: true
		},
		laserOff: {

			/**
    * Turns the laser weapon off, which remains active until turned off
    */
			value: function laserOff() {
				this.sounds.laser.stop();
				this.laser.y = -1000;
			},
			writable: true,
			configurable: true
		},
		update: {
			value: function update() {
				_get(Object.getPrototypeOf(CannonDrone.prototype), "update", this).call(this);
			},
			writable: true,
			configurable: true
		},
		kill: {
			value: function kill() {
				_get(Object.getPrototypeOf(CannonDrone.prototype), "kill", this).call(this);
				this.laserOff();
				this.laser.kill();
			},
			writable: true,
			configurable: true
		}
	});

	return CannonDrone;
})(Enemy);
exports.__esModule = true;
// speed up

},{"../actions/animation-action":3,"../actions/go-to-action":5,"../actions/method-action":6,"../actions/stop-motion-action":8,"../actions/tween-action":9,"../actions/wait-action":10,"../fx/blue-laser-beam":25,"./enemy":18}],17:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
* Represents a wave of enemies that will spawn enemies into the screen until it has created a 
* preset number of them.
*
* It uses a sprite factory to recycle sprites. One can be provided externally or the wave will 
* create its own.
*
* @param game - Instance of the Phaser game
* @param spawnCoords {x: 0, y: 0} - Object - Array of starting X,Y coordinates for new enemies spawned.
*  If the array has a single element, this element will be used for all enemy spawns.
* @param enemyType = null - Class of the enemy that this wave will Spawn. Can also be an array of
*  classes (TODO)
* @param waveSize = 1 - Total number of enemies to spawn
* @param spawnDelay = 0 - Number of seconds to wait between enemy spawns. Zero will spawn all 
*  enemies instantly
*
* @author Garcia Hurtado <ghurtado@gmail.com>
*/
var GalactronSprite = require("../galactron-sprite").GalactronSprite;
var EnemyWave = exports.EnemyWave = (function (GalactronSprite) {
	// spawnDelay; // number of seconds to wait between enemy spawns
	// spawnTimer; // keep track of the last time we spawned an enemy in this wave
	// spawnCounter; // how many enemies have spawned in this wave so far
	// player; // keep track of the player position so that we can aim and shoot at them
	// bullets; // all the bullets from all the enemies in the wave, to simplify collision
	// powerups; // the powerups that this wave drops
	// playState;
	// fx; // TODO: remove
	// enemies;

	function EnemyWave(game, enemyType, spawnCoords) {
		var waveSize = arguments[3] === undefined ? 1 : arguments[3];
		var spawnDelay = arguments[4] === undefined ? 0 : arguments[4];
		_get(Object.getPrototypeOf(EnemyWave.prototype), "constructor", this).call(this, game);
		this.playState = game.state.getCurrentState();

		// Physics
		game.physics.enable(this, Phaser.Physics.ARCADE);

		this.game = game;
		this.spawnCoords = spawnCoords;
		this.init();

		this.enemyType = enemyType;
		this.waveSize = waveSize;
		this.spawnDelay = spawnDelay;
		this.onSpawnEnemy = false; // callback to use when enemies are spawned

		this.debugSprite = false;
		this.debugColor = "#FF6600";

		this.powerups = game.add.group();
		this.fx = game.add.group();
	}

	_inherits(EnemyWave, GalactronSprite);

	_prototypeProperties(EnemyWave, null, {
		init: {

			/**
    * Resets the spawn timer, counter and the index of x, y coordinate lists
    */
			value: function init() {
				this.spawnTimer = 0;
				this.spawnCounter = 0;
				this.spawnCoordsIndex = 0;
			},
			writable: true,
			configurable: true
		},
		update: {

			/**
    * Check whether enough time has passed in order to spawn a new enemy
    */
			value: function update() {
				_get(Object.getPrototypeOf(EnemyWave.prototype), "update", this).call(this);
				this.spawnTimer += this.game.time.elapsed / 1000; // time.elapsed is in ms, convert to seconds

				if (this.spawnTimer > this.spawnDelay && this.spawnCounter < this.waveSize) {
					this.spawnEnemy();

					// Since this wave has no delay, continue spawning until all enemies have been created
					if (this.spawnDelay == 0) {
						this.update();
					}
				}
			},
			writable: true,
			configurable: true
		},
		spawnEnemy: {

			/**
    * Factory method for enemies part of this wave. It instantiates a new enemy, adds its bullets
    * to the display list, and provides it with a reference to the player.
    */
			value: function spawnEnemy() {
				//var enemy = this.enemies.getFirstDead(false);
				var enemy = false;

				if (!enemy) {
					enemy = new this.enemyType(this.game, 0, 0);
					if (this.onSpawnEnemy) {
						this.onSpawnEnemy(enemy);
					}
				}
				var current = this.spawnCoords[this.spawnCoordsIndex];
				enemy.reset(current.x, current.y);

				// Increment the coordinate index, or reset to zero if we reach the end of the coords list
				if (++this.spawnCoordsIndex >= this.spawnCoords.length) {
					this.spawnCoordsIndex = 0;
				}

				enemy.player = this.player;
				enemy.wave = this;

				this.spawnTimer = 0;
				this.spawnCounter++;
			},
			writable: true,
			configurable: true
		},
		onEnemyKill: {

			/**
    * this method to trigger an action when an enemy in this wave is killed, such as dropping
    * power-ups when all the enemies in the wave have been killed
    * @param	enemy
    */
			value: function onEnemyKill(enemy) {},
			writable: true,
			configurable: true
		},
		kill: {

			/**
    * Make sure we remove reference to this wave's FX sprites
    */
			value: function kill() {
				_get(Object.getPrototypeOf(EnemyWave.prototype), "kill", this).call(this);
				if (this.playState) {}
			},
			writable: true,
			configurable: true
		},
		dropPowerUp: {
			value: function dropPowerUp(x, y) {
				//return; // debug
				powerup = recycle(PowerUp);
				powerup.x = x;
				powerup.y = y;
				powerups.add(powerup);
			},
			writable: true,
			configurable: true
		}
	});

	return EnemyWave;
})(GalactronSprite);
exports.__esModule = true;
// remove enemy sprite from the group, so it doesn't continue to update after death
// enemies.remove(enemy);
// bullets.remove(enemy.bullets); // same for bullets

// if (enemies.countLiving() <= 0) {
// 	kill();
// 	dropPowerUp(enemy.x, enemy.y);
// }
//		playState.fx.remove(this.fx);

},{"../galactron-sprite":29}],18:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
* Represents a generic type of enemy which has a life meter and can be programmed to follow paths and attack the player.
* @author Garcia
*/
var GalactronSprite = require("../galactron-sprite").GalactronSprite;
var Explosion = require("../fx/explosion").Explosion;
var Enemy = exports.Enemy = (function (GalactronSprite) {
	/*
 bullets;
 player;
 wave; // the wave this enemy belongs to, if any
 score; // how many points you get for killing this guy
 weapon;
 
 [Embed(source="../../../../assets/sounds/dent.mp3")] dentSound;
 */

	function Enemy(game, _x, _x2, graphic) {
		var x = arguments[1] === undefined ? 0 : arguments[1];
		var y = arguments[2] === undefined ? 0 : arguments[2];
		_get(Object.getPrototypeOf(Enemy.prototype), "constructor", this).call(this, game, x, y, graphic);

		this.bullets = game.add.group();

		this.explosions = game.add.group();
		this.explosions.classType = Explosion;
		this.explosions.createMultiple(5);

		this.game.physics.enable(this, Phaser.Physics.ARCADE);
		this.sounds.dent = game.add.audio("dent");
	}

	_inherits(Enemy, GalactronSprite);

	_prototypeProperties(Enemy, null, {
		init: {

			/**
    * Called automatically from parent constructor when the object is instantiated and when it is recycled.
    * It starts the actions chain.
    */
			value: function init() {
				_get(Object.getPrototypeOf(Enemy.prototype), "init", this).call(this);

				// Prepare a filter, but do not activate, for when we need it
				var colorMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
				this.colorFilter = new PIXI.ColorMatrixFilter();
				this.colorFilter.matrix = colorMatrix;

				this.timer = this.game.time.events; // convenience

				this.lastShot = 0;
				this.score = 0;
				this.offscreenLifespan = 2;
			},
			writable: true,
			configurable: true
		},
		kill: {

			/**
    * If this enemy belongs to a wave, notify the wave that this enemy has died
    */
			value: function kill() {
				_get(Object.getPrototypeOf(Enemy.prototype), "kill", this).call(this);

				if (this.wave) {
					this.wave.onEnemyKill(this);
				}
			},
			writable: true,
			configurable: true
		},
		deathAnimation: {

			/**
    * Custom death animation (explosion)
    */
			value: function deathAnimation() {
				var explosion = this.explosions.getRandom();
				explosion.reset(); // spawn explosion in the middle of the enemy sprite
				explosion.centerAt(this);
				explosion.explode();
			},
			writable: true,
			configurable: true
		},
		damageAnimation: {

			/**
    * Custom hurt animation. Plays a sound and flashes the sprite with a quick white fill 
    * a couple of times in a row.
    */
			value: function damageAnimation() {
				this.sounds.dent.play();
				this.doLater(0, this.fillWhite, this);
				this.doLater(30, this.resetFilters, this);
				this.doLater(60, this.fillWhite, this);
				this.doLater(90, this.resetFilters, this);
			},
			writable: true,
			configurable: true
		},
		fillWhite: {

			/**
    * Apply an all white filter to the sprite, respecting alpha
    */
			value: function fillWhite() {
				this.colorFilter.matrix = [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1];

				this.filters = [this.colorFilter];
			},
			writable: true,
			configurable: true
		},
		resetFilters: {

			/**
    * Resets the PIXI filters to none
    */
			value: function resetFilters() {
				this.filters = null;
			},
			writable: true,
			configurable: true
		},
		update: {
			value: function update() {
				_get(Object.getPrototypeOf(Enemy.prototype), "update", this).call(this);
			},
			writable: true,
			configurable: true
		},
		addWeapon: {

			/**
    * Add the bullets from this weapon to the enemy's bullet list and a reference to its spriteFactory
    * @param	weapon
    */
			value: function addWeapon(weapon) {
				weapon.bullets = this.bullets;
				weapon.spriteFactory = spriteFactory;
			},
			writable: true,
			configurable: true
		},
		createBullet: {

			/**
    * Create a bullet of the specified class, at the given coordinates, and enable its Physics body
    * as well as add it to the bullets array of this enemy
    */
			value: function createBullet(bulletClass) {
				var x = arguments[1] === undefined ? this.x : arguments[1];
				var y = arguments[2] === undefined ? this.y : arguments[2];
				var bullet = new bulletClass(this.game, x, y);
				bullet.enableBody = true;
				this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
				this.bullets.add(bullet);
				bullet.reset(x, y);
				return bullet;
			},
			writable: true,
			configurable: true
		}
	});

	return Enemy;
})(GalactronSprite);
exports.__esModule = true;

},{"../fx/explosion":28,"../galactron-sprite":29}],19:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * Body part of the Snake type enemy. There should be several of these.
 */
var Enemy = require("./enemy").Enemy;
var SnakeBody = exports.SnakeBody = (function (Enemy) {
	function SnakeBody(game, x, y, sprite) {
		sprite = sprite || "red_snake_body";
		_get(Object.getPrototypeOf(SnakeBody.prototype), "constructor", this).call(this, game, x, y, sprite);
		this.leader; // target sprite to follow
		this.trackingDist = 10; // max distance to trail the leader sprite by
		this.lastLeaderPos;
		this.lastElapsed;
		this.game.physics.enable(this, Phaser.Physics.ARCADE);
		//this.anchor.setTo(0.5, 0.5);
	}

	_inherits(SnakeBody, Enemy);

	_prototypeProperties(SnakeBody, null, {
		update: {
			value: function update() {
				_get(Object.getPrototypeOf(SnakeBody.prototype), "update", this).call(this);

				// ensure we keep within the max distance of the leader
				if (this.leader && this.distanceTo(this.leader) > this.trackingDist) {
					// bring it closer
					var distance = new Phaser.Point(this.x - this.leader.x, this.y - this.leader.y);
					distance.setMagnitude(this.trackingDist);
					this.x = this.leader.x + distance.x;
					this.y = this.leader.y + distance.y;
				}
			},
			writable: true,
			configurable: true
		}
	});

	return SnakeBody;
})(Enemy);
exports.__esModule = true;

},{"./enemy":18}],20:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * Head sprite of the Snake type enemy. There should only be one.
 */
var Enemy = require("./enemy").Enemy;
var SnakeHead = exports.SnakeHead = (function (Enemy) {
	function SnakeHead(game, x, y, sprite) {
		sprite = sprite || "red_snake_head";
		_get(Object.getPrototypeOf(SnakeHead.prototype), "constructor", this).call(this, game, x, y, sprite);
		this.game.physics.enable(this, Phaser.Physics.ARCADE);
		// this.anchor.setTo(0.5, 0.5);
	}

	_inherits(SnakeHead, Enemy);

	_prototypeProperties(SnakeHead, null, {
		update: {
			value: function update() {
				_get(Object.getPrototypeOf(SnakeHead.prototype), "update", this).call(this);
				if (this.leader) {
					this.body.velocity = this.leader.body.velocity;
					this.x = this.leader.x;
					this.y = this.leader.y;
				}
			},
			writable: true,
			configurable: true
		}
	});

	return SnakeHead;
})(Enemy);
exports.__esModule = true;

},{"./enemy":18}],21:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * Snake-like spaceship with several segments as subsprites
 */
var Enemy = require("./enemy").Enemy;
var SnakeHead = require("./snake-head").SnakeHead;
var SnakeBody = require("./snake-body").SnakeBody;
var WaveMotionAction = require("../actions/wave-motion-action").WaveMotionAction;
var MethodAction = require("../actions/method-action").MethodAction;
var CircleMotionAction = require("../actions/circle-motion-action").CircleMotionAction;
var Snake = exports.Snake = (function (Enemy) {
	function Snake(game, x, y) {
		_get(Object.getPrototypeOf(Snake.prototype), "constructor", this).call(this, game, x, y);

		this.partDistance = 5; // separation between the center of the segments
		this.createParts();
	}

	_inherits(Snake, Enemy);

	_prototypeProperties(Snake, null, {
		init: {
			value: function init() {
				_get(Object.getPrototypeOf(Snake.prototype), "init", this).call(this);

				this.score = 100;
				this.health = 10;
				this.body.velocity.x = -100;

				// actions
				this.actions.then(new WaveMotionAction(this, 1.5, 5, 1)).then(new MethodAction(function () {
					this.body.velocity = { x: -200, y: 0 };
				})).then(new CircleMotionAction(4, 10))
				// .then(new CircleMotionAction(2, 0.5, -1))
				// .then(new MethodAction(function(){
				// 	this.body.velocity.x = 100;
				// 	this.body.velocity.y = 0;
				// }))
				// .wait(1.5)
				// .then(new CircleMotionAction(2, 0.25, -1))
				// .wait(1)
				// .then(new CircleMotionAction(2, 0.25))
				.start();
			},
			writable: true,
			configurable: true
		},
		kill: {

			/**
    * When the snake is killed, we need to destroy each of the segments one by one, 
    * starting with the head.
    */
			value: function kill() {
				_get(Object.getPrototypeOf(Snake.prototype), "kill", this).call(this);
				var count = this.parts.length;
				var delay = Phaser.Timer.SECOND * 0.15;
				var part;
				var index;

				for (var i = 0; i < count; i++) {
					index = count - i - 1; // reverse the order in which we destroy the parts
					part = this.parts.getAt(index);

					// Space out the explosion of each body part by a small amount to simulate a chain reaction
					this.game.time.events.add(delay * i, function () {
						this.kill();
					}, part);
				}
			},
			writable: true,
			configurable: true
		},
		createParts: {

			/**
    * This enemy is made up of multiple subprites representing the head and body parts.
    * Create them all at once and add them to the same group in the reverse order that they 
    * were created, to ensure correct layering
    */
			value: function createParts() {
				this.parts = this.game.add.group();

				var head = this.createHead(this.x - 1, this.y); // offset the head a tiny bit respect to the other body parts
				head.leader = this;
				this.parts.add(head);

				var num = 10;
				var nextLeader = head;

				for (var i = 0; i < num; i++) {
					var x = head.x + (i + 1) * this.partDistance;
					var part = this.createBody(x, 20);
					this.game.physics.enable(part, Phaser.Physics.ARCADE);
					part.leaderDist = this.partDistance;
					part.leader = nextLeader;
					nextLeader = part;
					this.parts.add(part);
				}

				// Add each body part to the display list in reverse order they were created
				this.parts.forEach(function (part) {
					this.parts.sendToBack(part);
					part.reset(this.x, this.y);
				}, this);
			},
			writable: true,
			configurable: true
		},
		createHead: {

			/**
    * Separate creation of head piece to allow override in child class
    */
			value: function createHead(x, y) {
				return new SnakeHead(this.game, x, y);
			},
			writable: true,
			configurable: true
		},
		createBody: {

			/**
    * Separate creation of body pieces to allow override in child class
    */
			value: function createBody(x, y) {
				return new SnakeBody(this.game, x, y);
			},
			writable: true,
			configurable: true
		},
		reset: {

			/**
    * Overrides parent
    */
			value: function reset(x, y) {
				_get(Object.getPrototypeOf(Snake.prototype), "reset", this).call(this, x, y);
				var part;
				for (var i = 0; i < this.parts.length; i++) {
					part = this.parts.getAt(i);
					part.reset(this.x, this.y);
				};
			},
			writable: true,
			configurable: true
		}
	});

	return Snake;
})(Enemy);
exports.__esModule = true;

},{"../actions/circle-motion-action":4,"../actions/method-action":6,"../actions/wave-motion-action":11,"./enemy":18,"./snake-body":19,"./snake-head":20}],22:[function(require,module,exports){
"use strict";

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var SnakeBody = require("./snake-body").SnakeBody;
var WhiteSnakeBody = exports.WhiteSnakeBody = (function (SnakeBody) {
	function WhiteSnakeBody(game, x, y) {
		_get(Object.getPrototypeOf(WhiteSnakeBody.prototype), "constructor", this).call(this, game, x, y, "white_snake_body");
	}

	_inherits(WhiteSnakeBody, SnakeBody);

	return WhiteSnakeBody;
})(SnakeBody);
exports.__esModule = true;

},{"./snake-body":19}],23:[function(require,module,exports){
"use strict";

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var SnakeHead = require("./snake-head").SnakeHead;
var WhiteSnakeHead = exports.WhiteSnakeHead = (function (SnakeHead) {
	function WhiteSnakeHead(game, x, y) {
		_get(Object.getPrototypeOf(WhiteSnakeHead.prototype), "constructor", this).call(this, game, x, y, "white_snake_head");
	}

	_inherits(WhiteSnakeHead, SnakeHead);

	return WhiteSnakeHead;
})(SnakeHead);
exports.__esModule = true;

},{"./snake-head":20}],24:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * Segmented white snake type enemy
 */
var Snake = require("./snake").Snake;
var WhiteSnakeHead = require("./white-snake-head").WhiteSnakeHead;
var WhiteSnakeBody = require("./white-snake-body").WhiteSnakeBody;
var WhiteSnake = exports.WhiteSnake = (function (Snake) {
	function WhiteSnake() {
		if (Object.getPrototypeOf(WhiteSnake) !== null) {
			Object.getPrototypeOf(WhiteSnake).apply(this, arguments);
		}
	}

	_inherits(WhiteSnake, Snake);

	_prototypeProperties(WhiteSnake, null, {
		createHead: {
			value: function createHead(x, y) {
				return new WhiteSnakeHead(this.game, x, y);
			},
			writable: true,
			configurable: true
		},
		createBody: {
			value: function createBody(x, y) {
				return new WhiteSnakeBody(this.game, x, y);
			},
			writable: true,
			configurable: true
		}
	});

	return WhiteSnake;
})(Snake);
exports.__esModule = true;

},{"./snake":21,"./white-snake-body":22,"./white-snake-head":23}],25:[function(require,module,exports){
"use strict";

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * @author Garcia Hurtado
 */
var Bullet = require("./bullet").Bullet;
var BlueLaserBeam = exports.BlueLaserBeam = (function (Bullet) {
	function BlueLaserBeam(game) {
		_get(Object.getPrototypeOf(BlueLaserBeam.prototype), "constructor", this).call(this, game, 0, 0, "laser_blue_beam");
		this.animations.add("on", [0, 1], 30, true);
		this.power = 10;
	}

	_inherits(BlueLaserBeam, Bullet);

	return BlueLaserBeam;
})(Bullet);
exports.__esModule = true;

},{"./bullet":27}],26:[function(require,module,exports){
"use strict";

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * @author Garcia Hurtado
 */
var Bullet = require("./bullet").Bullet;
var BlueLaser = exports.BlueLaser = (function (Bullet) {
	function BlueLaser(game) {
		_get(Object.getPrototypeOf(BlueLaser.prototype), "constructor", this).call(this, game, 0, 0, "laser_blue");
		this.power = 10;
	}

	_inherits(BlueLaser, Bullet);

	return BlueLaser;
})(Bullet);
exports.__esModule = true;

},{"./bullet":27}],27:[function(require,module,exports){
"use strict";

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var GalactronSprite = require("../galactron-sprite").GalactronSprite;


/**
 * Bullet sprite class. Extends Phaser.Sprite to provide damage variable
 *
 * @author Garcia Hurtado
 */
var Bullet = exports.Bullet = (function (GalactronSprite) {
  function Bullet(game, x, y, sprite) {
    _get(Object.getPrototypeOf(Bullet.prototype), "constructor", this).call(this, game, x, y, sprite);
    this.power = 1;
  }

  _inherits(Bullet, GalactronSprite);

  return Bullet;
})(GalactronSprite);
exports.__esModule = true;

},{"../galactron-sprite":29}],28:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * 5 Frame explosion sprite. It kills itself on animation end
 * 
 * @author Garcia Hurtado
 */
var GalactronSprite = require("../galactron-sprite").GalactronSprite;
var Explosion = exports.Explosion = (function (GalactronSprite) {
	function Explosion(game, x, y) {
		_get(Object.getPrototypeOf(Explosion.prototype), "constructor", this).call(this, game, x, y, "explosion");
		this.animations.add("explode", [1, 2, 3, 4, 5], 8);

		this.sound1 = game.add.audio("explosion1");
		this.sound2 = game.add.audio("explosion2");
		// this.game.physics.enable(this, Phaser.Physics.ARCADE);
	}

	_inherits(Explosion, GalactronSprite);

	_prototypeProperties(Explosion, null, {
		explode: {
			value: function explode() {
				this.play("explode");
				// this.body.velocity.x = -50;

				// Vary randomly between two different explosion sounds
				var sound = Phaser.Math.randomSign() == 1 ? this.sound1 : this.sound2;
				sound.play();

				this.events.onAnimationComplete.add(function () {
					this.kill();
				}, this);
			},
			writable: true,
			configurable: true
		}
	});

	return Explosion;
})(GalactronSprite);
exports.__esModule = true;

},{"../galactron-sprite":29}],29:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var ActionChain = require("./actions/action-chain").ActionChain;
var GalactronSprite = exports.GalactronSprite = (function (_Phaser$Sprite) {
	function GalactronSprite(game, _x, _x2, graphic) {
		var x = arguments[1] === undefined ? 0 : arguments[1];
		var y = arguments[2] === undefined ? 0 : arguments[2];
		this.math = game.math; // convenience
		this.immune = false;
		this.debugSprite = false; // render the sprite's bounds (expensive, debug only)
		this.debugBody = false; // render the physics body's bounds
		this.debugSpriteColor = "#00FF00"; // default color of the debug outline of the sprite (green)
		this.debugBodyColor = "#FF0000"; // default color of the debug outline of the body (red)

		_get(Object.getPrototypeOf(GalactronSprite.prototype), "constructor", this).call(this, game, x, y, graphic);
		this.actions = new ActionChain(game, this);
		game.add.existing(this.actions);

		this.sounds = {}; // object to keep track of various FX sounds
	}

	_inherits(GalactronSprite, _Phaser$Sprite);

	_prototypeProperties(GalactronSprite, null, {
		update: {

			/**
    * Overrides parent to add debugging functionality. Since Phaser.update() is an empty method,
    * there is no need to call super.update() and incur traceur perf. penalty.
    */
			value: function update() {
				if (this.debugBody) {
					this.game.debug.body(this, this.debugBodyColor, false);
				}
				if (this.debugSprite) {
					this.game.debug.spriteBounds(this, this.debugSpriteColor, false);
				}

				if (this.body) {
					this.body.position.x = Math.floor(this.body.position.x);
					this.body.position.y = Math.floor(this.body.position.y);
				}
			},
			writable: true,
			configurable: true
		},
		reset: {

			/**
    * @TODO: Refactor / combine with init?
    */
			value: function reset(x, y) {
				_get(Object.getPrototypeOf(GalactronSprite.prototype), "reset", this).call(this, x, y, this.health);
				this.init();
			},
			writable: true,
			configurable: true
		},
		init: {

			/**
    * Init should restart the action chain
    */
			value: function init() {
				if (this.actions) {
					this.actions.start();
				}
			},
			writable: true,
			configurable: true
		},
		damage: {

			/**
    * Overrides parent to provide hook for damageAnimation() except when dead
    * @param	amount. Number of health points to substract from entity
    */
			value: function damage(amount) {
				_get(Object.getPrototypeOf(GalactronSprite.prototype), "damage", this).call(this, amount);

				if (this.alive) {
					this.damageAnimation();
				}
			},
			writable: true,
			configurable: true
		},
		damageAnimation: {

			/**
    * Override in child class to provide an animation that plays when this sprite is hurt, but not dead
    */
			value: function damageAnimation() {
				return;
			},
			writable: true,
			configurable: true
		},
		kill: {

			/**
    * Overrides parent to provide hook for custom death animation and automatic removal from parent sprite group
    */
			value: function kill() {
				_get(Object.getPrototypeOf(GalactronSprite.prototype), "kill", this).call(this);

				if (this.inWorld) {
					this.deathAnimation();
				}
			},
			writable: true,
			configurable: true
		},
		onChildKilled: {

			/**
    * Override in subclass to take action when children sprites are killed (ie: to kill an invisible
    * sprite container parent)
    */
			value: function onChildKilled() {},
			writable: true,
			configurable: true
		},
		deathAnimation: {

			/**
    * Override in child class to provide an animation that plays when this sprite is killed. Keep in mind
    * that this function will be called after the sprite no longer exists, so it should not rely on the
    * sprite's update() method.
    */
			value: function deathAnimation() {
				return;
			},
			writable: true,
			configurable: true
		},
		revive: {
			value: function revive() {
				_get(Object.getPrototypeOf(GalactronSprite.prototype), "revive", this).call(this, this.health);
			},
			writable: true,
			configurable: true
		},
		angleTo: {

			/* ------------- PHYSICS --------------------*/

			/**
    * Calculate the angle of the vector between this sprite and a target, in radians
    * 
    * @param	target
    */
			value: function angleTo(target) {
				return this.math.angleBetweenPoints(this, target);
			},
			writable: true,
			configurable: true
		},
		distanceTo: {

			/**
    * Return the distance in pixels between this sprite and any other target with x,y coordinates
    */
			value: function distanceTo(target) {
				return this.math.distance(this.x, this.y, target.x, target.y);
			},
			writable: true,
			configurable: true
		},
		centerAt: {

			/**
    * Moves this sprite such that its center is placed exactly at the center of the
    * provided sprite
    * @param target Phaser.Sprite
    */
			value: function centerAt(target) {
				this.x = target.world.x + Math.round(target.width * 0.5);
				this.y = target.world.y + Math.round(target.height * 0.5);

				// substract half the width and height of this sprite from x,y to finish centering it
				this.x -= Math.round(this.width / 2);
				this.y -= Math.round(this.height / 2);
			},
			writable: true,
			configurable: true
		},
		turn: {

			/**
    * Preserving current velocity magnitude, update the velocity vector to point
    * in the specified angle (in radians). Requires physics to be enabled.
    */
			value: function turn(angle) {
				angle = angle * (180 / Math.PI); // convert radians to degrees
				this.game.physics.arcade.velocityFromAngle(angle, this.body.speed, this.body.velocity);
			},
			writable: true,
			configurable: true
		},
		doLater: {

			/**
    * Convenience method that wraps Phaser.Timer
    */
			value: function doLater(millis, action, context) {
				context = context || this;
				this.game.time.events.add(millis, action, context);
			},
			writable: true,
			configurable: true
		}
	});

	return GalactronSprite;
})(Phaser.Sprite);
exports.__esModule = true;
// nothing to do

},{"./actions/action-chain":1}],30:[function(require,module,exports){
"use strict";

require("./phaser-group.js");

var MenuState = require("./menu-state").MenuState;
var Level1 = require("./level-1").Level1;
var Level2 = require("./level-2").Level2;
var Level3 = require("./level-3").Level3;


(function () {
	var game = new Phaser.Game(380, 260, Phaser.WEBGL, // WebGL is needed in order to use filters
	"canvasWrapper", { preload: preload, create: create, update: update });

	// @TODO: Figure out how to make this work with WebGL
	// Phaser.Canvas.setSmoothingEnabled(game.context, false);

	var controls; // keep track of the cursor keys

	var player; // the main player sprite
	var bullets; // player bullets
	var enemies; // anything that can kill the player

	function preload() {
		// Load graphics
		game.load.image("player_life", "images/galactron/player_life.png");
		game.load.spritesheet("player", "images/galactron/player_ship.png", 34, 25, 3);
		game.load.spritesheet("player_flame", "images/galactron/fx/player_ship_flame.png", 12, 25, 2);
		game.load.spritesheet("oval_bullet", "images/galactron/fx/oval_bullet.png", 8, 8);
		game.load.spritesheet("laser_blue", "images/galactron/fx/laser_blue.png", 16, 3, 1);
		game.load.spritesheet("laser_blue_beam", "images/galactron/fx/laser_blue_beam.png", 530, 20);
		game.load.spritesheet("explosion", "images/galactron/fx/explosion.png", 35, 35, 6);

		// Enemies
		game.load.spritesheet("arrow_ship_red", "images/galactron/enemies/arrow_ship_red.png", 28, 18);
		game.load.spritesheet("arrow_ship_green", "images/galactron/enemies/arrow_ship_green.png", 28, 18);
		game.load.spritesheet("alien", "images/galactron/enemies/alien.png", 20, 20);
		game.load.spritesheet("alien_red", "images/galactron/enemies/alien_red.png", 20, 20);
		game.load.spritesheet("cannon_drone", "images/galactron/enemies/cannon_drone.png", 12, 20);
		game.load.spritesheet("floating_mine", "images/galactron/enemies/floating_mine.png", 21, 21);
		game.load.spritesheet("floating_mine_spike", "images/galactron/enemies/floating_mine_spike.png", 5, 5);
		game.load.spritesheet("red_snake_head", "images/galactron/enemies/red_snake_head.png", 19, 24);
		game.load.spritesheet("red_snake_body", "images/galactron/enemies/red_snake_body.png", 16, 16);
		game.load.spritesheet("white_snake_head", "images/galactron/enemies/white_snake_head.png", 19, 24);
		game.load.spritesheet("white_snake_body", "images/galactron/enemies/white_snake_body.png", 16, 16);

		// Load sounds
		game.load.audio("explosion1", "sounds/explosion1.mp3");
		game.load.audio("explosion2", "sounds/explosion2.mp3");
		game.load.audio("bullet_shot", "sounds/bullet_shot.mp3");
		game.load.audio("laser", "sounds/laser.mp3");
		game.load.audio("dent", "sounds/dent.mp3");
		game.load.audio("large_beam", "sounds/large_beam.mp3");
	}

	function create() {
		// Scale to 2x pixels --------------
		game.stage.scale.set(2);
		game.stage.scale.minWidth = 760;
		game.stage.scale.minHeight = 520;
		game.scale.maxWidth = 760;
		game.scale.maxHeight = 520;
		game.stage.smoothed = false;

		//  Then we tell Phaser that we want it to scale up to whatever the browser can handle, but to do it proportionally
		game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		game.scale.setScreenSize(true);

		// Add game states
		game.state.add("MenuState", MenuState);
		game.state.add("Level1", Level1);
		game.state.add("Level2", Level2);
		game.state.add("Level3", Level3);

		game.state.start("MenuState");
	}

	/**
  * Adds a previously created sprite to the game
  */
	function addSprite(sprite) {
		game.add.existing(sprite);
	}

	function createRandomAliens() {
		// add Aliens
		var alien = new Alien(game, 20, 10);
		game.add.existing(alien, 10, 10);
		alien.body.velocity.x = 3;

		var alien2;

		// Create 3000 aliens
		for (var i = 0; i < 3000; i++) {
			alien2 = new Alien(game, game.world.randomX, game.world.randomY);
			game.physics.enable(alien2, Phaser.Physics.ARCADE);
			if (Math.random() > 0.5) {
				alien2.body.velocity.x = +30;
			} else {
				alien2.body.velocity.x = -30;
			}

			game.add.existing(alien2);
		}
	}

	function update(game) {}
})();
// Nothing actually happens here

},{"./level-1":32,"./level-2":33,"./level-3":34,"./menu-state":35,"./phaser-group.js":36}],31:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

/**
 * Base Game State class intended to be extended by all the other states, whether playable or not (such as menus)
 */
var GameState = exports.GameState = (function () {
	function GameState() {}

	_prototypeProperties(GameState, null, {
		createText: {

			/**
    * Add dynamic text to the screen in a specified position, and return it
    */
			value: function createText(text, x, y) {
				var size = arguments[3] === undefined ? 8 : arguments[3];
				var font = arguments[4] === undefined ? "FirewireBlack" : arguments[4];
				var color = arguments[5] === undefined ? "#FFFFFF" : arguments[5];
				var align = arguments[6] === undefined ? "center" : arguments[6];
				var style = { font: size + "px " + font, fill: color, align: align };
				var txt = this.game.add.text(x, y, text, style);

				if (align == "center") {
					txt.anchor.setTo(0.5, 0.5);
				} else if (align == "right") {
					txt.anchor.setTo(1, 1);
				}

				return txt;
			},
			writable: true,
			configurable: true
		},
		create: {

			/**
    * Override this in your child state to provide initialization code (create text, set up
    * counters, create player, etc...)
    */
			value: function create() {},
			writable: true,
			configurable: true
		},
		enableInput: {

			/**
    * Wire up the keyboard controls 
    */
			value: function enableInput() {
				// create controls
				this.controls = this.game.input.keyboard.createCursorKeys();
				this.controls.fire = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
				this.controls.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

				// Add Pause key
				this.controls.pause = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
				this.controls.pause.onDown.add(function () {
					this.game.paused = !this.game.paused;
				}, this);
			},
			writable: true,
			configurable: true
		}
	});

	return GameState;
})();
exports.__esModule = true;
// Nothing to do

},{}],32:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * First level of the game. Contains custom level code:
 * - Backgrounds
 * - Enemies and waves
 * - Level boss
 *
 * @author Garcia Hurtado
 */
var PlayState = require("./play-state").PlayState;
var SlidingBackground = require("./sliding-background").SlidingBackground;
var SpawnWaveAction = require("./actions/spawn-wave-action").SpawnWaveAction;
var Alien1 = require("./enemies/alien1").Alien1;
var Snake = require("./enemies/snake").Snake;
var WhiteSnake = require("./enemies/white-snake").WhiteSnake;
var Level1 = exports.Level1 = (function (PlayState) {
		function Level1(game) {
				_get(Object.getPrototypeOf(Level1.prototype), "constructor", this).call(this, game);

				this.starfield1;
				this.starfield2;
				this.starfield3;
				this.ground;
		}

		_inherits(Level1, PlayState);

		_prototypeProperties(Level1, null, {
				preload: {
						value: function preload() {
								_get(Object.getPrototypeOf(Level1.prototype), "preload", this).call(this);

								// [Embed(source = "../../../assets/terrain.png")] var groundSprite;
								// [Embed(source = "../../../assets/data/level1_ground.csv", mimeType="application/octet-stream")] var groundTilemap;

								// Starfields
								this.game.load.spritesheet("starfield1", "images/galactron/background/starfield1.png", 1920, 240);
								this.game.load.spritesheet("starfield2", "images/galactron/background/starfield2.png", 960, 240);
								this.game.load.spritesheet("starfield3", "images/galactron/background/starfield3.png", 960, 240);

								// Planets
								this.game.load.image("big_blue_world", "images/galactron/background/big_blue_world.png");
								this.game.load.image("green_saturn", "images/galactron/background/green_saturn.png");
								this.game.load.image("small_jupiter", "images/galactron/background/small_jupiter.png");
								this.game.load.image("small_mars", "images/galactron/background/small_mars.png");
						},
						writable: true,
						configurable: true
				},
				create: {
						value: function create() {
								_get(Object.getPrototypeOf(Level1.prototype), "create", this).call(this);
								this.createBackground();

								var width = this.game.width;

								// Define enemy waves and game events chain
								this.events
								// .wait(1)
								// .then(new SpawnWaveAction(
								// 	FloatingMine,[
								// 	{x: width, y: 30},
								// 	{x: width, y: 50},
								// 	{x: width, y: 70},
								// 	{x: width, y: 90},
								// 	{x: width, y: 110},
								// 	{x: width, y: 130},
								// 	{x: width, y: 150},
								// 	{x: width, y: 130},
								// 	{x: width, y: 110},
								// 	{x: width, y: 90},
								// 	{x: width, y: 70},
								// 	{x: width, y: 50}
								// 	],
								// 	10, 0.5))
								.then(new SpawnWaveAction(Alien1, [{ x: width, y: 130 }], 30, 0.3))
								// .then(new SpawnWaveAction(Alien1, [{x:width, y:100}], 20, 0.3))
								// .then(new SpawnWaveAction(Alien1, [{x:width, y:150}], 20, 0.3))
								// .then(new SpawnWaveAction(Alien1, [{x:width, y:200}], 20, 0.3))
								// .wait(5)
								// .then(new SpawnWaveAction(AlienRed, [{x:width, y:150}], 20, 0.3))
								.wait(10).then(new SpawnWaveAction(Snake, [{ x: width, y: 120 }], 1)).then(new SpawnWaveAction(Snake, [{ x: width, y: 220 }], 1)).wait(20).then(new SpawnWaveAction(WhiteSnake, [{ x: width, y: 100 }], 1)).then(new SpawnWaveAction(WhiteSnake, [{ x: width, y: 150 }], 1)).then(new SpawnWaveAction(WhiteSnake, [{ x: width, y: 200 }], 1)).start();


								// cheat :)
								//player.changeWeapon(new LaserGunQuad());

								// configure level content and events -------------------------------------------
								// var scorpion = new Scorpion1();
								// scorpion.x = 100;
								// scorpion.y = 100;

								// add(scorpion);
						},
						writable: true,
						configurable: true
				},
				createBackground: {

						/**
       * Custom level background and terrain layers
       *
       * @return
       */
						value: function createBackground() {
								var width = this.game.stage.width;
								var height = this.game.stage.height;

								// we will use several starfield tileSprites to create a parallax effect
								var starfield1 = this.game.add.tileSprite(0, 0, width, height, "starfield1");
								starfield1.autoScroll(-120, 0);
								var starfield2 = this.game.add.tileSprite(0, 0, width, height, "starfield2");
								starfield2.autoScroll(-130, 0);
								var starfield3 = this.game.add.tileSprite(0, 0, width, height, "starfield3");
								starfield3.autoScroll(-160, 0);

								var greenSaturn = new SlidingBackground(this.game, 600, 50, "green_saturn", -30);
								var smallMars = new SlidingBackground(this.game, 1300, 150, "small_mars", -30);
								var smallJupiter = new SlidingBackground(this.game, 2500, 30, "small_jupiter", -30);
								var bigBlueWorld = new SlidingBackground(this.game, 500, 0, "big_blue_world", -30);

								this.background.add(starfield1);
								this.background.add(starfield2);
								this.background.add(starfield3);

								// this.background.add(greenSaturn);
								this.background.add(smallMars);
								this.background.add(smallJupiter);
								this.background.add(bigBlueWorld);

								// // Add the ground tilemap
								// ground = new FlxTilemap();
								// ground.solid = true;
								// ground.x = 400;
								// ground.y = 0;
								// ground.loadMap( new groundTilemap, groundSprite, 32, 32, FlxTilemap.OFF, 0, 1, 1 );
								// ground.scrollFactor.x = 0.25;

								// background.add(starfield1);
								// background.add(starfield2);
								// background.add(starfield3);
								// background.add(ground);
								// return background;
						},
						writable: true,
						configurable: true
				}
		});

		return Level1;
})(PlayState);
exports.__esModule = true;

},{"./actions/spawn-wave-action":7,"./enemies/alien1":13,"./enemies/snake":21,"./enemies/white-snake":24,"./play-state":37,"./sliding-background":39}],33:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * Level 2. Contains custom level content:
 * - Backgrounds
 * - Enemies and waves
 * - Level boss
 *
 * @author Garcia Hurtado
 */
var PlayState = require("./play-state").PlayState;
var SlidingBackground = require("./sliding-background").SlidingBackground;
var WaitAction = require("./actions/wait-action").WaitAction;
var SpawnWaveAction = require("./actions/spawn-wave-action").SpawnWaveAction;
var CannonDrone = require("./enemies/cannon-drone").CannonDrone;
var Level2 = exports.Level2 = (function (PlayState) {
		function Level2(game) {
				_get(Object.getPrototypeOf(Level2.prototype), "constructor", this).call(this, game);

				this.starfield1;
				this.starfield2;
				this.starfield3;
				this.ground;
		}

		_inherits(Level2, PlayState);

		_prototypeProperties(Level2, null, {
				preload: {
						value: function preload() {
								_get(Object.getPrototypeOf(Level2.prototype), "preload", this).call(this);

								// [Embed(source = "../../../assets/terrain.png")] var groundSprite;
								// [Embed(source = "../../../assets/data/level1_ground.csv", mimeType="application/octet-stream")] var groundTilemap;

								// Starfields
								this.game.load.spritesheet("starfield1", "images/galactron/background/starfield1.png", 1920, 240);
								this.game.load.spritesheet("starfield2", "images/galactron/background/starfield2.png", 960, 240);
								this.game.load.spritesheet("starfield3", "images/galactron/background/starfield3.png", 960, 240);

								// Planets
								this.game.load.image("big_blue_world", "/images/galactron/background/big_blue_world.png");
								this.game.load.image("green_saturn", "/images/galactron/background/green_saturn.png");
								this.game.load.image("small_jupiter", "/images/galactron/background/small_jupiter.png");
								this.game.load.image("small_mars", "/images/galactron/background/small_mars.png");
						},
						writable: true,
						configurable: true
				},
				create: {
						value: function create() {
								_get(Object.getPrototypeOf(Level2.prototype), "create", this).call(this);
								this.createBackground();

								var width = this.game.width;

								this.events.add(new WaitAction(0.5)).then(new SpawnWaveAction(CannonDrone, [{ x: width, y: 100 }, { x: width, y: 120 }, { x: width, y: 140 }, { x: width, y: 160 }, { x: width, y: 180 }, { x: width, y: 200 }], 6, 0))

								// .then( new SpawnWaveAction(this, Scorpion1, width, 150, 3, 5))
								// .then( new WaitAction(10) )
								// .then( new SpawnWaveAction(this, ArrowShipGreen, width, 150, 12, 0.3))
								// .then( new WaitAction(5) )
								// .then( new SpawnWaveAction(this, ArrowShipRed1, width, 150, 12, 0.5))
								// .then( new WaitAction(10) )
								// .then( new SpawnWaveAction(this, CannonDrone1, width, 40, 1, 0))
								// .then( new WaitAction(1) )
								// .then( new SpawnWaveAction(this, CannonDrone1, width, 80, 1, 0))
								// .then( new WaitAction(1) )
								// .then( new SpawnWaveAction(this, CannonDrone1, width, 120, 1, 0))
								// .then( new WaitAction(1) )
								// .then( new SpawnWaveAction(this, CannonDrone1, width, 160, 1, 0))
								// .then( new SpawnWaveAction(this, Freighter1, width - 50, -30, 1, 0))
								// .then( new WaitAction(3) )
								// .then( new SpawnWaveAction(this, Scorpion1, width, 100, 4, 2))
								// .then( new WaitAction(2))
								.start();
						},
						writable: true,
						configurable: true
				},
				createBackground: {

						/**
       * Custom level background and terrain layers
       *
       * @return
       */
						value: function createBackground() {
								var width = this.game.stage.width;
								var height = this.game.stage.height;

								// we will use several starfield tileSprites to create a parallax effect
								var starfield1 = this.game.add.tileSprite(0, 0, width, height, "starfield1");
								starfield1.autoScroll(-70, 0);
								var starfield2 = this.game.add.tileSprite(0, 0, width, height, "starfield2");
								starfield2.autoScroll(-90, 0);
								var starfield3 = this.game.add.tileSprite(0, 0, width, height, "starfield3");
								starfield3.autoScroll(-110, 0);

								var greenSaturn = new SlidingBackground(this.game, 500, 50, "green_saturn", -45);
								var smallMars = new SlidingBackground(this.game, 1300, 150, "small_mars", -45);
								var smallJupiter = new SlidingBackground(this.game, 2500, 30, "small_jupiter", -45);

								this.background.add(starfield1);
								this.background.add(starfield2);
								this.background.add(starfield3);

								this.background.add(greenSaturn);
								this.background.add(smallMars);
								this.background.add(smallJupiter);
						},
						writable: true,
						configurable: true
				}
		});

		return Level2;
})(PlayState);
exports.__esModule = true;

},{"./actions/spawn-wave-action":7,"./actions/wait-action":10,"./enemies/cannon-drone":16,"./play-state":37,"./sliding-background":39}],34:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * Level 3. Contains custom level content:
 * - Backgrounds (inherits from Level2, for now)
 * - Enemies and waves
 * - Level boss
 *
 * @author Garcia Hurtado
 */
var Level2 = require("./level-2").Level2;
var SlidingBackground = require("./sliding-background").SlidingBackground;
var SpawnWaveAction = require("./actions/spawn-wave-action").SpawnWaveAction;
var WaitAction = require("./actions/wait-action").WaitAction;
var ActionChain = require("./actions/action-chain").ActionChain;
var Alien1 = require("./enemies/alien1").Alien1;
var ArrowShipGreen = require("./enemies/arrow-ship-green").ArrowShipGreen;
var CannonDrone = require("./enemies/cannon-drone").CannonDrone;
var Level3 = exports.Level3 = (function (Level2) {
	function Level3(game) {
		_get(Object.getPrototypeOf(Level3.prototype), "constructor", this).call(this, game);
	}

	_inherits(Level3, Level2);

	_prototypeProperties(Level3, null, {
		create: {
			value: function create() {
				_get(Object.getPrototypeOf(Level3.prototype), "create", this).call(this);

				var width = this.game.width;

				this.events = new ActionChain(this.game);
				this.events.add(new WaitAction(0.5)).then(new SpawnWaveAction(ArrowShipGreen, [{ x: width, y: 120 }], 40, 0.4)).then(new WaitAction(20)).then(new SpawnWaveAction(CannonDrone, [{ x: width, y: 100 }, { x: width, y: 120 }, { x: width, y: 140 }, { x: width, y: 160 }, { x: width, y: 180 }, { x: width, y: 200 }], 6, 0)).start();
			},
			writable: true,
			configurable: true
		}
	});

	return Level3;
})(Level2);
exports.__esModule = true;

},{"./actions/action-chain":1,"./actions/spawn-wave-action":7,"./actions/wait-action":10,"./enemies/alien1":13,"./enemies/arrow-ship-green":14,"./enemies/cannon-drone":16,"./level-2":33,"./sliding-background":39}],35:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * Home screen / menu for the game, with the opening title and level selection
 *
 * @author Garcia Hurtado
 */
var GameState = require("./game-state").GameState;
var MenuState = exports.MenuState = (function (GameState) {
	function MenuState(game) {
		this.arrowIndex = 0;
		this.levelList = ["Level1", "Level2", "Level3"];
		game.plugins.add(new Phaser.Plugin.Flicker());
	}

	_inherits(MenuState, GameState);

	_prototypeProperties(MenuState, null, {
		create: {

			/**
    * Lay out the text for the menus of the home screen
    */
			value: function create() {
				_get(Object.getPrototypeOf(MenuState.prototype), "create", this).call(this);
				this.game.stage.smoothed = false;
				this.enableInput();

				_get(Object.getPrototypeOf(MenuState.prototype), "createText", this).call(this, "GALACTRON", 190, 60, 32, "FirewireBlack", "#FFFFFF", "center");

				_get(Object.getPrototypeOf(MenuState.prototype), "createText", this).call(this, "LEVEL 1", 160, 140, 8, "FirewireBlack", "#FFFFFF", "left");
				_get(Object.getPrototypeOf(MenuState.prototype), "createText", this).call(this, "LEVEL 2", 160, 160, 8, "FirewireBlack", "#FFFFFF", "left");
				_get(Object.getPrototypeOf(MenuState.prototype), "createText", this).call(this, "LEVEL 3", 160, 180, 8, "FirewireBlack", "#FFFFFF", "left");

				this.arrow = _get(Object.getPrototypeOf(MenuState.prototype), "createText", this).call(this, ">", 150, 140, 8, "FirewireBlack", "#FFFFFF", "left");
				this.arrow.flicker();

				this.pressEnter = _get(Object.getPrototypeOf(MenuState.prototype), "createText", this).call(this, "PRESS ENTER TO START", 190, 240, 8, "FirewireBlack", "#FFFFFF", "center");
				this.pressEnter.flicker(1.42);

				this.configInput();
			},
			writable: true,
			configurable: true
		},
		update: {

			/**
    * Handle player input
    */
			value: function update() {
				if (this.controls.enter.isDown) {
					var newLevel = this.levelList[this.arrowIndex];
					this.game.state.start(newLevel);
				}

				// {
				// 	FlxG.flash(0xffffffff, 0.2, function():void {
				// 		FlxG.switchState(new levelList[arrowIndex]());
				// 	});
				// }
			},
			writable: true,
			configurable: true
		},
		configInput: {
			value: function configInput() {
				this.controls.down.onDown.add(function () {
					this.moveArrow(+1);
				}, this);
				this.controls.up.onDown.add(function () {
					this.moveArrow(-1);
				}, this);
			},
			writable: true,
			configurable: true
		},
		moveArrow: {

			/**
    * Move the menu arrow one item at a time up or down
    */
			value: function moveArrow(offset) {
				var newOffset = this.arrowIndex + offset;

				if (newOffset < 0 || newOffset >= this.levelList.length) {
					return false;
				} else {
					this.arrowIndex = newOffset;
					this.arrow.y += offset * 20;
				}
			},
			writable: true,
			configurable: true
		}
	});

	return MenuState;
})(GameState);
exports.__esModule = true;

},{"./game-state":31}],36:[function(require,module,exports){
"use strict";

/**
 * Monkey patch for Phaser.Group, to add additional methods to it without messing with the source
 */
Phaser = Phaser || {};
Phaser.Group = Phaser.Group || {};

/**
 * As opposed to Group.add(), if an array is passsed,
 * add the elements of that array one by one
 */
Phaser.Group.prototype.addMany = function (other) {
	var newChildren;

	if (other instanceof Array) {
		// "other" is a plain ol' array 
		newChildren = other;
	} else if (other.children && other.children instanceof Array) {
		// "other" is a Phaser.Group
		newChildren = other.children;
	}

	// Add we use Group.add, the length of the newChildren group decreases, so a reverse loop is needed
	for (var i = newChildren.length - 1; i >= 0; i--) {
		this.add(newChildren[i]);
	};
};

},{}],37:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
* Base Playstate class. Provides base functionality used by all "playable" levels in the game. It
* is meant to be extended by individual levels to provide custom functionality and level content such as:
*
* - Level backgrounds and graphics
* - Level specific enemies and waves
* - Final boss for each level
* 
* @author Garcia Hurtado
*/
var Utils = require("./utils").Utils;
var GameState = require("./game-state").GameState;
var ActionChain = require("./actions/action-chain").ActionChain;
var PlayerShip = require("./player-ship").PlayerShip;
var SlidingBackground = require("./sliding-background").SlidingBackground;
var EnemyWave = require("./enemies/enemy-wave").EnemyWave;
var PlayState = exports.PlayState = (function (GameState) {
	function PlayState(game) {
		this.game = game;
		this.player;
		this.playerLayer;
		this.playerBullets;
		this.fx;
		this.events;

		/**
   * @var An enemy is simply something that the player can kill and which can kill the player
   */
		this.enemies;
		this.waves;

		/**
   * @var An enemy bullet is a sprite that can kill the player but cannot be hit by the player
   */
		this.enemyBullets;
		this.powerups;
		this.background;

		this.isGameOver;
		this.score;

		// GUI sprites
		this.gui;
		this.lives;
		this.livesSprites;
		this.scoreDisplay;
		this.controls;

		// Plugins
		game.plugins.add(new Phaser.Plugin.Flicker());
	}

	_inherits(PlayState, GameState);

	_prototypeProperties(PlayState, null, {
		preload: {
			value: function preload() {
				// [Embed(source = "../../../assets/sounds/music.mp3")] private var music;

				// Free font from http//mfs.sub.jp/font.html
				// [Embed(source = "../../../assets/firewire_black.ttf", fontFamily = "firewire_black", embedAsCFF="false")] private var firewireBlackFont;
				// [Embed(source = "../../../assets/firewire.ttf", fontFamily="firewire", embedAsCFF="false")] private var firewireFont;
				this.game.load.script("abstracFilter", "/js/lib/pixi/abstract-filter.js");
				this.game.load.script("filter", "/js/lib/pixi/color-matrix-filter.js");
			},
			writable: true,
			configurable: true
		},
		create: {
			value: function create() {
				this.events = new ActionChain(this.game);

				// set start game configuration
				this.score = 0;
				this.scoreDisplay;
				this.lives = 3;
				this.isGameOver = false;

				// Create layers in order of Z-index (background layers first)
				this.background = this.game.add.group();
				this.waves = this.game.add.group();

				this.enemies = [];
				this.enemyLayer = this.game.add.group();

				this.enemyBullets = this.game.add.group();
				this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
				this.game.physics.arcade.enable(this.enemyBullets);

				this.playerBullets = this.game.add.group();
				this.playerBullets.physicsBodyType = Phaser.Physics.ARCADE;
				this.game.physics.arcade.enable(this.playerBullets);

				this.player;
				this.playerLayer = this.game.add.group();
				this.powerups = this.game.add.group();
				this.fx = this.game.add.group();
				this.gui = this.game.add.group();
				this.livesSprites = this.game.add.group();

				this.spawnPlayer();
				this.createHud(); // creating the HUD at the end allows it to sit on the top layer

				// Add the FPS overlay
				//var fpsCounter = new FrameRateCounter(4, 200);
				//addStatic(fpsCounter);

				this.enableInput();

				// FlxG.play(music, 1, false);

				this.game.physics.startSystem(Phaser.Physics.ARCADE);
				this.game.debug.font = "8px Courier";
			},
			writable: true,
			configurable: true
		},
		createHud: {

			/**
    * Creates the lives / score display on the top layer of the screen
    * @todo Bullets overlap the HUD but they should appear behind it
    */
			value: function createHud() {
				var offset = 0;

				// creates the "lives" display
				for (var i = 0; i < this.lives; i++) {
					var life = new Phaser.Sprite(this.game, 5 + offset, 5, "player_life");
					this.livesSprites.add(life);
					offset += 18;
				}

				// creates the score display
				this.scoreDisplay = this.createText("00000000", 370, 16, 8, "FirewireBlack", "#FFFFFF", "right");
				this.addStatic(this.scoreDisplay);
			},
			writable: true,
			configurable: true
		},
		addScore: {

			/**
    * Adds a certain number of points to the current score
    * @param	points
    */
			value: function addScore(points) {
				this.score += points;
				this.scoreDisplay.text = Utils.padString(this.score.toString(), 8, 0);
			},
			writable: true,
			configurable: true
		},
		addStatic: {

			/**
    * Adds a sprite to the display list which is not meant to scroll, such as interface 
    * elements, player lives, score, etc...
    * 
    * @param	FlxSprite
    */
			value: function addStatic(sprite) {
				// sprite.scrollFactor.x = 0;
				// sprite.scrollFactor.y = 0;
				this.gui.add(sprite);
			},
			writable: true,
			configurable: true
		},
		update: {

			/**
    * The main update loop. Does collision checks between player and enemies and viceversa.
    */
			value: function update() {
				this.debugText("Num sprites: " + this.game.stage.currentRenderOrderID);
				this.playerInput(this.game.time.elapsed);

				this.events.update();

				// if the game is over, shortcut collissions checks
				if (this.isGameOver) {
					return;
				}

				// // did we pick up a powerup?
				// FlxG.overlap(player, powerups, powerUp);

				this.checkEnemyHit();
				this.checkPlayerHit();
			},
			writable: true,
			configurable: true
		},
		checkEnemyHit: {

			/**
    * Check whether any enemies were hit by the player bullets
    */
			value: function checkEnemyHit() {
				// Were there any enemies hit by player bullets?
				// TODO: refactor to iterator or special kind of group
				var count = this.enemies.length;

				for (var i = 0; i < count; i++) {
					this.game.physics.arcade.overlap(this.playerBullets, this.enemies[i], this.enemyHit, null, this);
				};
			},
			writable: true,
			configurable: true
		},
		checkPlayerHit: {

			/** 
    * Checks whether the player was hit by enemies or their bullets
    */
			value: function checkPlayerHit() {
				if (!this.player.immune && this.player.exists) {
					// Check for enemies that hit the player. The children sprites must be iterated as separate
					// groups, since Arcade.overlap does not do nested collision checks
					for (var i = 0; i < this.enemies.length; i++) {
						this.game.physics.arcade.overlap(this.player, this.enemies[i], this.playerHit, null, this);
					};

					// Did any enemy bullets hit the player?
					this.game.physics.arcade.overlap(this.player, this.enemyBullets, this.playerHit, null, this);
				}
			},
			writable: true,
			configurable: true
		},
		spawnWave: {

			/**
    * Adds a new wave to the game, and passes the enemies and bullets groups to the wave to use.
    * 
    * @param	enemyType Class of the enemy this wave will spawn
    * @param spawnCoords List of coordinates to spawn enemies in
    * @param count Maximum number of enemies to spawn
    * @param delay Amount of time to wait between enemy spawns
    */
			value: function spawnWave(enemyType, spawnCoords, count, delay) {
				// defaults
				delay = typeof delay !== "undefined" ? delay : 0;
				count = typeof count !== "undefined" ? count : 1;

				var wave = this.waves.getFirstExists(false);
				if (!wave) {
					wave = new EnemyWave(this.game, enemyType, spawnCoords, count, delay);
					var playState = this; // create closure
					wave.onSpawnEnemy = function (enemy) {
						playState.onSpawnEnemy(enemy);
					};
					this.waves.add(wave);
				}

				wave.init();
				wave.enemies = this.enemies; // share the enemies group among all waves, for easy collision
				wave.player = this.player;

				// powerups.add(wave.powerups);

				return wave;
			},
			writable: true,
			configurable: true
		},
		onSpawnEnemy: {

			/**
    * Event handler for the wave to trigger when a new enemy is spawned
    */
			value: function onSpawnEnemy(enemy) {
				this.enemies.push(enemy);
				this.enemyLayer.add(enemy);

				// Add sub sprites (children) to enemies collision group
				if (enemy.children) {
					this.enemies.push(enemy.children);
				}

				// Add enemy bullets to play state
				// TODO: refactor, there's gotta be an easier way to recycle bullets...
				var gameBullets = this.enemyBullets;
				if (this.enemyBullets) {
					this.enemyBullets.addMany(enemy.bullets);
				}
				enemy.bullets = gameBullets; // this effectively shares "gameBullets" across all enemies
			},
			writable: true,
			configurable: true
		},
		enemyHit: {

			/**
    * A player bullet hits an enemy
    * @param	bullet
    * @param	enemy
    */
			value: function enemyHit(enemy, bullet) {
				bullet.kill();
				enemy.damage(bullet.power);

				if (!enemy.alive) {
					// the enemy was killed by the bullet
					this.addScore(enemy.score);
				}
			},
			writable: true,
			configurable: true
		},
		playerHit: {

			/**
    * Called whenever enemies, enemy bullets or objects hit the player
    * 
    * @param	player
    * @param	enemy
    */
			value: function playerHit(player, enemy) {
				// This function may be called once the player is already dead.
				// To prevent a "double kill", we check early whether the player
				// is alive first, and return if not
				if (!player.alive) {
					return;
				}

				this.player.kill();

				// update the lives counter in the HUD
				var lostLife = this.livesSprites.children[this.lives - 1];
				lostLife.kill();
				this.lives--;

				var sec = Phaser.Timer.SECOND;
				var self = this;

				if (this.lives > 0) {
					this.game.time.events.add(sec * 2, function () {
						this.spawnPlayer(); // wait 2 seconds before respawn
					}, this);
				} else {
					this.game.time.events.add(sec * 0.6, function () {
						this.gameOver();
					}, this);
				}
			},
			writable: true,
			configurable: true
		},
		playerInput: {

			/**
    * Handle the player input events and control the player sprite accordingly.
    */
			value: function playerInput(elapsed) {
				var keys = this.controls;

				if (!this.isGameOver) {
					// Keys below are only valid when player is alive
					if (!this.player.exists) {
						return false;
					}

					// up & down
					if (keys.up.isDown) {
						this.player.moveUp(elapsed);
					} else if (keys.down.isDown) {
						this.player.moveDown(elapsed);
					} else {
						this.player.stopMovement();
					}

					// left & right
					if (keys.left.isDown) {
						this.player.moveLeft(elapsed);
					} else if (keys.right.isDown) {
						this.player.moveRight(elapsed);
					}

					if (keys.fire.isDown) {
						this.player.fire();
					}

					// if (FlxG.keys.justPressed("C")) {
					// 	player.cycleWeapon();
					// }
				} else {
					// We are in Game Over state
					if (keys.enter.isDown) {
						this.isGameOver = false;
						this.game.state.start("Level1");
						return;
					}
				}
			},
			writable: true,
			configurable: true
		},
		powerUp: {

			/**
    * Called when a powerup is picked up
    * @param	bullet
    * @param	enemy
    */
			value: function powerUp(ship, powerup) {
				// add a little FX to the powerup pickup
				var explosion = new LaserExplosion(powerup.x, powerup.y);
				explosion.velocity = powerup.velocity;
				// add(explosion);
				explosion.explode();

				powerup.kill();
				//powerup.destroy();

				var newWeapon = player.mainWeapon.powerUp();
				if (newWeapon) {
					player.changeWeapon(newWeapon);
				}
			},
			writable: true,
			configurable: true
		},
		spawnPlayer: {

			/**
    * Create the player spaceship and its initial weapons
    */
			value: function spawnPlayer() {
				this.player = new PlayerShip(this.game, 0, 100);
				this.player.flicker(null, 3000);
				this.player.body.velocity.x = 100;

				//var missile1 = new MissileWeapon();
				//missile1.angle = Math.PI; // aim the missiles towards the back
				//player.changeMissileWeapon(missile1);
				//player.changeWeapon(new LaserGun());

				this.playerBullets = this.player.bullets;

				// prevent player from going outside the viewport bounds
				this.player.body.collideWorldBounds = true;
				this.playerLayer.add(this.player);
			},
			writable: true,
			configurable: true
		},
		gameOver: {

			/**
    * Draw the Game Over screen
    */
			value: function gameOver() {
				this.isGameOver = true;

				var left = Math.floor(this.game.width / 2);
				var top = Math.floor(this.game.height / 2);

				// TODO: Text cuts off at the last pixel block
				var txt = this.createText("GAME OVER", -400, top, 24, "Firewire", "#FFFFFF", "center");
				var txt2 = this.createText("GAME OVER", -400, top, 24, "FirewireBlack", "#FF0000", "center");

				this.game.add.tween(txt).to({ x: left }, 200, Phaser.Easing.Linear.None, true, 0, false);
				this.game.add.tween(txt2).to({ x: left }, 200, Phaser.Easing.Linear.None, true, 0, false);

				var moreTxt = this.createText("PRESS ENTER TO RESTART", 500, 200);
				this.game.add.tween(moreTxt).to({ x: left }, 200, Phaser.Easing.Linear.None, true, 0, false);

				// var gradientColors = FlxGradient.createGradientArray(1, 20, [ 0xff0000ff, 0xffff00ff, 0xFFFFFF00, 0xFF00FF00 ], 1);
				// var gradientSprite = FlxGradient.createGradientFlxSprite(100, 100, [0xffff0000, 0xffffff00], 2 );
				// gradientSprite.scrollFactor.x = 0;
				// gradientSprite.scrollFactor.y = 0;
				// gradientSprite.x = 0;
				// gradientSprite.y = 0;
				//var grad = FlxGradient.overlayGradientOnBitmapData(txt.pixels, 50, 50, [0xFFFF0000, 0xFFFFFF00], 100);
				//txt2.pixels = grad;


				//	The final display
				// var maskedGradient = new FlxSprite(100, 100);
				// maskedGradient.scrollFactor = txt2.scrollFactor;
				//add(maskedGradient);

				//FlxDisplay.alphaMask(gradientSprite.pixels, txt.pixels, maskedGradient);
				//FlxGradient.overlayGradientOnBitmapData(this.player.pixels, 100, 100, gradientColors);
			},
			writable: true,
			configurable: true
		},
		doLater: {

			/**
    * Convenience method that wraps Phaser.Timer
    */
			value: function doLater(millis, action, context) {
				var context = context || this;
				this.game.time.events.add(millis, action, context);
			},
			writable: true,
			configurable: true
		},
		debugText: {

			/**
    * Convenience method to hardcode the font color, size and family
    */
			value: function debugText(text) {
				var x = arguments[1] === undefined ? 5 : arguments[1];
				var y = arguments[2] === undefined ? 25 : arguments[2];
				this.game.debug.text(text, x, y, "#0F0", "8px FirewireBlack");
			},
			writable: true,
			configurable: true
		}
	});

	return PlayState;
})(GameState);
exports.__esModule = true;

},{"./actions/action-chain":1,"./enemies/enemy-wave":17,"./game-state":31,"./player-ship":38,"./sliding-background":39,"./utils":40}],38:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * Player spaceship
 */
var GalactronSprite = require("./galactron-sprite").GalactronSprite;
var BlueLaser = require("./fx/blue-laser").BlueLaser;
var Explosion = require("./fx/explosion").Explosion;
var PlayerShip = exports.PlayerShip = (function (GalactronSprite) {
  function PlayerShip(game, x, y) {
    _get(Object.getPrototypeOf(PlayerShip.prototype), "constructor", this).call(this, game, x, y, "player");
    this.x = x;
    this.y = y;

    this.maxSpeed = 150;
    this.shootDelay = 200; // in millis
    this.nextBullet = 0;
    this.bulletSpeed = 500;

    this.animations.add("normal", [0], 1, false);
    this.animations.add("down", [1], 1, false);
    this.animations.add("up", [2], 1, false);
    this.play("normal");

    // Physics
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(27, 18, 2, 4); // tweak the size of the player hit box a tad

    // Create player bullets
    this.bullets = game.add.group();
    this.bullets.classType = BlueLaser;
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    this.bullets.createMultiple(50);
    this.bullets.setAll("checkWorldBounds", true);
    this.bullets.setAll("outOfBoundsKill", true);

    this.sounds.laser = game.add.audio("laser");

    this.explosions = game.add.group();
    this.explosions.classType = Explosion;
    this.explosions.createMultiple(5);

    // Add the engine flame FX
    var flame = new GalactronSprite(game, -12, 0, "player_flame");
    flame.animations.add("burn", [0, 1], 20, true);
    flame.play("burn");
    this.addChild(flame);
  }

  _inherits(PlayerShip, GalactronSprite);

  _prototypeProperties(PlayerShip, null, {
    moveUp: {

      /**
       * Handle movement and animations
       */
      value: function moveUp(elapsed) {
        this.play("up");
        this.body.velocity.y = -this.maxSpeed;
      },
      writable: true,
      configurable: true
    },
    moveDown: {
      value: function moveDown(elapsed) {
        this.play("down");
        this.body.velocity.y = this.maxSpeed;
      },
      writable: true,
      configurable: true
    },
    moveRight: {
      value: function moveRight(elapsed) {
        this.play("right");
        this.body.velocity.x = this.maxSpeed;
      },
      writable: true,
      configurable: true
    },
    moveLeft: {
      value: function moveLeft(elapsed) {
        this.play("left");
        this.body.velocity.x = -this.maxSpeed;
      },
      writable: true,
      configurable: true
    },
    stopMovement: {
      value: function stopMovement() {
        this.play("normal");
        this.body.velocity = {
          x: 0,
          y: 0
        };
      },
      writable: true,
      configurable: true
    },
    deathAnimation: {

      /**
       * Custom death animation (explosion)
       */
      value: function deathAnimation() {
        var explosion = this.explosions.getFirstDead();
        explosion.reset(); // spawn explosion in the middle of the enemy sprite
        explosion.centerAt(this);
        explosion.explode();
      },
      writable: true,
      configurable: true
    },
    fire: {

      /**
       * If enough time has ellapsed since the last shot was fired, create a
       * new bullet and fire again
       */
      value: function fire() {
        if (this.game.time.now > this.nextBullet && this.bullets.countDead() > 0) {
          this.nextBullet = this.game.time.now + this.shootDelay;
          var bullet = this.bullets.getFirstDead();
          bullet.reset(this.x + 32, this.y + 14); // spawn coords of bullet relative to player
          bullet.body.velocity.x = this.bulletSpeed;

          this.sounds.laser.play();
        }
      },
      writable: true,
      configurable: true
    },
    update: {

      /**
       * Rounds the x,y position of the Physics body. This is done to avoid subpixel rendering artifacts,
       * caused by rendering sprites at 2x zoom (retro effect).
       *
       * @TODO: Move to GalactronSprite
       */
      value: function update() {
        _get(Object.getPrototypeOf(PlayerShip.prototype), "update", this).call(this);
        this.body.position.x = Math.round(this.body.position.x);
        this.body.position.y = Math.round(this.body.position.y);
      },
      writable: true,
      configurable: true
    }
  });

  return PlayerShip;
})(GalactronSprite);
exports.__esModule = true;

},{"./fx/blue-laser":26,"./fx/explosion":28,"./galactron-sprite":29}],39:[function(require,module,exports){
"use strict";

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * A sliding background is a regular sprite which has physics automatically 
 * enabled and moves at a constant horizontal velocity.
 */
var GalactronSprite = require("./galactron-sprite").GalactronSprite;
var SlidingBackground = exports.SlidingBackground = (function (GalactronSprite) {
	function SlidingBackground(game, _x, _x2, graphic, speed) {
		var x = arguments[1] === undefined ? 0 : arguments[1];
		var y = arguments[2] === undefined ? 0 : arguments[2];
		_get(Object.getPrototypeOf(SlidingBackground.prototype), "constructor", this).call(this, game, x, y, graphic);
		this.game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.velocity.x = speed;
	}

	_inherits(SlidingBackground, GalactronSprite);

	return SlidingBackground;
})(GalactronSprite);
exports.__esModule = true;

},{"./galactron-sprite":29}],40:[function(require,module,exports){
"use strict";

/**
*
*  Javascript string pad
*  http://www.webtoolkit.info/
*
**/

var STR_PAD_LEFT = 1;
var STR_PAD_RIGHT = 2;
var STR_PAD_BOTH = 3;

var Utils = Utils || {};

Utils.padString = function (str, len, pad, dir) {
    if (typeof len == "undefined") {
        var len = 0;
    }
    if (typeof pad == "undefined") {
        var pad = " ";
    }
    if (typeof dir == "undefined") {
        var dir = STR_PAD_LEFT;
    }

    if (len + 1 >= str.length) {
        switch (dir) {

            case STR_PAD_LEFT:
                str = Array(len + 1 - str.length).join(pad) + str;
                break;

            case STR_PAD_BOTH:
                var right = Math.ceil((padlen = len - str.length) / 2);
                var left = padlen - right;
                str = Array(left + 1).join(pad) + str + Array(right + 1).join(pad);
                break;

            default:
                str = str + Array(len + 1 - str.length).join(pad);
                break;

        } // switch
    }

    return str;
};

exports.Utils = Utils;
exports.__esModule = true;

},{}]},{},[30]);
