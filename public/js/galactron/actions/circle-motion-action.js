	/**
	 * Moves a sprite in a circular motion
	 *
	 * @author Garcia
	 */

	class CircleMotionAction extends Action {
		// angle;
		//speed;
		//repeat;
		//direction;

		//baseVelocity;
		
		/**
		 *
		 * @param	target Target sprite whose motion will be altered
		 * @param	speed Speed at which the target velocity vector will be rotated
		 * @param	circles Number of circles after which the action will stop. 0 = continue indefinitely
		 * @param	direction Either CLOCKWISE or COUNTERCLOCKWISE
		 */
		constructor(speed, circles = 0, direction = 1) {
			super();
			
			this.speed = speed;
			this.circles = circles;
			this.direction = direction;
			this.TWO_PI = 2 * Math.PI;
			
			this.init();
		}

		init(){
			this.angle = 0;
			this.baseVelocity = {x: 0, y: 0};
		}

		/**
		 * Stores the original velocity of the target sprite before starting to change it
		 */
		start() {
			super.start();

			if(this.target){
				this.baseVelocity = {
					x: this.target.body.velocity.x,
					y: this.target.body.velocity.y
				}
			}
		}

		/**
		 * Rotate the sprite
		 */
		update() {
			var elapsed = this.game.time.elapsed / 1000;

			if (this.direction == CircleMotionAction.CLOCKWISE) {
				this.angle -= (elapsed * this.speed);
			} else {
				this.angle += (elapsed * this.speed);
			}

			var base = this.baseVelocity;
			var angle = this.angle;

			this.target.body.velocity.x = (base.x * Math.cos(angle)) - (base.y * Math.sin(angle));
			this.target.body.velocity.y = (base.y * Math.cos(angle)) - (base.x * Math.sin(angle));

			// stop the action if we've reached the maximum number of cycles
			if (this.circles) {
				if ((Math.abs(angle) / this.TWO_PI) > this.circles) {
					this.angle = this.circles * this.TWO_PI; // just before finish, correct angle back to max value
					this.finish();
				}
			}
		}
	}

CircleMotionAction.CLOCKWISE = 1;
CircleMotionAction.COUNTERCLOCKWISE = 2;
