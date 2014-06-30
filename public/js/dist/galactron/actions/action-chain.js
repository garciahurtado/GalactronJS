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
  init: function() {
    $traceurRuntime.superCall(this, $ActionChain.prototype, "init", []);
  },
  chainAction: function(newAction, name) {
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
    newAction.game = this.game;
    newAction.chain = this;
    this.actions.push(newAction);
    if (name) {
      this.actionRegistry[name] = newAction;
    }
    return this;
  },
  start: function() {
    this.reset();
    this.running = true;
    if (this.actions[0]) {
      this.actions[0].start();
    }
  },
  update: function() {
    if (this.running) {
      for (var index in this.actions) {
        var action = this.actions[index];
        if (action.running) {
          action.update();
        }
      }
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
  getAction: function(actionName) {
    if (this.actionRegistry[actionName] != null) {
      return this.actionRegistry[actionName];
    } else {
      throw new Error("There is no action named " + actionName);
    }
  }
}, {}, Action);

//# sourceMappingURL=action-chain.js.map
