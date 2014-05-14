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
		if (transition == null) {
			transition = Equations.easeNone;
		}
		properties['time'] = time;
		properties['transition'] = transition;
		properties['onComplete'] = this.finish;
		properties['rounded'] = true;
		this.properties = properties;
	}
	
	init()
	{
		super.init();
		Tweener.removeTweens(target);
	}
	
	start()
	{
		super.start();
		Tweener.addTween(target, properties);
	}
}
