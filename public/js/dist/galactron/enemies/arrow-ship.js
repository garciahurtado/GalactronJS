"use strict";
var __moduleName = "public/js/dist/galactron/enemies/arrow-ship";
var ArrowShip = function ArrowShip(game, x, y, sprite) {
  $traceurRuntime.superCall(this, $ArrowShip.prototype, "constructor", [game, x, y, sprite]);
  this.sounds.laser = game.add.audio('bullet_shot');
};
var $ArrowShip = ArrowShip;
($traceurRuntime.createClass)(ArrowShip, {
  init: function() {
    $traceurRuntime.superCall(this, $ArrowShip.prototype, "init", []);
    this.bulletSpeed = 100;
    this.score = 250;
    this.health = 20;
    this.body.velocity.x = -180;
    var chain = this.actions;
    this.actions.wait(0.1).then(function() {
      this.turn(function() {
        return (Math.random() * 1) + Math.PI - 0.6;
      }());
    }).then(new TweenAction(this.body.velocity, {
      x: 0,
      y: 0
    }, 2500)).then(this.shoot).then(new TweenAction(this.body.velocity, {
      x: 200,
      y: 0
    }, 1000)).start();
  },
  shoot: function() {
    this.sounds.laser.play();
    var bullet = this.createBullet(OvalBullet);
    bullet.body.velocity.x = -this.bulletSpeed;
    if (this.player) {
      this.game.physics.arcade.moveToObject(bullet, this.player, this.bulletSpeed);
    }
  }
}, {}, Enemy);

//# sourceMappingURL=arrow-ship.js.map
