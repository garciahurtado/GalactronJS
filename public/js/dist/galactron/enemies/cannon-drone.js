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
  this.laser = this.createBullet(BlueLaserBeam);
  this.laser.x = -533;
  this.laser.y = -1000;
  this.actions.add(new TweenAction(this, {x: 310}, 1000, Phaser.Easing.Sinusoidal.Out)).then(new WaitAction(0.5)).then(new StopMotionAction()).then(new AnimationAction("open"), "openLaser").then(new WaitAction(0.5)).then(new MethodAction(this.laserOn)).then(new WaitAction(2)).then(new MethodAction(this.laserOff)).then(new AnimationAction("close"), "close").then(new WaitAction(1)).then(new GoToAction("openLaser", 2)).then(new TweenAction(this, {x: -50}, 2000, Phaser.Easing.Sinusoidal.In));
  ;
};
var $CannonDrone = CannonDrone;
($traceurRuntime.createClass)(CannonDrone, {
  init: function() {
    $traceurRuntime.superCall(this, $CannonDrone.prototype, "init", []);
    this.health = 50;
    this.score = 300;
    this.speed = 30;
  },
  laserOn: function() {
    this.sounds.laser.play();
    this.laser.play('on');
    this.laser.y = this.y;
    this.laser.x = this.x - 532;
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
