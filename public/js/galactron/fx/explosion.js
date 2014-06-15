/**
 * 5 Frame explosion sprite. It kills itself on animation end
 * 
 * @author Garcia Hurtado
 */
class Explosion extends GalactronSprite {
	constructor(game, x, y) {
		super(game, x, y, 'explosion');
	  this.animations.add('explode', [1,2,3,4,5], 8);

	  this.sound1 = game.add.audio('explosion1');
	  this.sound2 = game.add.audio('explosion2');
	}

	explode(){
	  this.play('explode');

	  // Vary randomly between two different explosion sounds
	  var sound = Phaser.Math.randomSign() == 1 ? this.sound1 : this.sound2;
    sound.play();
	  
	  this.events.onAnimationComplete.add(function(){
	  	this.kill()
	  }, this);
	}
}
