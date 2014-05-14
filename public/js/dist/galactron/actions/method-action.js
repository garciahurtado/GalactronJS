"use strict";
var __moduleName = "public/js/dist/galactron/actions/method-action";
var MethodAction = function MethodAction(method) {
  var target = arguments[1] !== (void 0) ? arguments[1] : null;
  var params = arguments[2] !== (void 0) ? arguments[2] : null;
  $traceurRuntime.superCall(this, $MethodAction.prototype, "constructor", []);
  this.method = method;
  this.params = params;
};
var $MethodAction = MethodAction;
($traceurRuntime.createClass)(MethodAction, {start: function() {
    $traceurRuntime.superCall(this, $MethodAction.prototype, "start", []);
    this.method.apply(this.target, this.params);
    this.finish();
  }}, {}, Action);

//# sourceMappingURL=method-action.js.map
