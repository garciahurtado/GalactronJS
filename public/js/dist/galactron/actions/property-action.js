"use strict";
var __moduleName = "public/js/dist/galactron/actions/property-action";
var PropertyAction = function PropertyAction() {
  $traceurRuntime.defaultSuperCall(this, $PropertyAction.prototype, arguments);
};
var $PropertyAction = PropertyAction;
($traceurRuntime.createClass)(PropertyAction, {
  PropertyAction: function(target, properties) {
    $traceurRuntime.superCall(this, $PropertyAction.prototype, "PropertyAction", [target]);
    this.target = target;
    this.properties = properties;
  },
  start: function() {
    $traceurRuntime.superCall(this, $PropertyAction.prototype, "start", []);
    for (var name in properties) {
      this.target[name] = properties[name];
    }
    finish();
  }
}, {}, Action);

//# sourceMappingURL=property-action.js.map
