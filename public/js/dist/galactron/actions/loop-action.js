"use strict";
var __moduleName = "public/js/dist/galactron/actions/loop-action";
var LoopAction = function LoopAction(limit) {
  var label = arguments[1] !== (void 0) ? arguments[1] : null;
  $traceurRuntime.superCall(this, $LoopAction.prototype, "constructor", []);
  this.limit = limit;
  this.loops = 0;
  this.label = label;
};
var $LoopAction = LoopAction;
($traceurRuntime.createClass)(LoopAction, {start: function() {
    if (this.limit != 0) {
      if (this.loops++ >= this.limit) {
        this.finish();
        return;
      }
    }
    this.target.actions.start();
  }}, {}, Action);

//# sourceMappingURL=loop-action.js.map
