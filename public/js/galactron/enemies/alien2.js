/**
 * Alien enemy that moves up and down using a wave function
 * 
 * @author Garcia Hurtado
 */
class Alien2 extends Alien {
	constructor(game, x, y, sprite){
		super(game, x, y, sprite);
	}

	init(){
		super();

		this.body.velocity.x = -50;
		this.body.velocity.y = 0;
		this.actions.add(new WaveMotionAction(this, 1, 3));
		this.actions.start();
	}
}

