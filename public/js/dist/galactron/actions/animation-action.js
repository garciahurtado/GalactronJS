"use strict";
var __moduleName = "public/js/dist/galactron/actions/animation-action";
var AnimationAction = function AnimationAction(animationName) {
  var wait = arguments[1] !== (void 0) ? arguments[1] : true;
  $traceurRuntime.superCall(this, $AnimationAction.prototype, "constructor", []);
  this.animationName = animationName;
  this.wait = wait;
};
var $AnimationAction = AnimationAction;
($traceurRuntime.createClass)(AnimationAction, {start: function() {
    $traceurRuntime.superCall(this, $AnimationAction.prototype, "start", []);
    this.anim = this.target.animations.getAnimation(this.animationName);
    if (!this.anim) {
      console.log('Unable to find animation named ' + this.animationName + ' in target');
      return;
    }
    this.target.animations.play(this.animationName);
    if (this.wait) {
      this.anim.onComplete.add(function() {
        this.finish();
        console.log('Animation finished');
      }, this);
    } else {
      this.finish();
    }
  }}, {}, Action);

//# sourceMappingURL=animation-action.js.map
