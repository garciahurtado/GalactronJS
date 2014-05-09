"use strict";
var __moduleName = "public/js/dist/galactron/actions/spawn-wave-action";
var SpawnWaveAction = function SpawnWaveAction(playState, enemyClass) {
  var x = arguments[2] !== (void 0) ? arguments[2] : 0;
  var y = arguments[3] !== (void 0) ? arguments[3] : 0;
  var waveSize = arguments[4] !== (void 0) ? arguments[4] : 1;
  var delay = arguments[5] !== (void 0) ? arguments[5] : 0;
  $traceurRuntime.superCall(this, $SpawnWaveAction.prototype, "constructor", [null]);
  this.playState = playState;
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
    var wave = playState.spriteFactory.recycle(EnemyWave);
    playState.addWave(wave, x, y, enemyClass, waveSize, delay);
  },
  update: function() {
    $traceurRuntime.superCall(this, $SpawnWaveAction.prototype, "update", []);
    if (wave.spawnCounter >= waveSize) {
      finish();
    }
  }
}, {}, Action);

//# sourceMappingURL=spawn-wave-action.js.map
