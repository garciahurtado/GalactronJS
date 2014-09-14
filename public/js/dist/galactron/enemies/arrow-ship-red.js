"use strict";
var __moduleName = "public/js/dist/galactron/enemies/arrow-ship-red";
var ArrowShipRed = function ArrowShipRed(game, x, y) {
  $traceurRuntime.superCall(this, $ArrowShipRed.prototype, "constructor", [game, x, y, 'arrow_ship_red']);
  this.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 12);
};
var $ArrowShipRed = ArrowShipRed;
($traceurRuntime.createClass)(ArrowShipRed, {init: function() {
    $traceurRuntime.superCall(this, $ArrowShipRed.prototype, "init", []);
    this.play('spin');
  }}, {}, ArrowShip);

//# sourceMappingURL=arrow-ship-red.js.map
