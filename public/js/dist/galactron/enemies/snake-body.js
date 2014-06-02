"use strict";
var __moduleName = "public/js/dist/galactron/enemies/snake-body";
var SnakeBody = function SnakeBody(game, x, y) {
  $traceurRuntime.superCall(this, $SnakeBody.prototype, "constructor", [game, x, y, 'white_snake_body']);
  this.leader;
  this.trackingDist = 10;
  this.lastLeaderPos;
  this.lastElapsed;
  this.anchor.setTo(0.5, 0.5);
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
    return;
    if (this.lastLeaderPos && (this.distanceTo(this.leader) > this.trackingDist)) {
      if (this.game.time.elapsed > this.lastElapsed) {
        var deltaVector = new Phaser.Point(this.lastLeaderPos.x - this.leader.x, this.lastLeaderPos.y - this.leader.y);
        deltaVector.setMagnitude(-this.trackingDist);
        this.x = this.leader.x + deltaVector.x;
        this.y = this.leader.y + deltaVector.y;
      } else {
        var leaderDist = new Phaser.Point(this.leader.x - this.lastLeaderPos.x, this.leader.y - this.lastLeaderPos.y);
        var deltaVector = new Phaser.Point(this.x - this.lastLeaderPos.x, this.y - this.lastLeaderPos.y);
        deltaVector.setMagnitude(leaderDist.getMagnitude());
        this.x = this.x + deltaVector.x;
        this.y = this.y + deltaVector.y;
      }
    }
    if (this.leader) {
      this.lastLeaderPos = this.leader.body.velocity;
      this.lastElapsed = this.game.time.elapsed;
    }
    return;
    if (true || this.leader && (this.distanceTo(this.leader) > this.trackingDist)) {
      var reverseLeaderVector = new Phaser.Point(this.leader.body.velocity.x, -this.leader.body.velocity.y);
      var distVector = new Phaser.Point(this.x - this.leader.x, this.y - this.leader.y);
      var deltaVector = new Phaser.Point(distVector.x + reverseLeaderVector.x, distVector.y + reverseLeaderVector.y);
      deltaVector.setMagnitude(this.trackingDist);
    }
  }}, {}, Enemy);

//# sourceMappingURL=snake-body.js.map
