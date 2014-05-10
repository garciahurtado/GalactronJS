"use strict";
var __moduleName = "public/js/dist/galactron/actions/wave-motion-action";
var WaveMotionAction = function WaveMotionAction() {
  $traceurRuntime.defaultSuperCall(this, $WaveMotionAction.prototype, arguments);
};
var $WaveMotionAction = WaveMotionAction;
($traceurRuntime.createClass)(WaveMotionAction, {
  WaveMotionAction: function(target, amplitude, speed) {
    var repeat = arguments[3] !== (void 0) ? arguments[3] : 0;
    $traceurRuntime.superCall(this, $WaveMotionAction.prototype, "WaveMotionAction", [target]);
    this.amplitude = amplitude;
    this.speed = speed;
    this.repeat = repeat;
    this.TWO_PI = 2 * Math.PI;
  },
  start: function() {
    $traceurRuntime.superCall(this, $WaveMotionAction.prototype, "start", []);
    currentAngle = 0;
    baseVelocity = new FlxPoint;
    baseVelocity.x = target.velocity.x;
    baseVelocity.y = target.velocity.y;
    amplitudeX = baseVelocity.x * amplitude;
    amplitudeY = baseVelocity.y * amplitude;
  },
  update: function() {
    $traceurRuntime.superCall(this, $WaveMotionAction.prototype, "update", []);
    currentAngle += (FlxG.elapsed * speed);
    this.target.velocity.y = (Math.sin(currentAngle) * amplitudeX) + baseVelocity.y;
    this.target.velocity.x = (Math.cos(currentAngle) * amplitudeY) + baseVelocity.x;
    if (repeat) {
      if ((currentAngle / (TWO_PI)) > repeat) {
        finish();
      }
    }
  },
  finish: function() {
    $traceurRuntime.superCall(this, $WaveMotionAction.prototype, "finish", []);
    target.velocity = baseVelocity;
  }
}, {}, Action);

//# sourceMappingURL=wave-motion-action.js.map
