"use strict";
var __moduleName = "public/js/dist/galactron/menu-state";
var MenuState = function MenuState(game) {
  this.arrowIndex = 0;
  this.levelList = ['Level1', 'Level2', 'Level3'];
  game.plugins.add(new Phaser.Plugin.Flicker());
};
var $MenuState = MenuState;
($traceurRuntime.createClass)(MenuState, {
  create: function() {
    $traceurRuntime.superCall(this, $MenuState.prototype, "create", []);
    this.game.stage.smoothed = false;
    this.enableInput();
    this.createText("GALACTRON", 190, 60, 32, 'FirewireBlack', '#FFFFFF', 'center');
    this.createText("LEVEL 1", 160, 140, 8, 'FirewireBlack', '#FFFFFF', 'left');
    this.createText("LEVEL 2", 160, 160, 8, 'FirewireBlack', '#FFFFFF', 'left');
    this.createText("LEVEL 3", 160, 180, 8, 'FirewireBlack', '#FFFFFF', 'left');
    this.arrow = this.createText(">", 150, 140, 8, 'FirewireBlack', '#FFFFFF', 'left');
    this.arrow.flicker();
    this.pressEnter = this.createText("PRESS ENTER TO START", 190, 240, 8, 'FirewireBlack', '#FFFFFF', 'center');
    this.pressEnter.flicker(1.42);
    this.configInput();
  },
  update: function() {
    if (this.controls.enter.isDown) {
      var newLevel = this.levelList[this.arrowIndex];
      this.game.state.start(newLevel);
    }
  },
  configInput: function() {
    this.controls.down.onDown.add(function() {
      this.moveArrow(+1);
    }, this);
    this.controls.up.onDown.add(function() {
      this.moveArrow(-1);
    }, this);
  },
  moveArrow: function(offset) {
    var newOffset = this.arrowIndex + offset;
    if (newOffset < 0 || newOffset >= this.levelList.length) {
      return false;
    } else {
      this.arrowIndex = newOffset;
      this.arrow.y += offset * 20;
    }
  }
}, {}, GameState);

//# sourceMappingURL=menu-state.js.map
