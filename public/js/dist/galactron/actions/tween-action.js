"use strict";
var __moduleName = "public/js/dist/galactron/actions/tween-action";
var TweenAction = function TweenAction() {
  $traceurRuntime.defaultSuperCall(this, $TweenAction.prototype, arguments);
};
var $TweenAction = TweenAction;
($traceurRuntime.createClass)(TweenAction, {
  TweenAction: function(target, properties, time) {
    var transition = arguments[3] !== (void 0) ? arguments[3] : null;
    $traceurRuntime.superCall(this, $TweenAction.prototype, "TweenAction", [target]);
    if (transition == null) {
      transition = Equations.easeNone;
    }
    properties['time'] = time;
    properties['transition'] = transition;
    properties['onComplete'] = this.finish;
    properties['rounded'] = true;
    this.properties = properties;
  },
  init: function() {
    $traceurRuntime.superCall(this, $TweenAction.prototype, "init", []);
    Tweener.removeTweens(target);
  },
  start: function() {
    $traceurRuntime.superCall(this, $TweenAction.prototype, "start", []);
    Tweener.addTween(target, properties);
  }
}, {}, Action);

//# sourceMappingURL=tween-action.js.map
