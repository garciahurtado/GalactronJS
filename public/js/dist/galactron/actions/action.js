"use strict";
var __moduleName = "public/js/dist/galactron/actions/action";
var Action = function Action() {
  var target = arguments[0] !== (void 0) ? arguments[0] : null;
  $traceurRuntime.superCall(this, $Action.prototype, "constructor", []);
  this.target = target;
  this.chain;
  this.visible = false;
  this.running = false;
  this.finished;
  this.finishHandler;
  this.init();
};
var $Action = Action;
($traceurRuntime.createClass)(Action, {
  init: function() {},
  update: function() {
    if (this.running) {} else {
      return false;
    }
  },
  start: function() {
    this.finished = false;
    this.running = true;
  },
  stop: function() {
    this.running = false;
  },
  finish: function() {
    this.finished = true;
    this.running = false;
    if (this.finishHandler != null) {
      this.finishHandler();
    }
    this.init();
  },
  onFinish: function(handler) {
    this.finishHandler = handler;
  }
}, {}, Phaser.Sprite);

//# sourceMappingURL=action.js.map
