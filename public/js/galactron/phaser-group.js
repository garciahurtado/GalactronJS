/**
 * Monkey patch for Phaser.Group, to add additional methods to it without messing with the source
 */
Phaser = Phaser || {};
Phaser.Group = Phaser.Group || {};

/**
 * Merges the children of another Phaser.Group into this one
 */
Phaser.Group.prototype.merge = function(other) {
	this.children = this.children.concat(other.children);
}