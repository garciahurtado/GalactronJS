"use strict";
var __moduleName = "public/js/dist/galactron/fx/blue-laser-beam";
var BlueLaserBeam = function BlueLaserBeam(game) {
  $traceurRuntime.superCall(this, $BlueLaserBeam.prototype, "constructor", [game, 0, 0, 'laser_blue_beam']);
  this.animations.add('on', [0, 1], 30, true);
  this.power = 10;
};
var $BlueLaserBeam = BlueLaserBeam;
($traceurRuntime.createClass)(BlueLaserBeam, {}, {}, Bullet);

//# sourceMappingURL=blue-laser-beam.js.map
