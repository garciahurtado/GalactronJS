"use strict";
var __moduleName = "public/js/dist/galactron/fx/oval-bullet";
var OvalBullet = function OvalBullet(game) {
  $traceurRuntime.superCall(this, $OvalBullet.prototype, "constructor", [game, 0, 0, 'oval_bullet']);
  this.animations.add('on', [0, 1, 2, 3], 15, true);
  this.play('on');
  this.power = 10;
};
var $OvalBullet = OvalBullet;
($traceurRuntime.createClass)(OvalBullet, {}, {}, Bullet);

//# sourceMappingURL=oval-bullet.js.map
