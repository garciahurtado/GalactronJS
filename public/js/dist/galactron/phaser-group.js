"use strict";
var __moduleName = "public/js/dist/galactron/phaser-group";
Phaser = Phaser || {};
Phaser.Group = Phaser.Group || {};
Phaser.Group.prototype.addMany = function(other, silent) {
  if (other instanceof Array) {
    this.children = this.children.concat(other);
  } else if (other.children && other.children instanceof Array) {
    this.children = this.children.concat(other.children);
  }
};

//# sourceMappingURL=phaser-group.js.map
