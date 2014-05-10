"use strict";
var __moduleName = "public/js/dist/galactron/actions/method-action";
var MethodAction = function MethodAction() {
  $traceurRuntime.defaultSuperCall(this, $MethodAction.prototype, arguments);
};
var $MethodAction = MethodAction;
($traceurRuntime.createClass)(MethodAction, {
  MethodAction: function(method) {
    var target = arguments[1] !== (void 0) ? arguments[1] : null;
    var params = arguments[2] !== (void 0) ? arguments[2] : null;
    $traceurRuntime.superCall(this, $MethodAction.prototype, "MethodAction", []);
    this.method = method;
    this.params = params;
  },
  start: function() {
    $traceurRuntime.superCall(this, $MethodAction.prototype, "start", []);
    method.apply(this.target, params);
    finish();
  }
}, {}, Action);

//# sourceMappingURL=method-action.js.map
