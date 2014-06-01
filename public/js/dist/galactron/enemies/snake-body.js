"use strict";
var __moduleName = "public/js/dist/galactron/enemies/snake-body";
var SnakeBody = function SnakeBody(game, x, y) {
  $traceurRuntime.superCall(this, $SnakeBody.prototype, "constructor", [game, x, y, 'white_snake_body']);
  this.leader;
  this.leaderDist = 10;
  this.anchor.setTo(0.5, 0.5);
};
var $SnakeBody = SnakeBody;
($traceurRuntime.createClass)(SnakeBody, {
  update: function() {
    $traceurRuntime.superCall(this, $SnakeBody.prototype, "update", []);
    if (this.leaderLastVel) {
      this.body.velocity = this.leaderLastVel;
    }
    if (this.leader && (this.distanceTo(this.leader) > this.leaderDist)) {
      var deltaVector = new Phaser.Point(this.x - this.leader.x, this.y - this.leader.y);
      deltaVector.setMagnitude(this.leaderDist);
      this.x = this.leader.x + deltaVector.x;
      this.y = this.leader.y + deltaVector.y;
    }
  },
  init: function() {
    $traceurRuntime.superCall(this, $SnakeBody.prototype, "init", []);
    if (this.leader) {
      this.x = this.leader.x;
      this.y = this.leader.y;
    }
  }
}, {}, Enemy);

//# sourceMappingURL=snake-body.js.map
