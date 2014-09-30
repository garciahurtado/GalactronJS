"use strict";
var __moduleName = "public/js/dist/galactron/enemies/alien1";
var Alien1 = function Alien1(game, x, y) {
  $traceurRuntime.superCall(this, $Alien1.prototype, "constructor", [game, x, y]);
  var Circle = CircleMotionAction;
  this.actions.then(function() {
    this.body.velocity.x = -50;
  }).wait(2).then(new Circle(1, 1, Circle.COUNTERCLOCKWISE)).wait(1.5).then(new Circle(1, 1.5, Circle.CLOCKWISE)).then(new StopMotionAction()).then(function() {
    this.body.velocity = {
      x: 0,
      y: 70
    };
  }).wait(0.2).then(new WaveMotionAction(this, 1, 5));
};
var $Alien1 = Alien1;
($traceurRuntime.createClass)(Alien1, {}, {}, Alien);

//# sourceMappingURL=alien1.js.map
