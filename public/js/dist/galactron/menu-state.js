"use strict";
var __moduleName = "public/js/dist/galactron/menu-state";
var MenuState = function MenuState(game) {
  this.arrowIndex = 0;
  this.levelList = ['Level1', 'Level2'];
};
var $MenuState = MenuState;
($traceurRuntime.createClass)(MenuState, {
  create: function() {
    $traceurRuntime.superCall(this, $MenuState.prototype, "create", []);
    this.enableInput();
    this.createText("GALACTRON", 190, 60, 52, 'EditUndoLine', '#FFFFFF', 'center');
    this.createText("LEVEL 1", 160, 140, 8, 'FirewireBlack', '#FFFFFF', 'left');
    this.createText("LEVEL 2", 160, 160, 8, 'FirewireBlack', '#FFFFFF', 'left');
    this.createText("LEVEL 3", 160, 180, 8, 'FirewireBlack', '#FFFFFF', 'left');
    this.arrow = this.createText(">", 150, 140, 8, 'FirewireBlack', '#FFFFFF', 'left');
    this.arrow.flicker = GalactronSprite.prototype.flicker;
    this.arrow.update = GalactronSprite.prototype.update;
    this.arrow.flicker(0, 30);
    this.pressEnter = this.createText("PRESS ENTER TO START", 190, 240, 8, 'FirewireBlack', '#FFFFFF', 'center');
    this.pressEnter.flicker = GalactronSprite.prototype.flicker;
    this.pressEnter.update = GalactronSprite.prototype.update;
    this.pressEnter.flicker(0, 700);
  },
  update: function() {
    if (this.controls.enter.isDown) {
      var newLevel = this.levelList[this.arrowIndex];
      this.game.state.start(newLevel);
    }
    if (this.controls.down.isDown) {
      this.moveArrow(+1);
    } else if (this.controls.up.isDown) {
      this.moveArrow(-1);
    }
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
