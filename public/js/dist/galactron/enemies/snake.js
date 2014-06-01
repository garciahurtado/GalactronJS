"use strict";
var __moduleName = "public/js/dist/galactron/enemies/snake";
var Snake = function Snake(game, x, y) {
  $traceurRuntime.superCall(this, $Snake.prototype, "constructor", [game, x, y]);
  this.partDistance = 15;
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.createParts();
  this.prevPos;
  this.parts;
};
var $Snake = Snake;
($traceurRuntime.createClass)(Snake, {
  init: function() {
    $traceurRuntime.superCall(this, $Snake.prototype, "init", []);
    this.score = 100;
    this.health = 10;
    this.body.velocity.x = -50;
    this.actions.addAction(new WaveMotionAction(this, 1, 5)).start();
  },
  update: function() {
    $traceurRuntime.superCall(this, $Snake.prototype, "update", []);
  },
  createParts: function() {
    this.parts = this.game.add.group();
    var head = new SnakeHead(this.game, this.x - 1, this.y);
    head.leader = this;
    this.parts.add(head);
    var num = 10;
    var nextLeader = head;
    for (var i = 0; i < num; i++) {
      var part = new SnakeBody(this.game, head.x + (i + 1) * this.partDistance, 4);
      part.leaderDist = this.partDistance;
      this.game.physics.enable(part, Phaser.Physics.ARCADE);
      part.leader = nextLeader;
      nextLeader = part;
      this.parts.add(part);
    }
    this.parts.forEach(function(part) {
      this.parts.sendToBack(part);
    }, this);
  },
  reset: function(x, y) {
    $traceurRuntime.superCall(this, $Snake.prototype, "reset", [x, y]);
    var part;
    for (var i = 0; i < this.parts.length; i++) {
      part = this.parts.getAt(i);
      part.reset(this.x, this.y);
    }
    ;
  }
}, {}, Enemy);

//# sourceMappingURL=snake.js.map
