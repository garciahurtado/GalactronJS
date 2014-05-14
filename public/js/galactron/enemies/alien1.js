/**
 * Alien enemy that moves up and down using a wave function
 * 
 * @author Garcia Hurtado
 */
class Alien1 extends Alien {
	constructor(game, x, y){
		super(game, x, y);
	}

	init(){
		super();

		this.body.velocity.x = -50;

		this.actions.addAction(new WaitAction(2))
			.chainAction(new CircleMotionAction(1, 1, CircleMotionAction.CLOCKWISE))
			.chainAction(new MethodAction(function() {
				this.body.velocity.y = 0; // straighten
			}))
			.chainAction(new WaitAction(2))
			.chainAction(new CircleMotionAction(1, 1.5, CircleMotionAction.COUNTERCLOCKWISE))
			.chainAction(new StopMotionAction())
			.chainAction(new MethodAction(function() {
				this.body.velocity.y = 70; // switch directions
				this.body.velocity.x = 0;
			}))
			.chainAction(new WaitAction(0.2))
			.chainAction(new WaveMotionAction(this, 1, 5))
			;
			
		//actions.addAction(new ShootAction(this), "shoot");
	}
}

