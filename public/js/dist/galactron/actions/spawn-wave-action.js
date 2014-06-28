"use strict";
var __moduleName = "public/js/dist/galactron/actions/spawn-wave-action";
var SpawnWaveAction = function SpawnWaveAction() {
  var x = arguments[0] !== (void 0) ? arguments[0] : 0;
  var y = arguments[1] !== (void 0) ? arguments[1] : 0;
  var enemyClass = arguments[2];
  var waveSize = arguments[3] !== (void 0) ? arguments[3] : 1;
  var delay = arguments[4] !== (void 0) ? arguments[4] : 0;
  $traceurRuntime.superCall(this, $SpawnWaveAction.prototype, "constructor", [null]);
  this.enemyClass = enemyClass;
  this.x = x;
  this.y = y;
  this.waveSize = waveSize;
  this.delay = delay;
};
var $SpawnWaveAction = SpawnWaveAction;
($traceurRuntime.createClass)(SpawnWaveAction, {
  start: function() {
    $traceurRuntime.superCall(this, $SpawnWaveAction.prototype, "start", []);
    var state = this.game.state.getCurrentState();
    this.wave = state.addWave(this.x, this.y, this.enemyClass, this.waveSize, this.delay);
  },
  update: function() {
    $traceurRuntime.superCall(this, $SpawnWaveAction.prototype, "update", []);
    if (this.wave.spawnCounter >= this.waveSize) {
      this.finish();
    }
  }
}, {}, Action);

//# sourceMappingURL=spawn-wave-action.js.map
