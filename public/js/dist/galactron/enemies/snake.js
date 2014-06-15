"use strict";
var __moduleName = "public/js/dist/galactron/enemies/snake";
var Snake = function Snake(game, x, y) {
  $traceurRuntime.superCall(this, $Snake.prototype, "constructor", [game, x, y]);
  this.partDistance = 5;
  this.createParts();
};
var $Snake = Snake;
($traceurRuntime.createClass)(Snake, {
  init: function() {
    $traceurRuntime.superCall(this, $Snake.prototype, "init", []);
    this.score = 100;
    this.health = 10;
    this.body.velocity.x = -100;
    this.actions.addAction(new WaveMotionAction(this, 1.5, 5, 2)).chainAction(new CircleMotionAction(2, 1)).chainAction(new CircleMotionAction(2, 0.5, -1)).chainAction(new MethodAction(function() {
      this.body.velocity.x = 100;
      this.body.velocity.y = 0;
    })).chainAction(new WaitAction(1.5)).chainAction(new CircleMotionAction(2, 0.25, -1)).chainAction(new WaitAction(1)).chainAction(new CircleMotionAction(2, 0.25)).start();
  },
  kill: function() {
    $traceurRuntime.superCall(this, $Snake.prototype, "kill", []);
    var count = this.parts.length;
    var delay = Phaser.Timer.SECOND * 0.15;
    var part;
    var index;
    for (var i = 0; i < count; i++) {
      index = count - i - 1;
      part = this.parts.getAt(index);
      this.game.time.events.add(delay * i, function() {
        this.kill();
      }, part);
    }
  },
  createParts: function() {
    this.parts = this.game.add.group();
    var head = new SnakeHead(this.game, this.x - 1, this.y);
    head.leader = this;
    this.parts.add(head);
    var num = 10;
    var nextLeader = head;
    for (var i = 0; i < num; i++) {
      var part = new SnakeBody(this.game, head.x + (i + 1) * this.partDistance, 20);
      this.game.physics.enable(part, Phaser.Physics.ARCADE);
      part.leaderDist = this.partDistance;
      part.leader = nextLeader;
      nextLeader = part;
      this.parts.add(part);
    }
    this.parts.forEach(function(part) {
      this.parts.sendToBack(part);
      part.reset(this.x, this.y);
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
