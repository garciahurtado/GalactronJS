/**
 * Player spaceship
 */
var Player = function(game, x, y){
	// Inherits from Sprite
	Phaser.Sprite.call(this, game, x, y, 'player');

	this.x = x;
	this.y = y;

	this.maxSpeed = 160;

	this.animations.add('normal', [0], 1, false);
	this.animations.add('down', [1], 1, false);
	this.animations.add('up', [2], 1, false);
  this.play('normal');

  this.moveUp = function(elapsed){
  	this.play('up');
  	this.y -= this.maxSpeed * elapsed / 1000;	
  };

  this.moveDown = function(elapsed){
  	this.play('down');
  	this.y += this.maxSpeed * elapsed / 1000;	
  };

  this.moveRight = function(elapsed){
  	this.play('right');
  	this.x += this.maxSpeed * elapsed / 1000;	
  };

  this.moveLeft = function(elapsed){
  	this.play('left');
  	this.x -= this.maxSpeed * elapsed / 1000;	
  };

  this.stopMovement = function(){
  	this.play('normal');
  }
}

// Player.prototype.moveUp = function(){
	
// }

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;