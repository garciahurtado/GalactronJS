"use strict";
var __moduleName = "public/js/dist/galactron/enemies/snake-body";
var SnakeBody = function SnakeBody(game, x, y, sprite) {
  sprite = sprite || 'red_snake_body';
  $traceurRuntime.superCall(this, $SnakeBody.prototype, "constructor", [game, x, y, sprite]);
  this.leader;
  this.trackingDist = 10;
  this.lastLeaderPos;
  this.lastElapsed;
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
};
var $SnakeBody = SnakeBody;
($traceurRuntime.createClass)(SnakeBody, {update: function() {
    $traceurRuntime.superCall(this, $SnakeBody.prototype, "update", []);
    if (this.leader && (this.distanceTo(this.leader) > this.trackingDist)) {
      var distance = new Phaser.Point(this.x - this.leader.x, this.y - this.leader.y);
      distance.setMagnitude(this.trackingDist);
      this.x = this.leader.x + distance.x;
      this.y = this.leader.y + distance.y;
    }
  }}, {}, Enemy);

//# sourceMappingURL=snake-body.js.map
