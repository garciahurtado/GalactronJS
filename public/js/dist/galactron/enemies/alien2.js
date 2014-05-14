"use strict";
var __moduleName = "public/js/dist/galactron/enemies/alien2";
var Alien2 = function Alien2(game, x, y) {
  $traceurRuntime.superCall(this, $Alien2.prototype, "constructor", [game, x, y]);
};
var $Alien2 = Alien2;
($traceurRuntime.createClass)(Alien2, {init: function() {
    $traceurRuntime.superCall(this, $Alien2.prototype, "init", []);
    this.body.velocity.x = -50;
    this.body.velocity.y = 0;
    this.actions.addAction(new WaveMotionAction(this, 1, 3));
    this.actions.start();
  }}, {}, Alien);

//# sourceMappingURL=alien2.js.map
