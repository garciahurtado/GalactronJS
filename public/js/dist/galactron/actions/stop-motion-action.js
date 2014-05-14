"use strict";
var __moduleName = "public/js/dist/galactron/actions/stop-motion-action";
var StopMotionAction = function StopMotionAction() {
  $traceurRuntime.superCall(this, $StopMotionAction.prototype, "constructor", []);
};
var $StopMotionAction = StopMotionAction;
($traceurRuntime.createClass)(StopMotionAction, {start: function() {
    this.target.body.velocity.x = 0;
    this.target.body.velocity.y = 0;
    this.finish();
  }}, {}, Action);

//# sourceMappingURL=stop-motion-action.js.map
