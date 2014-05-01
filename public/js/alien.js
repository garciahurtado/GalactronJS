/**
 * Green alien enemy with the wiggly tentacles
 */
var Alien = function(game, x, y){
	// Inherits from Sprite
	Phaser.Sprite.call(this, game, x, y, 'alien');

	this.x = x;
	this.y = y;

	anim = this.animations.add('wiggle', [0, 1, 2, 3, 2], 6, true);
  anim.play('wiggle');
}

Alien.prototype = Object.create(Phaser.Sprite.prototype);
Alien.prototype.constructor = Alien;