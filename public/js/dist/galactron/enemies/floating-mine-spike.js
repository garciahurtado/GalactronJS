"use strict";
var __moduleName = "public/js/dist/galactron/enemies/floating-mine-spike";
var FloatingMineSpike = function FloatingMineSpike(game, x, y, sprite) {
  sprite = sprite || 'floating_mine_spike';
  $traceurRuntime.superCall(this, $FloatingMineSpike.prototype, "constructor", [game, x, y, sprite]);
  this.animations.add('left', [0], 1, false);
  this.animations.add('up', [1], 1, false);
  this.animations.add('right', [2], 1, false);
  this.animations.add('down', [3], 1, false);
  this.play('up');
  this.init();
};
var $FloatingMineSpike = FloatingMineSpike;
($traceurRuntime.createClass)(FloatingMineSpike, {init: function() {
    $traceurRuntime.superCall(this, $FloatingMineSpike.prototype, "init", []);
    this.health = 1000;
    this.moves = false;
    this.body.speed = 0;
    this.actions.chainAction(new MethodAction(function() {
      this.body.velocity.x = -200;
    }));
    ;
  }}, {}, Enemy);

//# sourceMappingURL=floating-mine-spike.js.map
