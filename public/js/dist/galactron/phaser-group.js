"use strict";
var __moduleName = "public/js/dist/galactron/phaser-group";
Phaser = Phaser || {};
Phaser.Group = Phaser.Group || {};
Phaser.Group.prototype.addMany = function(other) {
  var newChildren;
  if (other instanceof Array) {
    newChildren = other;
  } else if (other.children && other.children instanceof Array) {
    newChildren = other.children;
  }
  for (var i = newChildren.length - 1; i >= 0; i--) {
    this.add(newChildren[i]);
  }
  ;
};

//# sourceMappingURL=phaser-group.js.map
