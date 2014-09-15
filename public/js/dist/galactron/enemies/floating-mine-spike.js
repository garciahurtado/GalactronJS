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
  this.velocityX = 0;
  this.velocityY = 0;
  this.duration = 600;
  this.tween = game.add.tween(this.body.velocity);
  this.tween.to({
    x: 0,
    y: 0
  }, this.duration);
  this.tween.onComplete.add(this.kill, this);
  this.events.onKilled.add(function() {
    this.parent.onChildKilled();
  }.bind(this));
  this.init();
};
var $FloatingMineSpike = FloatingMineSpike;
($traceurRuntime.createClass)(FloatingMineSpike, {
  init: function() {
    $traceurRuntime.superCall(this, $FloatingMineSpike.prototype, "init", []);
    this.health = 10000;
    this.actions.chainAction(new MethodAction(function() {
      this.body.velocity.x = this.velocityX;
      this.body.velocity.y = this.velocityY;
    }));
    ;
  },
  deathAnimation: function() {
    return;
  }
}, {}, Enemy);

//# sourceMappingURL=floating-mine-spike.js.map
