"use strict";
var __moduleName = "public/js/dist/galactron/plugin/Flicker";
Phaser.Plugin.Flicker = function(game, parent) {
  Phaser.Plugin.call(this, game, parent);
  this.sprites = [];
  this.frequency = 33;
  var plugin = this;
  Phaser.Sprite.prototype.flicker = Phaser.Text.prototype.flicker = function(frequency, duration) {
    plugin.add(this, frequency, duration);
  };
};
Phaser.Plugin.Flicker.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.Flicker.prototype.constructor = Phaser.Plugin.Flicker;
Phaser.Plugin.Flicker.prototype.add = function(sprite, frequency) {
  var duration = arguments[2] !== (void 0) ? arguments[2] : 0;
  sprite.flickerDuration = duration;
  sprite.flickerFreq = frequency || this.frequency;
  sprite.flickerTimer = 0;
  sprite.immune = true;
  if (duration) {
    this.game.time.events.add(Phaser.Timer.SECOND * (duration / 1000), function() {
      this.stop(sprite);
    }, this);
  }
  this.sprites.push(sprite);
};
Phaser.Plugin.Flicker.prototype.update = function() {
  var elapsed = this.game.time.elapsed;
  this.sprites.forEach(function(sprite) {
    sprite.flickerTimer += elapsed;
    if (sprite.flickerTimer > (1000 / sprite.flickerFreq)) {
      sprite.alpha = sprite.alpha ? 0 : 1;
      sprite.flickerTimer = 0;
    }
  }, this);
};
Phaser.Plugin.Flicker.prototype.stop = function(sprite) {
  sprite.alpha = 1;
  sprite.immune = false;
  for (var i = 0; i < this.sprites.length; i++) {
    if (this.sprites[i] == sprite) {
      this.sprites.splice(i, 1);
    }
  }
  ;
};

//# sourceMappingURL=Flicker.js.map
