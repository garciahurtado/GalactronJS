"use strict";
var __moduleName = "public/js/dist/galactron/enemies/snake-head";
var SnakeHead = function SnakeHead(game, x, y) {
  $traceurRuntime.superCall(this, $SnakeHead.prototype, "constructor", [game, x, y, 'white_snake_head']);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
};
var $SnakeHead = SnakeHead;
($traceurRuntime.createClass)(SnakeHead, {update: function() {
    $traceurRuntime.superCall(this, $SnakeHead.prototype, "update", []);
    if (this.leader) {
      this.body.velocity = this.leader.body.velocity;
      this.x = this.leader.x;
      this.y = this.leader.y;
    }
  }}, {}, Enemy);

//# sourceMappingURL=snake-head.js.map
