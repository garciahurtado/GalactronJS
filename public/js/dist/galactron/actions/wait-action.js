"use strict";
var __moduleName = "public/js/dist/galactron/actions/wait-action";
var WaitAction = function WaitAction() {
  var timeout = arguments[0] !== (void 0) ? arguments[0] : 0;
  $traceurRuntime.superCall(this, $WaitAction.prototype, "constructor", []);
  this.timeout = timeout;
};
var $WaitAction = WaitAction;
($traceurRuntime.createClass)(WaitAction, {
  start: function() {
    $traceurRuntime.superCall(this, $WaitAction.prototype, "start", []);
    this.timer = 0;
  },
  update: function() {
    this.timer += this.game.time.elapsed / 1000;
    if (this.timer > this.timeout) {
      this.finish();
    }
  }
}, {}, Action);

//# sourceMappingURL=wait-action.js.map
