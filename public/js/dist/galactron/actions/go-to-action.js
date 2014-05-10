"use strict";
var __moduleName = "public/js/dist/galactron/actions/go-to-action";
var GoToAction = function GoToAction() {
  $traceurRuntime.defaultSuperCall(this, $GoToAction.prototype, arguments);
};
var $GoToAction = GoToAction;
($traceurRuntime.createClass)(GoToAction, {
  GoToAction: function(actionName) {
    var loop = arguments[1] !== (void 0) ? arguments[1] : 0;
    $traceurRuntime.superCall(this, $GoToAction.prototype, "GoToAction", []);
    this.loop = loop;
    this.loopCounter = loop;
    this.actionName = actionName;
  },
  start: function() {
    if (loop) {
      if (--loopCounter > 0) {
        this.target.actions.switchTo(actionName);
      } else {
        finish();
      }
    } else {
      this.target.actions.switchTo(actionName);
    }
  }
}, {}, Action);

//# sourceMappingURL=go-to-action.js.map
