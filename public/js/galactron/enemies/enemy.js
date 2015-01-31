/**
 * Represents a generic type of enemy which has a life meter and can be programmed to follow paths and attack the player.
 * @author Garcia
 */
import {GalactronSprite} from '../galactron-sprite';
import {Explosion} from '../fx/explosion';

export class Enemy extends GalactronSprite {
	/*
	bullets;
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
	}

	/**
	 * Add the bullets from this weapon to the enemy's bullet list and a reference to its spriteFactory
	 * @param	weapon
	 */
	addWeapon(weapon) {
		weapon.bullets = this.bullets;
		weapon.spriteFactory = spriteFactory;
	}

	/**
	 * Create a bullet of the specified class, at the given coordinates, and enable its Physics body
	 * as well as add it to the bullets array of this enemy
	 */
	createBullet(bulletClass, x = this.x, y = this.y){
		var bullet = new bulletClass(this.game, x, y);
    bullet.enableBody = true;
    this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
		this.bullets.add(bullet);
		bullet.reset(x, y);
		return bullet;
	}
}