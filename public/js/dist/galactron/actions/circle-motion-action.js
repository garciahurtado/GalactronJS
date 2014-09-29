"use strict";
var __moduleName = "public/js/dist/galactron/actions/circle-motion-action";
var CircleMotionAction = function CircleMotionAction(speed) {
  var circles = arguments[1] !== (void 0) ? arguments[1] : 0;
  var direction = arguments[2] !== (void 0) ? arguments[2] : 1;
  $traceurRuntime.superCall(this, $CircleMotionAction.prototype, "constructor", []);
  this.speed = speed;
  this.circles = circles;
  this.direction = direction;
  this.TWO_PI = 2 * Math.PI;
  this.init();
};
var $CircleMotionAction = CircleMotionAction;
($traceurRuntime.createClass)(CircleMotionAction, {
  init: function() {
    this.angle = 0;
    this.baseVelocity = {
      x: 0,
      y: 0
    };
  },
  start: function() {
    $traceurRuntime.superCall(this, $CircleMotionAction.prototype, "start", []);
    if (this.target) {
      this.baseVelocity = {
        x: this.target.body.velocity.x,
        y: this.target.body.velocity.y
      };
    }
  },
  update: function() {
    var elapsed = this.game.time.elapsed / 1000;
    if (this.direction == $CircleMotionAction.CLOCKWISE) {
      this.angle -= (elapsed * this.speed);
    } else {
      this.angle += (elapsed * this.speed);
    }
    var base = this.baseVelocity;
    var angle = this.angle;
    this.target.body.velocity.x = (base.x * Math.cos(angle)) - (base.y * Math.sin(angle));
    this.target.body.velocity.y = (base.y * Math.cos(angle)) - (base.x * Math.sin(angle));
    if (this.circles) {
      if ((Math.abs(angle) / this.TWO_PI) > this.circles) {
        this.angle = this.circles * this.TWO_PI;
        this.finish();
      }
    }
  }
}, {}, Action);
CircleMotionAction.CLOCKWISE = 1;
CircleMotionAction.COUNTERCLOCKWISE = 2;

//# sourceMappingURL=circle-motion-action.js.map
