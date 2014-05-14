"use strict";
var __moduleName = "public/js/dist/galactron/enemies/alien1";
var Alien1 = function Alien1(game, x, y) {
  $traceurRuntime.superCall(this, $Alien1.prototype, "constructor", [game, x, y]);
};
var $Alien1 = Alien1;
($traceurRuntime.createClass)(Alien1, {init: function() {
    $traceurRuntime.superCall(this, $Alien1.prototype, "init", []);
    this.body.velocity.x = -50;
    this.actions.addAction(new WaitAction(2)).chainAction(new CircleMotionAction(1, 1, CircleMotionAction.CLOCKWISE)).chainAction(new MethodAction(function() {
      this.body.velocity.y = 0;
    })).chainAction(new WaitAction(2)).chainAction(new CircleMotionAction(1, 1.5, CircleMotionAction.COUNTERCLOCKWISE)).chainAction(new StopMotionAction()).chainAction(new MethodAction(function() {
      this.body.velocity.y = 70;
      this.body.velocity.x = 0;
    })).chainAction(new WaitAction(0.2)).chainAction(new WaveMotionAction(this, 1, 5));
    ;
  }}, {}, Alien);

//# sourceMappingURL=alien1.js.map
