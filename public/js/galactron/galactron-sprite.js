class GalactronSprite extends Phaser.Sprite {
	constructor(game, x = 0, y = 0, graphic) {
		this.math = game.math; // convenience
		this.immune = false;
		this.debugSprite = false; // render the sprite's bounds (expensive, debug only)
		this.debugBody = false; // render the physics body's bounds
		this.debugSpriteColor = '#00FF00'; // default color of the debug outline of the sprite (green)
		this.debugBodyColor = '#FF0000'; // default color of the debug outline of the body (red)

		super(game, x, y, graphic);
		this.actions = new ActionChain(game, this);
		game.add.existing(this.actions);		

    this.sounds = {}; // object to keep track of various FX sounds
	}

	/**
	 * Overrides parent to add debugging functionality
	 */
	update(){
		super.update();

		if(this.debugBody){
			this.game.debug.body(this, this.debugBodyColor, false);
		}
		if(this.debugSprite){
			this.game.debug.spriteBounds(this, this.debugSpriteColor, false);
		}
	}

	/**
	 * Refactor: combine with init?
	 */
	reset(x, y) {
		super(x, y, this.health);
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
	 * Override in subclass to take action when children sprites are killed (ie: to kill an invisible
	 * sprite container parent)
	 */
	onChildKilled(){
		// nothing to do
	}

	/**
	 * Override in child class to provide an animation that plays when this sprite is killed. Keep in mind
	 * that this function will be called after the sprite no longer exists, so it should not rely on the
	 * sprite's update() method.
	 */
	deathAnimation() {
		return;
	}

	revive(){
		super(this.health);
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
	 * @param target Phaser.Sprite
	 */
	centerAt(target) {
		this.x = target.world.x + Math.round(target.width * .5);
		this.y = target.world.y + Math.round(target.height * .5);

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