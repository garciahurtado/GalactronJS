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
    this.bulletSpeed = 150;
    this.score = 250;
    this.health = 20;
    this.body.velocity.x = -100;
    var chain = this.actions;
    this.actions.wait(0.4).then(this.shoot).loop(4).then(function() {
      this.body.velocity.x = 50;
      this.body.velocity.y = -10;
    }).start();
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
