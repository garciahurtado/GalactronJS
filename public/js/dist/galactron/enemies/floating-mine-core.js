"use strict";
var __moduleName = "public/js/dist/galactron/enemies/floating-mine-core";
var FloatingMineCore = function FloatingMineCore(game, x, y, sprite) {
  sprite = sprite || 'floating_mine';
  $traceurRuntime.superCall(this, $FloatingMineCore.prototype, "constructor", [game, x, y, sprite]);
  this.events.onKilled.add(function() {
    if (this.parent) {
      this.parent.explode();
    }
  }.bind(this));
  this.init();
};
var $FloatingMineCore = FloatingMineCore;
($traceurRuntime.createClass)(FloatingMineCore, {init: function() {
    $traceurRuntime.superCall(this, $FloatingMineCore.prototype, "init", []);
    this.health = 1000;
  }}, {}, Enemy);

//# sourceMappingURL=floating-mine-core.js.map
