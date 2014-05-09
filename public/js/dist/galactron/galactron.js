"use strict";
var __moduleName = "public/js/dist/galactron/galactron";
(function() {
  var game = new Phaser.Game(380, 260, Phaser.CANVAS, 'canvasWrapper', {
    preload: preload,
    create: create,
    update: update
  });
  var controls;
  var player;
  var bullets;
  var enemies;
  function preload() {
    game.load.spritesheet('player', 'images/galactron/player_ship.png', 33, 24, 3);
    game.load.spritesheet('laser_blue', 'images/galactron/laser_blue.png', 16, 3, 1);
  }
  function create() {
    game.stage.scale.set(2);
    game.stage.scale.minWidth = 760;
    game.stage.scale.minHeight = 520;
    game.scale.maxWidth = 760;
    game.scale.maxHeight = 520;
    game.stage.smoothed = false;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setScreenSize(true);
    game.state.add('Level1', Level1);
    game.state.start('Level1');
    return true;
    enemies = game.add.group();
    var alien = new Alien(game, 200, 100);
    enemies.add(alien);
    game.add.existing(alien, 10, 10);
  }
  function addSprite(sprite) {
    game.add.existing(sprite);
  }
  function createAliens() {
    var alien = new Alien(game, 20, 10);
    game.add.existing(alien, 10, 10);
    alien.body.velocity.x = 3;
    var alien2;
    for (var i = 0; i < 3000; i++) {
      alien2 = new Alien(game, game.world.randomX, game.world.randomY);
      game.physics.enable(alien2, Phaser.Physics.ARCADE);
      if (Math.random() > 0.5) {
        alien2.body.velocity.x = +30;
      } else {
        alien2.body.velocity.x = -30;
      }
      game.add.existing(alien2);
    }
  }
  function update(game) {
    handleInput(game.time.elapsed);
  }
  function handleInput(elapsed) {
    if (controls.up.isDown) {
      player.moveUp(elapsed);
    } else if (controls.down.isDown) {
      player.moveDown(elapsed);
    } else {
      player.stopMovement();
    }
    if (controls.left.isDown) {
      player.moveLeft(elapsed);
    } else if (controls.right.isDown) {
      player.moveRight(elapsed);
    }
    if (controls.fire.isDown) {
      player.fire();
    }
  }
})();

//# sourceMappingURL=galactron.js.map