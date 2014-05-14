"use strict";
var __moduleName = "public/js/dist/galactron/actions/property-action";
var PropertyAction = function PropertyAction(target, properties) {
  $traceurRuntime.superCall(this, $PropertyAction.prototype, "constructor", [target]);
  this.target = target;
  this.properties = properties;
};
var $PropertyAction = PropertyAction;
($traceurRuntime.createClass)(PropertyAction, {start: function() {
    $traceurRuntime.superCall(this, $PropertyAction.prototype, "start", []);
    for (var name in properties) {
      this.target[name] = properties[name];
    }
    finish();
  }}, {}, Action);

//# sourceMappingURL=property-action.js.map
