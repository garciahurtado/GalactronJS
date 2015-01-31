/**
 * This action modifies one or several object properties over time using the specified
 * easing algorithm. It uses the buit in Phaser Tweener
 * 
 * @param subject - Object (or property, this can refer to a deep object like player.velocity)
 *  whose properties will be modified by the Tween.
 * @param properties - Hash of property names to modify and their end values
 * @param time - Duration of the tween, in ms
 * @param transision - Easing function to apply to the Tween (must be a Phaser.Easing)
 * 
 * @author Garcia Hurtado
 */
import {Action} from './action';

export class TweenAction extends Action 
{
	constructor(subject, properties, time, transition = null)	{
		super();
		this.subject = subject;
		this.properties = properties;
		this.time = time;
		this.transition = transition;
	}
	
	start()	{
		super.start();
		this.tween = this.target.game.add.tween(this.subject);
    this.tween.to(this.properties, this.time, this.transition);
    this.tween.onComplete.add(this.finish, this);
    this.tween.start();
	}
}
