/**
 * Alien enemy that moves up and down using a wave function
 * 
 * @author Garcia Hurtado
 */
class Alien2 extends Alien {
	constructor(game, x, y){
		super(game, x, y);
	}

	init(){
		super();

		this.body.velocity.x = -50;
		this.body.velocity.y = 0;
		this.actions.addAction(new WaveMotionAction(this, 1, 3));
		this.actions.start();
	}
}

