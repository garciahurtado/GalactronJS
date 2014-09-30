"use strict";
var __moduleName = "public/js/dist/galactron/actions/action-chain";
var ActionChain = function ActionChain(game) {
  var target = arguments[1] !== (void 0) ? arguments[1] : null;
  $traceurRuntime.superCall(this, $ActionChain.prototype, "constructor", [target]);
  this.game = game;
  this.actions = new Array();
  this.actionRegistry = new Array();
  this.running = false;
};
var $ActionChain = ActionChain;
($traceurRuntime.createClass)(ActionChain, {
  start: function() {
    $traceurRuntime.superCall(this, $ActionChain.prototype, "start", []);
    if (this.actions[0]) {
      this.actions[0].start();
    }
  },
  add: function(newAction, name) {
    if (!newAction.target && this.target) {
      newAction.target = this.target;
    }
    newAction.game = this.game;
    newAction.chain = this;
    this.actions.push(newAction);
    if (name) {
      this.actionRegistry[name] = newAction;
    }
    return this;
  },
  then: function(newAction) {
    var name = arguments[1] !== (void 0) ? arguments[1] : null;
    if (typeof(newAction) == 'function') {
      newAction = new MethodAction(newAction);
    }
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
    return this;
  },
  wait: function(seconds) {
    this.then(new WaitAction(seconds));
    return this;
  },
  loop: function() {
    var times = arguments[0] !== (void 0) ? arguments[0] : 0;
    this.then(new LoopAction(times));
    return this;
  },
  goTo: function(label) {
    var times = arguments[1] !== (void 0) ? arguments[1] : 0;
    this.then(new GoToAction(label, times));
    return this;
  },
  update: function() {
    if (this.running) {
      for (var i = 0; i < this.actions.length; i++) {
        if (this.actions[i].running) {
          this.actions[i].update();
        }
      }
      ;
    }
  },
  stopAll: function() {
    for (var i = 0; i < this.actions.length; i++) {
      this.actions[i].stop();
    }
    ;
    this.running = false;
  },
  switchTo: function(actionName) {
    this.stopAll();
    this.actionRegistry[actionName].start();
    this.running = true;
  },
  reset: function() {
    this.running = false;
    this.actions.forEach(function(action) {
      action.init();
    }, this);
  },
  restart: function() {
    this.reset();
    this.start();
  },
  getAction: function(actionName) {
    if (this.actionRegistry[actionName] != null) {
      return this.actionRegistry[actionName];
    } else {
      throw new Error("There is no action named " + actionName);
    }
  }
}, {}, Action);

//# sourceMappingURL=action-chain.js.map
