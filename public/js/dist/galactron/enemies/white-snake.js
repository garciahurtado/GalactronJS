"use strict";
var __moduleName = "public/js/dist/galactron/enemies/white-snake";
var WhiteSnake = function WhiteSnake() {
  $traceurRuntime.defaultSuperCall(this, $WhiteSnake.prototype, arguments);
};
var $WhiteSnake = WhiteSnake;
($traceurRuntime.createClass)(WhiteSnake, {
  createHead: function(x, y) {
    return new WhiteSnakeHead(this.game, x, y);
  },
  createBody: function(x, y) {
    return new WhiteSnakeBody(this.game, x, y);
  }
}, {}, Snake);

//# sourceMappingURL=white-snake.js.map
