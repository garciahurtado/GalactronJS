/**
 * This action modifies one or several object properties over time using the specified
 * easing algorithm. It uses the buit in Phaser Tweener
 * 
 * @param target - Target sprite that the action will affect
 * @param properties - Object of properties to modify and their target values
 * @param time - Duration of the tween, in ms
 * @param transision - Easing function to apply to the Tween (must be a Phaser.Easing)
 * 
 * @author Garcia Hurtado
 */
class TweenAction extends Action 
{
	constructor(target, properties, time, transition = null)	{
		super(target);
		this.time = time;
		this.transition = transition;
		this.properties = properties;
	}
	
	start()	{
		super.start();
		this.tween = this.target.game.add.tween(this.target);
    this.tween.to(this.properties, this.time, this.transition);
    this.tween.onComplete.add(this.finish, this);
    this.tween.start();
	}
}
