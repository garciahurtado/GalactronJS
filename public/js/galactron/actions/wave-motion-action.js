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
import {Action} from './action';

export class WaveMotionAction extends Action
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
	constructor(target, amplitude, speed, repeat = 0) {
		super(target);
		
		this.amplitude = amplitude;
		this.amplitudeX = this.amplitudeY = 0;
		this.speed = speed;
		this.repeat = repeat;
		this.currentAngle = 0;
	}
	
	/**
	 * Stores the original velocity of the target sprite before starting to change it
	 */
	start() {
		super.start();
		this.currentAngle = 0;

		this.baseVelocity = {
			x: this.target.body.velocity.x,
			y: this.target.body.velocity.y
		}
		
		this.amplitudeX = this.baseVelocity.x * this.amplitude;
		this.amplitudeY = this.baseVelocity.y * this.amplitude;
	}
	
	/**
	 * Called to update the actions of the controlled sprite once per game update cycle
	 */
	update() {
		var TWO_PI = 2 * Math.PI;
		
		this.currentAngle += ((this.game.time.elapsed / 1000 )* this.speed);
		
		var base = this.baseVelocity;
		var angle = this.currentAngle;
		this.target.body.velocity.y = (Math.sin(angle) * this.amplitudeX) + base.y;
		this.target.body.velocity.x = (Math.cos(angle) * this.amplitudeY) + base.x;
		
		// stop the action if we've reached the maximum number of cycles
		if (this.repeat) {
			if ( (this.currentAngle / (TWO_PI)) > this.repeat) {
				this.finish();
			}
		}
	}
	
	/**
	 * Overrides parent method to restore the velocity vector of the affected sprite to its original values.
	 * super() must happen last in order to avoid a potential bug where the following action modifies the
	 * velocity, but the WaveMotionAction overrides it right after.
	 */
	finish() {
		this.target.body.velocity = this.baseVelocity;
		super.finish();
	}
}
