"use strict";
var __moduleName = "public/js/dist/galactron/actions/follow-action";
var FollowAction = function FollowAction() {
  $traceurRuntime.defaultSuperCall(this, $FollowAction.prototype, arguments);
};
var $FollowAction = FollowAction;
($traceurRuntime.createClass)(FollowAction, {
  FollowAction: function(target, followed) {
    var minDist = arguments[2] !== (void 0) ? arguments[2] : 0;
    var maxDist = arguments[3] !== (void 0) ? arguments[3] : 0;
    this.target = target;
    this.followed = followed;
  },
  update: function() {
    if (followElapsed < followDelay) {
      followElapsed += FlxG.elapsed;
      return;
    }
    myTarget = target;
    if (myTarget.distanceTo(followed) < minDist) {} else {}
    angleToTarget = target.angleTo(followed);
    maxTurn = target.maxAngular * FlxG.elapsed;
    if (maxTurn > angleToTarget) {
      target.turn(angleToTarget);
    } else {
      target.turn(maxTurn);
    }
    followElapsed = 0;
    return;
  },
  turnTarget: function() {
    angleToTarget = target.angleTo(followed);
    angleToTarget = angleToTarget % (2 * Math.PI);
    if (Math.abs(turnAngle) < 0.1) {
      return;
    }
    if (angleToTarget > Math.PI) {} else if (angleToTarget < -Math.PI) {}
    if (turnAngle > Math.abs(angleToTarget)) {
      turnAngle = Math.abs(angleToTarget);
    }
    if (target.facingAngle > angleToTarget) {
      FlxG.log("facing angle > target");
      target.turn(target.facingAngle - turnAngle);
    } else {
      FlxG.log("facing angle < target");
      target.turn(target.facingAngle + turnAngle);
    }
  }
}, {}, Action);

//# sourceMappingURL=follow-action.js.map
