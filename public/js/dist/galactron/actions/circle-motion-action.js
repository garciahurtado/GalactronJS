"use strict";
var __moduleName = "public/js/dist/galactron/actions/circle-motion-action";
var CircleMotionAction = function CircleMotionAction() {
  $traceurRuntime.defaultSuperCall(this, $CircleMotionAction.prototype, arguments);
};
var $CircleMotionAction = CircleMotionAction;
($traceurRuntime.createClass)(CircleMotionAction, {
  CircleMotionAction: function(speed) {
    var repeat = arguments[1] !== (void 0) ? arguments[1] : 0;
    var direction = arguments[2] !== (void 0) ? arguments[2] : $CircleMotionAction.CLOCKWISE;
    $traceurRuntime.superCall(this, $CircleMotionAction.prototype, "CircleMotionAction", []);
    this.speed = speed;
    this.repeat = repeat;
    this.direction = direction;
    this.angle = 0;
    this.TWO_PI = 2 * Math.PI;
  },
  start: function() {
    $traceurRuntime.superCall(this, $CircleMotionAction.prototype, "start", []);
    baseVelocity = new FlxPoint;
    baseVelocity.x = target.velocity.x;
    baseVelocity.y = target.velocity.y;
  },
  update: function() {
    $traceurRuntime.superCall(this, $CircleMotionAction.prototype, "update", []);
    if (direction == $CircleMotionAction.CLOCKWISE) {
      angle -= (FlxG.elapsed * speed);
    } else {
      angle += (FlxG.elapsed * speed);
    }
    this.target.velocity.x = (baseVelocity.x * Math.cos(angle)) - (baseVelocity.y * Math.sin(angle));
    this.target.velocity.y = (baseVelocity.y * Math.cos(angle)) - (baseVelocity.x * Math.sin(angle));
    if (repeat) {
      if ((Math.abs(angle) / (TWO_PI)) > repeat) {
        finish();
      }
    }
  }
}, {}, Action);

//# sourceMappingURL=circle-motion-action.js.map
