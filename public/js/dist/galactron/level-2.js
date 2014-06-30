"use strict";
var __moduleName = "public/js/dist/galactron/level-2";
var Level2 = function Level2(game) {
  $traceurRuntime.superCall(this, $Level2.prototype, "constructor", [game]);
  this.starfield1;
  this.starfield2;
  this.starfield3;
  this.ground;
};
var $Level2 = Level2;
($traceurRuntime.createClass)(Level2, {
  preload: function() {
    $traceurRuntime.superCall(this, $Level2.prototype, "preload", []);
    this.game.load.spritesheet('starfield1', 'images/galactron/background/starfield1.png', 1920, 240);
    this.game.load.spritesheet('starfield2', 'images/galactron/background/starfield2.png', 960, 240);
    this.game.load.spritesheet('starfield3', 'images/galactron/background/starfield3.png', 960, 240);
    this.game.load.image('big_blue_world', '/images/galactron/background/big_blue_world.png');
    this.game.load.image('green_saturn', '/images/galactron/background/green_saturn.png');
    this.game.load.image('small_jupiter', '/images/galactron/background/small_jupiter.png');
    this.game.load.image('small_mars', '/images/galactron/background/small_mars.png');
  },
  create: function() {
    $traceurRuntime.superCall(this, $Level2.prototype, "create", []);
    this.createBackground();
    var width = this.game.width;
    this.events.addAction(new WaitAction(0.5)).chainAction(new SpawnWaveAction(CannonDrone, [{
      x: width,
      y: 60
    }, {
      x: width,
      y: 120
    }, {
      x: width,
      y: 180
    }], 3, 0)).start();
  },
  createBackground: function() {
    var width = this.game.stage.bounds.width;
    var height = this.game.stage.bounds.height;
    var starfield1 = this.game.add.tileSprite(0, 0, width, height, 'starfield1');
    starfield1.autoScroll(-70, 0);
    var starfield2 = this.game.add.tileSprite(0, 0, width, height, 'starfield2');
    starfield2.autoScroll(-90, 0);
    var starfield3 = this.game.add.tileSprite(0, 0, width, height, 'starfield3');
    starfield3.autoScroll(-110, 0);
    var greenSaturn = new SlidingBackground(this.game, 500, 50, 'green_saturn', -45);
    var smallMars = new SlidingBackground(this.game, 1300, 150, 'small_mars', -45);
    var smallJupiter = new SlidingBackground(this.game, 2500, 30, 'small_jupiter', -45);
    this.background.add(starfield1);
    this.background.add(starfield2);
    this.background.add(starfield3);
    this.background.add(greenSaturn);
    this.background.add(smallMars);
    this.background.add(smallJupiter);
  }
}, {}, PlayState);

//# sourceMappingURL=level-2.js.map
