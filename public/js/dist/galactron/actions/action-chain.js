"use strict";
var __moduleName = "public/js/dist/galactron/actions/action-chain";
var ActionChain = function ActionChain(target) {
  $traceurRuntime.superCall(this, $ActionChain.prototype, "constructor", [target]);
  this.actions = new Array();
  this.actionRegistry = new Array();
  this.running = false;
};
var $ActionChain = ActionChain;
($traceurRuntime.createClass)(ActionChain, {
  init: function() {
    $traceurRuntime.superCall(this, $ActionChain.prototype, "init", []);
  },
  chainAction: function(newAction, name) {
    name = name || null;
    if (this.actions.length > 0) {
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
  },
  addAction: function(newAction, name) {
    if (!newAction.target && this.target) {
      newAction.target = this.target;
    }
    this.actions.push(newAction);
    if (name) {
      this.actionRegistry[name] = newAction;
    }
    return this;
  },
  start: function() {
    this.reset();
    if (this.actions[0]) {
      this.actions[0].start();
      this.running = true;
    }
  },
  update: function() {
    if (!this.running) {
      return;
    } else {
      for (var action in this.actions) {
        if (action.running) {
          action.update();
        }
      }
    }
  },
  stopAll: function() {
    for (var action in this.actions) {
      action.stop();
    }
    this.running = false;
  },
  switchTo: function(actionName) {
    stopAll();
    this.actionRegistry[actionName].start();
    this.running = true;
  },
  reset: function() {
    this.running = false;
    for (var index in this.actions) {
      var action = this.actions[index];
      action.init();
    }
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
