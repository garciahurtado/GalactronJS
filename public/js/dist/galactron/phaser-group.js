"use strict";
var __moduleName = "public/js/dist/galactron/phaser-group";
Phaser = Phaser || {};
Phaser.Group = Phaser.Group || {};
Phaser.Group.prototype.merge = function(other) {
  this.children = this.children.concat(other.children);
};

//# sourceMappingURL=phaser-group.js.map
