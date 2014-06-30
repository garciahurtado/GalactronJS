/**
 * This action modifies a single variable over time with the specified easing algorithm.
 * Relies on the Tweener library to provide transformations and transitions
 * 
 * @author Garcia Hurtado
 */
class TweenAction extends Action 
{
	// properties;
	
	constructor(target, properties, time, transition = null) 
	{
		super(target);
		this.time = time;
		this.transition = transition;
		this.properties = properties;
	}
	
	start()
	{
		super.start();
		this.anim = this.target.game.add.tween(this.target);
    this.anim.to(this.properties, this.time, this.transition);
    this.anim.onComplete.add(this.finish, this);
    this.anim.start();
	}
}
