"use strict";
var __moduleName = "public/js/dist/galactron/actions/wait-action";
var WaitAction = function WaitAction() {
  $traceurRuntime.defaultSuperCall(this, $WaitAction.prototype, arguments);
};
var $WaitAction = WaitAction;
($traceurRuntime.createClass)(WaitAction, {
  WaitAction: function() {
    var timeout = arguments[0] !== (void 0) ? arguments[0] : 0;
    $traceurRuntime.superCall(this, $WaitAction.prototype, "WaitAction", []);
    this.timeout = timeout;
  },
  init: function() {
    $traceurRuntime.superCall(this, $WaitAction.prototype, "init", []);
    this.timer = 0;
  },
  start: function() {
    $traceurRuntime.superCall(this, $WaitAction.prototype, "start", []);
  },
  update: function() {
    timer += FlxG.elapsed;
    if (timer > timeout) {
      finish();
    }
  }
}, {}, Action);

//# sourceMappingURL=wait-action.js.map
