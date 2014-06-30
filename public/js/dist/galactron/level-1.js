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
    this.game.load.spritesheet('starfield1', 'images/galactron/background/starfield1.png', 1920, 240);
    this.game.load.spritesheet('starfield2', 'images/galactron/background/starfield2.png', 960, 240);
    this.game.load.spritesheet('starfield3', 'images/galactron/background/starfield3.png', 960, 240);
    this.game.load.image('big_blue_world', 'images/galactron/background/big_blue_world.png');
    this.game.load.image('green_saturn', 'images/galactron/background/green_saturn.png');
    this.game.load.image('small_jupiter', 'images/galactron/background/small_jupiter.png');
    this.game.load.image('small_mars', 'images/galactron/background/small_mars.png');
  },
  create: function() {
    $traceurRuntime.superCall(this, $Level1.prototype, "create", []);
    this.createBackground();
    var width = this.game.width;
    this.events.addAction(new WaitAction(1)).chainAction(new SpawnWaveAction(FloatingMine, [{
      x: width,
      y: 30
    }, {
      x: width,
      y: 50
    }, {
      x: width,
      y: 70
    }, {
      x: width,
      y: 90
    }, {
      x: width,
      y: 110
    }, {
      x: width,
      y: 130
    }, {
      x: width,
      y: 150
    }, {
      x: width,
      y: 130
    }, {
      x: width,
      y: 110
    }, {
      x: width,
      y: 90
    }, {
      x: width,
      y: 70
    }, {
      x: width,
      y: 50
    }], 24, 0.5)).chainAction(new SpawnWaveAction(Alien1, [{
      x: width,
      y: 150
    }], 20, 0.3)).chainAction(new WaitAction(5)).chainAction(new SpawnWaveAction(AlienRed, [{
      x: width,
      y: 150
    }], 20, 0.3)).chainAction(new WaitAction(15)).chainAction(new SpawnWaveAction(Snake, [{
      x: width,
      y: 150
    }], 1)).chainAction(new SpawnWaveAction(Snake, [{
      x: width,
      y: 150
    }], 1)).chainAction(new WaitAction(10)).chainAction(new SpawnWaveAction(WhiteSnake, [{
      x: width,
      y: 100
    }], 1)).chainAction(new SpawnWaveAction(WhiteSnake, [{
      x: width,
      y: 150
    }], 1)).chainAction(new SpawnWaveAction(WhiteSnake, [{
      x: width,
      y: 200
    }], 1)).start();
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
    var greenSaturn = new SlidingBackground(this.game, 600, 50, 'green_saturn', -45);
    var smallMars = new SlidingBackground(this.game, 1300, 150, 'small_mars', -45);
    var smallJupiter = new SlidingBackground(this.game, 2500, 30, 'small_jupiter', -45);
    var bigBlueWorld = new SlidingBackground(this.game, 500, 0, 'big_blue_world', -45);
    this.background.add(starfield1);
    this.background.add(starfield2);
    this.background.add(starfield3);
    this.background.add(smallMars);
    this.background.add(smallJupiter);
    this.background.add(bigBlueWorld);
  }
}, {}, PlayState);

//# sourceMappingURL=level-1.js.map
