"use strict";
var __moduleName = "public/js/dist/galactron/enemies/arrow-ship-green";
var ArrowShipGreen = function ArrowShipGreen(game, x, y) {
  $traceurRuntime.superCall(this, $ArrowShipGreen.prototype, "constructor", [game, x, y, 'arrow_ship_green']);
  this.animations.add('spin', [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 12, true);
  this.play('spin');
};
var $ArrowShipGreen = ArrowShipGreen;
($traceurRuntime.createClass)(ArrowShipGreen, {init: function() {
    $traceurRuntime.superCall(this, $ArrowShipGreen.prototype, "init", []);
  }}, {}, ArrowShip);

//# sourceMappingURL=arrow-ship-green.js.map
