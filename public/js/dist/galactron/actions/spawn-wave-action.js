"use strict";
var __moduleName = "public/js/dist/galactron/actions/spawn-wave-action";
var SpawnWaveAction = function SpawnWaveAction(enemyClass, spawnCoords) {
  var waveSize = arguments[2] !== (void 0) ? arguments[2] : 1;
  var delay = arguments[3] !== (void 0) ? arguments[3] : 0;
  $traceurRuntime.superCall(this, $SpawnWaveAction.prototype, "constructor", [null]);
  this.enemyClass = enemyClass;
  this.spawnCoords = spawnCoords;
  this.waveSize = waveSize;
  this.delay = delay;
};
var $SpawnWaveAction = SpawnWaveAction;
($traceurRuntime.createClass)(SpawnWaveAction, {
  start: function() {
    $traceurRuntime.superCall(this, $SpawnWaveAction.prototype, "start", []);
    var state = this.game.state.getCurrentState();
    this.wave = state.spawnWave(this.enemyClass, this.spawnCoords, this.waveSize, this.delay);
  },
  update: function() {
    $traceurRuntime.superCall(this, $SpawnWaveAction.prototype, "update", []);
    if (this.wave.spawnCounter >= this.waveSize) {
      this.finish();
    }
  }
}, {}, Action);

//# sourceMappingURL=spawn-wave-action.js.map
