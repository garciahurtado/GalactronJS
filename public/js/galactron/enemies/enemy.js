/**
 * Represents a generic type of enemy which has a life meter and can be programmed to follow paths and attack the player.
 * @author Garcia
 */
class Enemy extends GalactronSprite {
	/*
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

		// Add subsprites group as direct child, so positioning will be relative to main sprite
    this.subSprites = game.add.group();
    this.addChild(this.subSprites); 

		this.bullets = game.add.group();
  	this.subSprites.add(this.bullets);

		this.explosions = game.add.group();
		this.explosions.classType = Explosion;
		this.explosions.createMultiple(5);

		this.game.physics.enable(this, Phaser.Physics.ARCADE);
		this.sounds.dent = game.add.audio('dent');
	}

	/**
	 * Called automatically from parent constructor when the object is instantiated and when it is recycled.
	 * It starts the actions chain.
	 */
	init() {
		super.init();

		// Prepare a filter, but do not activate, for when we need it
		var colorMatrix =  [
	    1,0,0,0,
	    0,1,0,0,
	    0,0,1,0,
	    0,0,0,1
	  ];
		this.colorFilter = new PIXI.ColorMatrixFilter();
	  this.colorFilter.matrix = colorMatrix;

	  this.timer = this.game.time.events; // convenience

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
		var explosion = this.explosions.getRandom();
		explosion.reset(); // spawn explosion in the middle of the enemy sprite
		explosion.centerAt(this);
		explosion.explode();
	}

	/**
	 * Custom hurt animation. Plays a sound and flashes the sprite with a quick white fill 
	 * a couple of times in a row.
	 */
	damageAnimation() {

		//FlxG.play(dentSound);
		this.sounds.dent.play(); 
		this.doLater(0, this.fillWhite, this);
		this.doLater(30, this.resetFilters, this);
		this.doLater(60, this.fillWhite, this);
		this.doLater(90, this.resetFilters, this);
	}

	/**
	 * Apply an all white filter to the sprite, respecting alpha
	 */
	fillWhite() {
		this.colorFilter.matrix =  [
	    0,0,0,1,
	    0,0,0,1,
	    0,0,0,1,
	    0,0,0,1
	  ];

	  this.filters = [this.colorFilter];
	}

	/**
	 * Resets the PIXI filters to none
	 */
	resetFilters() {
		this.filters = null;
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
}