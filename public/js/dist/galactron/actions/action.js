"use strict";
var __moduleName = "public/js/dist/galactron/actions/action";
var Action = function Action() {
  var target = arguments[0] !== (void 0) ? arguments[0] : null;
  this.target = target;
  this.running;
  this.finished;
  this.finishHandler;
};
($traceurRuntime.createClass)(Action, {
  init: function() {
    this.running = false;
    this.finished = false;
  },
  update: function() {},
  start: function() {
    this.running = true;
    this.finished = false;
  },
  stop: function() {
    this.running = false;
    this.finished = true;
  },
  finish: function() {
    this.stop();
    if (this.finishHandler != null) {
      this.finishHandler();
    }
    this.init();
  },
  onFinish: function(handler) {
    this.finishHandler = handler;
  }
}, {});

//# sourceMappingURL=action.js.map
