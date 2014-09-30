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
    this.actions.then(new WaveMotionAction(this, 1.5, 5, 1)).then(new MethodAction(function() {
      this.body.velocity = {
        x: -200,
        y: 0
      };
    })).then(new CircleMotionAction(4, 10)).start();
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
    var head = this.createHead(this.x - 1, this.y);
    head.leader = this;
    this.parts.add(head);
    var num = 10;
    var nextLeader = head;
    for (var i = 0; i < num; i++) {
      var x = head.x + (i + 1) * this.partDistance;
      var part = this.createBody(x, 20);
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
  createHead: function(x, y) {
    return new SnakeHead(this.game, x, y);
  },
  createBody: function(x, y) {
    return new SnakeBody(this.game, x, y);
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
