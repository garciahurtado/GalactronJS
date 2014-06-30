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
	 * action right away. If it should wait, we add a callback to check for the animation to end
	 */
	start() {
		super.start();
		target.play(animationName);

		if (wait) {
			target.addAnimationCallback(checkFinished);
		} else {
			finish();
		}
	}

	/**
	 * Check whether the animation has finished, and if so, finish the action to that
	 * the next action can start
	 */
	checkFinished(currentAnimationName, currentFrame, currentFrameIndex) {
		if (!running || finished) {
			return;
		}
		if (currentAnimationName == animationName) {
			currentAnimation = target.getCurrentAnimation();

			if (currentFrame == (currentAnimation.frames.length - 1)) {
				this.finish();
				finished = true; // mark finished right away to avoid double firing the delayed finish() call
			}
		}
	}
}