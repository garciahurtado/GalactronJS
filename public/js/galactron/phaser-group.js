/**
 * Monkey patch for Phaser.Group, to add additional methods to it without messing with the source
 */
Phaser = Phaser || {};
Phaser.Group = Phaser.Group || {};

/**
 * As opposed to Group.add(), if an array is passsed,
 * add the elements of that array one by one
 */
Phaser.Group.prototype.addMany = function (other) {
	var newChildren;
	if(other instanceof Array){ // "other" is a plain ol' array  
		newChildren = other;
	} else if(other.children && other.children instanceof Array){ // "other" is a Phaser.Group
		newChildren = other.children;
	} 

	// Add we use Group.add, the length of the newChildren group decreases, so a reverse loop is needed
	for (var i = newChildren.length - 1; i >= 0; i--) {
		this.copyChildAt(newChildren[i], this.children.length);
	};
}

/**
 * Similar to PIXI's addChildAt, but doesn't change the object's parent, so that an object can 
 * belong to more than one group without causing positioning issues (ie: when adding a sprite's 
 * children)
 */
Phaser.Group.prototype.copyChildAt = function(child, index) {
	this.children.splice(index, 0, child);
}