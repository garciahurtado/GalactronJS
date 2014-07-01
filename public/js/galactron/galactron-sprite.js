class GalactronSprite extends Phaser.Sprite {
	constructor(game, x = 0, y = 0, graphic) {
		this.math = game.math; // convenience
		this.flickering = false;

		super(game, x, y, graphic);
		this.actions = new ActionChain(game, this);
		game.add.existing(this.actions);		

    this.sounds = {}; // object to keep track of various FX sounds
	}

	/**
	 * Flicker the sprite quickly for a certain amount of time, by turning the visibility on and off
	 */
	flicker(seconds = 0){
		this.flickering = true;

		if(seconds){
			this.game.time.events.add(Phaser.Timer.SECOND * seconds, function() {
				this.flickering = false;
				this.alpha = 1;
			}, this);
		}
	}

	/**
	 * Override to add flickering functionality
	 */
	update(){
		super.update();
		if(this.flickering){
			this.alpha = this.alpha ? 0 : 1;
		}
	}

	/**
	 * Refactor: combine with init?
	 */
	reset(x, y, health) {
		super(x, y, health);
		this.init();
	}

	/**
	 * Init should restart the action chain
	 */
	init() {
		if (this.actions) {
			this.actions.start();
		}
	}

	/**
	 * Overrides parent to provide hook for damageAnimation() except when dead
	 * @param	amount. Number of health points to substract from entity
	 */
	damage(amount) {
		super.damage(amount);

		if (this.alive) {
			this.damageAnimation();
		}
	}

	/**
	 * Override in child class to provide an animation that plays when this sprite is hurt, but not dead
	 */
	damageAnimation() {
		return;
	}

	/**
	 * Overrides parent to provide hook for custom death animation and automatic removal from parent sprite group
	 */
	kill() {
		super.kill();

		if (this.inWorld) {
			this.deathAnimation();
		}
	}

	/**
	 * Override in child class to provide an animation that plays when this sprite is killed. Keep in mind
	 * that this function will be called after the sprite no longer exists, so it should not rely on the
	 * sprite's update() method.
	 */
	deathAnimation() {
		return;
	}

	/* ------------- PHYSICS --------------------*/

	/**
	 * Calculate the angle of the vector between this sprite and a target, in radians
	 * 
	 * @param	target
	 */
	angleTo(target) {
		return this.math.angleBetweenPoints(this, target);
	}

	/**
	 * Return the distance in pixels between this sprite and any other target with x,y coordinates
	 */
	distanceTo(target){
		return this.math.distance(this.x, this.y, target.x, target.y);
	}

	/**
	 * Moves this sprite such that its center is placed exactly at the center of the
	 * provided sprite
	 */
	centerAt(target) {
		this.x = target.x + Math.round(target.width * .5);
		this.y = target.y + Math.round(target.height * .5);

		// substract half the width and height of this sprite from x,y to finish centering it
		this.x -= Math.round(this.width / 2);
		this.y -= Math.round(this.height / 2);
	}

	/**
	 * Convenience method that wraps Phaser.Timer
	 */
	doLater(millis, action, context){
		var context = context || this;
		this.game.time.events.add(millis, action, context);
  }
}