/**
 * Monkey patch for Phaser.Group, to add additional methods to it without messing with the source
 */
Phaser = Phaser || {};
Phaser.Group = Phaser.Group || {};

/**
 * As opposed to Group.add(), if an array is passsed,
 * add the elements of that array one by one
 */
Phaser.Group.prototype.addMany = function (other, silent) {
	if(other instanceof Array){ // "other" is a plain ol' array  
		this.children = this.children.concat(other);
	} else if(other.children && other.children instanceof Array){ // "other" is a Phaser.Group
		this.children = this.children.concat(other.children);
	} 
}