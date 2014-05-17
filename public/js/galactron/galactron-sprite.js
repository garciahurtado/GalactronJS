class GalactronSprite extends Phaser.Sprite {
	/**
	 * Overrides parent to provide hook for hurtAnimation() except when dead
	 * @param	damage
	 */
	hurt(damage) {
		super.hurt(damage);
		
		if (alive) {
			hurtAnimation();
		}
	}
	
	/**
	 * Overrides parent to provide hook for custom death animation and automatic removal from parent sprite group
	 */
	kill() {
		super.kill();
		
		if(this.inWorld){
			this.deathAnimation();
		}
	}

	/**
	 * Changes the position of this sprite, such that its center is placed exactly at the center of the 
	 * provided sprite
	 */
	centerAt(target){
		this.x = target.x + Math.round(target.width * .5);
		this.y = target.y + Math.round(target.height * .5);
		
		// substract half the width and height of this sprite from x,y to finish centering it
		this.x -= Math.round(this.width / 2);
		this.y -= Math.round(this.height / 2);
	}
			
	/**
	 * Override in child class to provide an animation that plays when this sprite is hurt, but not dead
	 */
	hurtAnimation() {
		return;
	}
	
	/**
	 * Override in child class to provide an animation that plays when this sprite is killed. Keep in mind
	 * that this function will be called after the sprite no longer exists, so it should not rely on the
	 * sprite's update() method.
	 */
	deathAnimation() {
		return;
	}
}