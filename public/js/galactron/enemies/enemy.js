/**
 * Represents a generic type of enemy which has a life meter and can be programmed to follow paths and attack the player.
 * @author Garcia
 */
class Enemy extends GalactronSprite {
	/*
	sparks;
	bullets;
	lastShot;
	player;
	wave; // the wave this enemy belongs to, if any
	score; // how many points you get for killing this guy
	weapon;
	
	[Embed(source="../../../../assets/sounds/dent.mp3")] dentSound;
	*/

	constructor(game, x = 0, y = 0, graphic) {
		super(game, x, y, graphic);

		this.bullets = game.add.group();

		this.explosions = game.add.group();
		this.explosions.classType = Explosion;
		this.explosions.createMultiple(5);
	}

	/**
	 * Called automatically from parent constructor when the object is instantiated and when it is recycled.
	 * It enables Physics on the sprite, and starts the actions chain.
	 */
	init() {
		super.init();
		this.game.physics.enable(this, Phaser.Physics.ARCADE);

		this.lastShot = 0;
		this.score = 0;
		this.offscreenLifespan = 2;
	}

	/**
	 * If this enemy belongs to a wave, notify the wave that this enemy has died
	 */
	kill() {
		super.kill();

		if (this.wave) {
			this.wave.onEnemyKill(this);
		}
	}

	/**
	 * Custom death animation (explosion)
	 */
	deathAnimation() {
		var explosion = this.explosions.getFirstDead();
		explosion.reset(); // spawn explosion in the middle of the enemy sprite
		explosion.centerAt(this);
		explosion.explode();
	}

	/**
	 * Custom hurt animation. Plays a sound and flashes the sprite with a quick white fill
	 */
	hurtAnimation() {
		deathAnimation();

		//FlxG.play(dentSound);
		// this.addColorFill(0xFFFFFF);
		// self = this;
		// Utils.doLater(30, function(){
		// 	self.removeColorFill(); 
		// });
		// Utils.doLater(60, function(){
		// 	self.addColorFill(0xFFFFFF);
		// });
		// Utils.doLater(90, function(){
		// 	self.removeColorFill(); 
		// });
	}

	update() {
		super.update();
		this.lastShot += this.game.time.delta;
	}

	shoot() {
		lastShot = 0;
	}

	/**
	 * Add the bullets from this weapon to the enemy's bullet list and a reference to its spriteFactory
	 * @param	weapon
	 */
	addWeapon(weapon) {
		weapon.bullets = this.bullets;
		weapon.spriteFactory = spriteFactory;
	}

	reset(x, y, health) {
		super.reset(x, y, health);
		this.init();
	}
}