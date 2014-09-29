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
		var Circle = CircleMotionAction;

		this.actions
			.wait(2)
			.then(new Circle(1, 1, Circle.COUNTERCLOCKWISE))
			.wait(1.5)
			.then(new Circle(1, 1.5, Circle.CLOCKWISE))
			.then(new StopMotionAction())
			.then(function() {
				this.body.velocity = {x:0, y:70}; // switch directions
			})
			.wait(0.2)
			.then(new WaveMotionAction(this, 1, 5))
			;
			
		//actions.add(new ShootAction(this), "shoot");
	}
}

