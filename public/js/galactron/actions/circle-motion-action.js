	/**
	 * Moves a sprite in a circular motion
	 * 
	 * @author Garcia
	 */
	class CircleMotionAction extends Action
	{
		// angle;
		//speed;
		//repeat;
		//direction;
		//CLOCKWISE = 1;
		// COUNTERCLOCKWISE = 2;
		//baseVelocity;
		// 
		
		/**
		 * 
		 * @param	target Target sprite whose motion will be altered
		 * @param	speed Speed of the rotation
		 * @param	repeat Number of revolutions after which the action will stop. 0 = continue indefinitely
		 * @param	direction Either CLOCKWISE or COUNTERCLOCKWISE
		 */
		CircleMotionAction(speed,repeat = 0,direction = CircleMotionAction.CLOCKWISE) {
			super();
			this.speed = speed;
			this.repeat = repeat;
			this.direction = direction;
			this.angle = 0;
			this.TWO_PI = 2 * Math.PI;
		}
		
		/**
		 * Stores the original velocity of the target sprite before starting to change it
		 */
		start() {
			super.start();
			baseVelocity = new FlxPoint;
			baseVelocity.x = target.velocity.x;
			baseVelocity.y = target.velocity.y;
		}
		
		/**
		 * Rotate the sprite
		 */
		update() {
			super.update();
			
			if(direction == CircleMotionAction.CLOCKWISE){
				angle -= (FlxG.elapsed * speed);
			} else {
				angle += (FlxG.elapsed * speed);
			}
			
			this.target.velocity.x = (baseVelocity.x * Math.cos(angle)) - (baseVelocity.y * Math.sin(angle));
			this.target.velocity.y = (baseVelocity.y * Math.cos(angle)) - (baseVelocity.x * Math.sin(angle));
			
			// stop the action if we've reached the maximum number of cycles
			if (repeat) {
				if ( (Math.abs(angle) / (TWO_PI)) > repeat) {
					finish();
				}
			}
		}
	}
