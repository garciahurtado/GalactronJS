"use strict";
var __moduleName = "public/js/dist/galactron/actions/stop-motion-action";
var StopMotionAction = function StopMotionAction() {
  $traceurRuntime.defaultSuperCall(this, $StopMotionAction.prototype, arguments);
};
var $StopMotionAction = StopMotionAction;
($traceurRuntime.createClass)(StopMotionAction, {
  StopMotionAction: function() {
    $traceurRuntime.superCall(this, $StopMotionAction.prototype, "StopMotionAction", []);
  },
  start: function() {
    target.velocity.x = 0;
    target.velocity.y = 0;
    finish();
  }
}, {}, Action);

//# sourceMappingURL=stop-motion-action.js.map
