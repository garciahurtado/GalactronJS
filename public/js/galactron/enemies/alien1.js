/**
 * Alien enemy that moves up and down using a wave function
 * 
 * @author Garcia Hurtado
 */
class Alien1 extends Alien {
	constructor(game, x, y){
		super(game, x, y)
	}

	init(){
		super.init();
		this.velocity.x = -70;
		
		this.actions.addAction(new WaitAction(4))
			.chainAction(new CircleMotionAction(2, 0.5, CircleMotionAction.CLOCKWISE))
			.chainAction(new MethodAction(function() {
				this.velocity.y = 0; // straighten
			}))
			.chainAction(new WaitAction(2))
			.chainAction(new CircleMotionAction(2, 1.5, CircleMotionAction.COUNTERCLOCKWISE))
			.chainAction(new StopMotionAction())
			.chainAction(new MethodAction(function() {
				this.velocity.y = 70; // switch directions
				this.velocity.x = 0;
			}))
			.chainAction(new WaitAction(0.2))
			.chainAction(new WaveMotionAction(this, 1, 5)).start();
			
		//actions.addAction(new ShootAction(this), "shoot");
	}
}

