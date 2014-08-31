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
    this.copyChildAt(newChildren[i], this.children.length);
  }
  ;
};
Phaser.Group.prototype.copyChildAt = function(child, index) {
  this.children.splice(index, 0, child);
};

//# sourceMappingURL=phaser-group.js.map
