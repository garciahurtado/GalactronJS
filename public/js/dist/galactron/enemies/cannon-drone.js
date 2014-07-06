"use strict";
var __moduleName = "public/js/dist/galactron/enemies/cannon-drone";
var CannonDrone = function CannonDrone(game) {
  var x = arguments[1] !== (void 0) ? arguments[1] : 0;
  var y = arguments[2] !== (void 0) ? arguments[2] : 0;
  $traceurRuntime.superCall(this, $CannonDrone.prototype, "constructor", [game, x, y, 'cannon_drone']);
  this.animations.add('open', [0, 1, 2], 3, false);
  this.animations.add('close', [2, 1, 0], 3, false);
  this.animations.add('stop', [0], 0, false);
  this.play('stop');
  this.sounds.laser = game.add.audio('large_beam');
  this.sounds.laser.loop = true;
  this.laser = new BlueLaserBeam(game, x, y);
  this.laser.x = -534;
  this.laser.y = -1000;
  this.bullets.add(this.laser);
  this.actions.addAction(new TweenAction(this, {x: 310}, 1000, Phaser.Easing.Sinusoidal.Out)).chainAction(new WaitAction(0.5)).chainAction(new StopMotionAction()).chainAction(new AnimationAction("open"), "openLaser").chainAction(new WaitAction(0.5)).chainAction(new MethodAction(this.laserOn)).chainAction(new WaitAction(2)).chainAction(new MethodAction(this.laserOff)).chainAction(new AnimationAction("close"), "close").chainAction(new WaitAction(1)).chainAction(new GoToAction("openLaser", 2)).chainAction(new TweenAction(this, {x: -50}, 2000, Phaser.Easing.Sinusoidal.In));
  ;
};
var $CannonDrone = CannonDrone;
($traceurRuntime.createClass)(CannonDrone, {
  init: function() {
    $traceurRuntime.superCall(this, $CannonDrone.prototype, "init", []);
    this.lastShot = 3;
    this.health = 50;
    this.score = 300;
    this.speed = 30;
  },
  laserOn: function() {
    this.sounds.laser.play();
    this.laser.play('on');
    this.laser.y = 0;
  },
  laserOff: function() {
    this.sounds.laser.stop();
    this.laser.y = -1000;
  },
  update: function() {
    $traceurRuntime.superCall(this, $CannonDrone.prototype, "update", []);
  },
  kill: function() {
    $traceurRuntime.superCall(this, $CannonDrone.prototype, "kill", []);
    this.laserOff();
    this.laser.kill();
  }
}, {}, Enemy);

//# sourceMappingURL=cannon-drone.js.map
