"use strict";
var __moduleName = "public/js/dist/galactron/enemies/floating-mine";
var FloatingMine = function FloatingMine(game, x, y) {
  $traceurRuntime.superCall(this, $FloatingMine.prototype, "constructor", [game, x, y, null]);
  this.init();
  this.core = new Enemy(this.game, 0, 0, 'floating_mine');
  this.addChild(this.core);
  var spikeSpeed = 100;
  this.spikeLeft = new FloatingMineSpike(this.game, 0, 8);
  this.spikeLeft.play('left');
  this.spikeLeft.velocityX = -spikeSpeed;
  this.addChild(this.spikeLeft);
  this.spikeTop = new FloatingMineSpike(this.game, 8, 0);
  this.spikeTop.play('top');
  this.spikeTop.velocityY = -spikeSpeed;
  this.addChild(this.spikeTop);
  this.spikeRight = new FloatingMineSpike(this.game, 16, 8);
  this.spikeRight.play('right');
  this.spikeRight.velocityX = spikeSpeed;
  this.addChild(this.spikeRight);
  this.spikeBottom = new FloatingMineSpike(this.game, 8, 16);
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
    this.core.kill();
  },
  launchSpikes: function() {
    this.spikeLeft.actions.start();
    this.spikeTop.actions.start();
    this.spikeRight.actions.start();
    this.spikeBottom.actions.start();
  }
}, {}, Enemy);

//# sourceMappingURL=floating-mine.js.map
