"use strict";
var __moduleName = "public/js/dist/galactron/enemies/floating-mine";
var FloatingMine = function FloatingMine(game, x, y, sprite) {
  sprite = sprite || 'floating_mine';
  $traceurRuntime.superCall(this, $FloatingMine.prototype, "constructor", [game, x, y, sprite]);
  this.init();
  this.spikeLeft = new FloatingMineSpike(game, 0, 0);
  this.addChild(this.spikeLeft);
  this.spikeTop = new FloatingMineSpike(game, 0, 0);
  this.addChild(this.spikeTop);
  this.spikeRight = new FloatingMineSpike(game, 0, 0);
  this.addChild(this.spikeRight);
  this.spikeBottom = new FloatingMineSpike(game, 0, 0);
  this.addChild(this.spikeBottom);
};
var $FloatingMine = FloatingMine;
($traceurRuntime.createClass)(FloatingMine, {
  init: function() {
    $traceurRuntime.superCall(this, $FloatingMine.prototype, "init", []);
    this.body.velocity.x = -50;
    this.score = 50;
    this.health = 1000;
  },
  damage: function(amount) {
    console.log('Enemy damaged');
    $traceurRuntime.superCall(this, $FloatingMine.prototype, "damage", [amount]);
    this.spikeLeft.actions.start();
    this.spikeTop.actions.start();
    this.spikeRight.actions.start();
    this.spikeBottom.actions.start();
  }
}, {}, Enemy);

//# sourceMappingURL=floating-mine.js.map
