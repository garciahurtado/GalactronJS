/**
 * 5 Frame explosion sprite. It kills itself on animation end
 * 
 * @author Garcia Hurtado
 */
import {GalactronSprite} from '../galactron-sprite';

export class Explosion extends GalactronSprite {
	constructor(game, x, y) {
		super(game, x, y, 'explosion');
	  this.animations.add('explode', [1,2,3,4,5], 8);

	  this.sound1 = game.add.audio('explosion1');
	  this.sound2 = game.add.audio('explosion2');
	  // this.game.physics.enable(this, Phaser.Physics.ARCADE);

	}

	explode(){
	  this.play('explode');
	  // this.body.velocity.x = -50;

	  // Vary randomly between two different explosion sounds
	  var sound = Phaser.Math.randomSign() == 1 ? this.sound1 : this.sound2;
    sound.play();
	  
	  this.events.onAnimationComplete.add(function(){
	  	this.kill()
	  }, this);
	}
}
