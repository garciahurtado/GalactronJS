"use strict";
var __moduleName = "public/js/dist/galactron/enemies/floating-mine";
var FloatingMine = function FloatingMine(game, x, y, sprite) {
  sprite = sprite || 'floating_mine';
  $traceurRuntime.superCall(this, $FloatingMine.prototype, "constructor", [game, x, y, sprite]);
  this.init();
  var spikeSpeed = 100;
  this.spikeLeft = new FloatingMineSpike(game, 0, 8);
  this.spikeLeft.play('left');
  this.spikeLeft.velocityX = -spikeSpeed;
  this.addChild(this.spikeLeft);
  this.spikeTop = new FloatingMineSpike(game, 8, 0);
  this.spikeTop.play('top');
  this.spikeTop.velocityY = -spikeSpeed;
  this.addChild(this.spikeTop);
  this.spikeRight = new FloatingMineSpike(game, 16, 8);
  this.spikeRight.play('right');
  this.spikeRight.velocityX = spikeSpeed;
  this.addChild(this.spikeRight);
  this.spikeBottom = new FloatingMineSpike(game, 8, 16);
  this.spikeBottom.play('down');
  this.spikeBottom.velocityY = spikeSpeed;
  this.addChild(this.spikeBottom);
};
var $FloatingMine = FloatingMine;
($traceurRuntime.createClass)(FloatingMine, {
  init: function() {
    $traceurRuntime.superCall(this, $FloatingMine.prototype, "init", []);
    this.body.velocity.x = -50;
    this.score = 50;
    this.health = 10;
  },
  damage: function(amount) {
    $traceurRuntime.superCall(this, $FloatingMine.prototype, "damage", [amount]);
  },
  kill: function() {
    this.launchSpikes();
    $traceurRuntime.superCall(this, $FloatingMine.prototype, "kill", []);
  },
  launchSpikes: function() {
    this.spikeLeft.actions.start();
    this.spikeTop.actions.start();
    this.spikeRight.actions.start();
    this.spikeBottom.actions.start();
  }
}, {}, Enemy);

//# sourceMappingURL=floating-mine.js.map
