"use strict";
var __moduleName = "public/js/dist/galactron/game-state";
var GameState = function GameState() {};
($traceurRuntime.createClass)(GameState, {
  createText: function(text, x, y) {
    var size = arguments[3] !== (void 0) ? arguments[3] : 8;
    var font = arguments[4] !== (void 0) ? arguments[4] : 'FirewireBlack';
    var color = arguments[5] !== (void 0) ? arguments[5] : "#FFFFFF";
    var align = arguments[6] !== (void 0) ? arguments[6] : 'center';
    var style = {
      font: size + "px " + font,
      fill: color,
      align: align
    };
    var txt = this.game.add.text(x, y, text, style);
    if (align == 'center') {
      txt.anchor.setTo(0.5, 0.5);
    } else if (align == 'right') {
      txt.anchor.setTo(1, 1);
    }
    return txt;
  },
  create: function() {},
  enableInput: function() {
    this.controls = this.game.input.keyboard.createCursorKeys();
    this.controls.fire = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
    this.controls.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.controls.pause = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
    this.controls.pause.onDown.add(function() {
      this.game.paused = !this.game.paused;
    }, this);
  }
}, {});

//# sourceMappingURL=game-state.js.map
