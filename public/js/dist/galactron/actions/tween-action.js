"use strict";
var __moduleName = "public/js/dist/galactron/actions/tween-action";
var TweenAction = function TweenAction(target, properties, time) {
  var transition = arguments[3] !== (void 0) ? arguments[3] : null;
  $traceurRuntime.superCall(this, $TweenAction.prototype, "constructor", [target]);
  this.time = time;
  this.transition = transition;
  this.properties = properties;
};
var $TweenAction = TweenAction;
($traceurRuntime.createClass)(TweenAction, {start: function() {
    $traceurRuntime.superCall(this, $TweenAction.prototype, "start", []);
    this.tween = this.target.game.add.tween(this.target);
    this.tween.to(this.properties, this.time, this.transition);
    this.tween.onComplete.add(this.finish, this);
    this.tween.start();
  }}, {}, Action);

//# sourceMappingURL=tween-action.js.map
