"use strict";
var __moduleName = "public/js/dist/galactron/actions/wave-motion-action";
var WaveMotionAction = function WaveMotionAction(target, amplitude, speed) {
  var repeat = arguments[3] !== (void 0) ? arguments[3] : 0;
  $traceurRuntime.superCall(this, $WaveMotionAction.prototype, "constructor", [target]);
  this.amplitude = amplitude;
  this.amplitudeX = this.amplitudeY = 0;
  this.speed = speed;
  this.repeat = repeat;
  this.currentAngle = 0;
};
var $WaveMotionAction = WaveMotionAction;
($traceurRuntime.createClass)(WaveMotionAction, {
  start: function() {
    $traceurRuntime.superCall(this, $WaveMotionAction.prototype, "start", []);
    this.currentAngle = 0;
    this.baseVelocity = {
      x: this.target.body.velocity.x,
      y: this.target.body.velocity.y
    };
    this.amplitudeX = this.baseVelocity.x * this.amplitude;
    this.amplitudeY = this.baseVelocity.y * this.amplitude;
  },
  update: function() {
    var TWO_PI = 2 * Math.PI;
    this.currentAngle += ((this.game.time.elapsed / 1000) * this.speed);
    var base = this.baseVelocity;
    var angle = this.currentAngle;
    this.target.body.velocity.y = (Math.sin(angle) * this.amplitudeX) + base.y;
    this.target.body.velocity.x = (Math.cos(angle) * this.amplitudeY) + base.x;
    if (this.repeat) {
      if ((this.currentAngle / (TWO_PI)) > this.repeat) {
        finish();
      }
    }
  },
  finish: function() {
    $traceurRuntime.superCall(this, $WaveMotionAction.prototype, "finish", []);
    this.target.body.velocity = baseVelocity;
  }
}, {}, Action);

//# sourceMappingURL=wave-motion-action.js.map
