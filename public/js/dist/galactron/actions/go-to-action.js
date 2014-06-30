"use strict";
var __moduleName = "public/js/dist/galactron/actions/go-to-action";
var GoToAction = function GoToAction(actionName) {
  var loop = arguments[1] !== (void 0) ? arguments[1] : 0;
  $traceurRuntime.superCall(this, $GoToAction.prototype, "constructor", []);
  this.loop = loop;
  this.loopCounter = loop;
  this.actionName = actionName;
};
var $GoToAction = GoToAction;
($traceurRuntime.createClass)(GoToAction, {start: function() {
    if (this.loop) {
      if (--this.loopCounter > 0) {
        this.target.actions.switchTo(this.actionName);
      } else {
        this.finish();
      }
    } else {
      this.target.actions.switchTo(this.actionName);
    }
  }}, {}, Action);

//# sourceMappingURL=go-to-action.js.map
