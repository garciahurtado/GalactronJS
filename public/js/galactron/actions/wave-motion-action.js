/**
 * Moves a sprite in a sinusoidal wave pattern by affecting its velocity vector. 
 * 
 * - If the Sprite is static when the action is applied to it, it will begin to move in a circle
 * - If the Sprite is moving in a straight line, the wave motion will be applied orthogonal to
 * its velocity vector. IE: when a sprite is moving only along the X axis, the motion will only be 
 * applied to the Y axis
 * 
 * @author Garcia
 */
class WaveMotionAction extends Action
{
	// currentAngle; // keep track of the current angle for up and down motion (radians)
	// speed; // how fast to complete a wave cycle
	// amplitude; // the amplitude of the motion wave
	// repeat;
	
	// baseVelocity;
	// amplitudeX;
	// amplitudeY;
	
	
	/**
	 * 
	 * @param	target Target sprite whose motion will be altered
	 * @param	amplitude Amplitude of the wave applied to the motion
	 * @param	speed Speed at which the wave cycles
	 * @param	repeat Maximum number of cycles after which the action will stop. 0 = infinite cycles
	 */
	WaveMotionAction(target, amplitude, speed, repeat = 0) {
		super(target);
		
		this.amplitude = amplitude;
		this.speed = speed;
		this.repeat = repeat;

		this.TWO_PI = 2 * Math.PI;
	}
	
	/**
	 * Stores the original velocity of the target sprite before starting to change it
	 */
	start() {
		super.start();
		
		currentAngle = 0;
		baseVelocity = new FlxPoint;
		baseVelocity.x = target.velocity.x;
		baseVelocity.y = target.velocity.y;
		
		amplitudeX = baseVelocity.x * amplitude;
		amplitudeY = baseVelocity.y * amplitude;
	}
	
	/**
	 * Called to update the actions of the controlled sprite once per game update cycle
	 */
	update() {
		super.update();
		
		currentAngle += (FlxG.elapsed * speed);
		
		this.target.velocity.y = (Math.sin(currentAngle) * amplitudeX) + baseVelocity.y;
		this.target.velocity.x = (Math.cos(currentAngle) * amplitudeY) + baseVelocity.x;
		
		// stop the action if we've reached the maximum number of cycles
		if (repeat) {
			if ( (currentAngle / (TWO_PI)) > repeat) {
				finish();
			}
		}
	}
	
	finish() {
		super.finish();
		
		// restore the velocity vector of the affected sprite to its original values
		target.velocity = baseVelocity;
	}
}
