"use strict";
var __moduleName = "public/js/dist/galactron/actions/animation-action";
var AnimationAction = function AnimationAction(animationName) {
  var wait = arguments[1] !== (void 0) ? arguments[1] : true;
  $traceurRuntime.superCall(this, $AnimationAction.prototype, "constructor", []);
  this.animationName = animationName;
  this.wait = wait;
};
var $AnimationAction = AnimationAction;
($traceurRuntime.createClass)(AnimationAction, {
  start: function() {
    $traceurRuntime.superCall(this, $AnimationAction.prototype, "start", []);
    target.play(animationName);
    if (wait) {
      target.addAnimationCallback(checkFinished);
    } else {
      finish();
    }
  },
  checkFinished: function(currentAnimationName, currentFrame, currentFrameIndex) {
    if (!running || finished) {
      return;
    }
    if (currentAnimationName == animationName) {
      currentAnimation = target.getCurrentAnimation();
      if (currentFrame == (currentAnimation.frames.length - 1)) {
        this.finish();
        finished = true;
      }
    }
  }
}, {}, Action);

//# sourceMappingURL=animation-action.js.map
