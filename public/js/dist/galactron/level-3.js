"use strict";
var __moduleName = "public/js/dist/galactron/level-3";
var Level3 = function Level3(game) {
  $traceurRuntime.superCall(this, $Level3.prototype, "constructor", [game]);
};
var $Level3 = Level3;
($traceurRuntime.createClass)(Level3, {create: function() {
    $traceurRuntime.superCall(this, $Level3.prototype, "create", []);
    var width = this.game.width;
    this.events = new ActionChain(this.game);
    this.events.addAction(new WaitAction(0.5)).chainAction(new SpawnWaveAction(ArrowShipGreen, [{
      x: width,
      y: 150
    }], 10, 0.5)).chainAction(new WaitAction(6)).chainAction(new SpawnWaveAction(CannonDrone, [{
      x: width,
      y: 100
    }, {
      x: width,
      y: 120
    }, {
      x: width,
      y: 140
    }, {
      x: width,
      y: 160
    }, {
      x: width,
      y: 180
    }, {
      x: width,
      y: 200
    }], 6, 0)).start();
  }}, {}, Level2);

//# sourceMappingURL=level-3.js.map
