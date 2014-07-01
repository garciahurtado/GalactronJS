/**
 * This action simply plays the specified animation and then finishes
 *
 * @author Garcia Hurtado
 */
class AnimationAction extends Action {
	constructor(animationName, wait = true) {
		super();
		this.animationName = animationName;
		this.wait = wait;
	}

	/**
	 * When the animation starts, we check whether we should wait until it completes all
	 * frames before starting the next action. If the action shouldn't wait, we finish() the
	 * action right away, so the next one can start. If it should wait, we add a callback to
	 * check to the animationComplete event.
	 */
	start() {
		super.start();

		this.anim = this.target.animations.getAnimation(this.animationName);

		if(!this.anim){
			console.log('Unable to find animation named ' + this.animationName + ' in target');
			return;
		}

		this.target.animations.play(this.animationName);

		if (this.wait) {
			this.anim.onComplete.add(function(){
				this.finish();
				console.log('Animation finished');
			}, this);
		} else {
			this.finish();
		}
	}
}