"use strict";
var __moduleName = "public/js/dist/galactron/level-1";
var Level1 = function Level1(game) {
  $traceurRuntime.superCall(this, $Level1.prototype, "constructor", [game]);
  this.starfield1;
  this.starfield2;
  this.starfield3;
  this.ground;
};
var $Level1 = Level1;
($traceurRuntime.createClass)(Level1, {
  preload: function() {
    $traceurRuntime.superCall(this, $Level1.prototype, "preload", []);
    this.game.load.spritesheet('starfield1', 'images/galactron/starfield1.png', 1920, 240);
    this.game.load.spritesheet('starfield2', 'images/galactron/starfield2.png', 960, 240);
    this.game.load.spritesheet('starfield3', 'images/galactron/starfield3.png', 960, 240);
  },
  create: function() {
    $traceurRuntime.superCall(this, $Level1.prototype, "create", []);
    this.createBackground();
    var wave1 = this.addWave(this.game.width - 50, 150, Alien1, 20, 0.3);
    var wave2 = this.addWave(this.game.width - 50, 100, Alien1, 20, 0.3);
    var width = this.game.stage.bounds.width;
  },
  createBackground: function() {
    var width = this.game.stage.bounds.width;
    var height = this.game.stage.bounds.height;
    var starfield1 = this.game.add.tileSprite(0, 0, width, height, 'starfield1');
    var starfield2 = this.game.add.tileSprite(0, 0, width, height, 'starfield2');
    var starfield3 = this.game.add.tileSprite(0, 0, width, height, 'starfield3');
    this.background.add(starfield1);
    this.background.add(starfield2);
    this.background.add(starfield3);
    starfield1.autoScroll(-110, 0);
    starfield2.autoScroll(-125, 0);
    starfield3.autoScroll(-140, 0);
  }
}, {}, PlayState);

//# sourceMappingURL=level-1.js.map
