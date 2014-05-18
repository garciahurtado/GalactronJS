/**
 * @author Garcia Hurtado
 */
class Explosion extends GalactronSprite {
	constructor(game, x, y) {
		super(game, x, y, 'explosion');
	  this.animations.add('explode', [1,2,3,4,5], 8);
	}

	explode(){
	  this.play('explode');
	  this.events.onAnimationComplete.add(function(){
	  	this.kill()
	  }, this);
	}
}
