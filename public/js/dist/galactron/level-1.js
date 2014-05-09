"use strict";
var __moduleName = "public/js/dist/galactron/level-1";
function Level1(game) {
  this.game = game;
  PlayState.call(this, game);
  var starfield1;
  var starfield2;
  var starfield3;
  var ground;
}
Level1.prototype = Object.create(PlayState.prototype);
Level1.prototype.constructor = Level1;
Level1.prototype.preload = function() {
  PlayState.prototype.preload.call(this);
  this.game.load.spritesheet('alien', 'images/galactron/enemies/alien.png', 20, 20);
  this.game.load.spritesheet('starfield1', 'images/galactron/starfield1.png', 1920, 240);
  this.game.load.spritesheet('starfield2', 'images/galactron/starfield2.png', 960, 240);
  this.game.load.spritesheet('starfield3', 'images/galactron/starfield3.png', 960, 240);
};
Level1.prototype.create = function() {
  PlayState.prototype.create.call(this);
  this.createBackground();
  var width = this.game.stage.bounds.width;
  this.events.addAction(new WaitAction(0.5)).chainAction(new WaitAction(2)).start();
};
Level1.prototype.createBackground = function() {
  var width = this.game.stage.bounds.width;
  var height = this.game.stage.bounds.height;
  var starfield1 = this.game.add.tileSprite(0, 0, width, height, 'starfield1');
  var starfield2 = this.game.add.tileSprite(0, 0, width, height, 'starfield2');
  var starfield3 = this.game.add.tileSprite(0, 0, width, height, 'starfield3');
  this.background.add(starfield1);
  this.background.add(starfield2);
  this.background.add(starfield3);
  starfield1.autoScroll(-110, 0);
  starfield2.autoScroll(-130, 0);
  starfield3.autoScroll(-150, 0);
};

//# sourceMappingURL=level-1.js.map
