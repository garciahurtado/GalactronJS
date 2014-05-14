﻿/**
 * Represents a generic type of enemy which has a life meter and can be programmed to follow paths and attack the player.
 * @author Garcia
 */
class Enemy extends Phaser.Sprite {
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

	constructor(game, x = 0, y = 0, graphic) 
	{
		super(game, x, y, graphic);
		this.actions = new ActionChain(game, this);
		game.add.existing(this.actions);
		this.bullets = game.add.group();
	}
	
	/**
	 * Called automatically from parent constructor when the object is instantiated and when it is recycled.
	 * It enables Physics on the sprite, and starts the actions chain.
	 */
	init() 
	{
		this.game.physics.enable(this, Phaser.Physics.ARCADE);

		if(this.actions){
			this.actions.start();
		}

		this.lastShot = 0;
		this.score = 0;
		this.offscreenLifespan = 2;
	}
	
	/**
	 * If this enemy belongs to a wave, notify the wave that this enemy has died
	 */
	kill() 
	{
		super.kill();
		
		if (this.wave) {
			this.wave.onEnemyKill(this);
		}
	}
	
	/**
	 * Custom death animation (explosion)
	 */
	deathAnimation() {
		// locate the explosion in the middle of the sprite
		var explosion = recycle(Explosion);
		addSubSprite(explosion);
		explosion.centerAt(this);
		explosion.velocity.x = velocity.x;
		explosion.velocity.y = velocity.y;
		explosion.explode();
	}
	
	/**
	 * Custom hurt animation. Plays a sound and flashes the sprite with a quick white fill
	 */
	hurtAnimation() {
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
	 * Create a bullet from the Sprite factory, position it, and reference the bullets group from it
	 * @param	bulletType
	 * @param	x
	 * @param	y
	 * @return
	 */
	createBullet(bulletType,x,y)
	{
		var bullet = spriteFactory.recycle(bulletType);
		bullet.reset(x, y);
		bullet.parentGroup = bullets;
		
		bullets.add(bullet);
		return bullet;
	}
	
	/**
	 * Add the bullets from this weapon to the enemy's bullet list and a reference to its spriteFactory
	 * @param	weapon
	 */
	addWeapon(weapon)
	{
		weapon.bullets = this.bullets;
		weapon.spriteFactory = spriteFactory;
	}

	reset(x, y, health) {
		super.reset(x, y, health);
		this.init();
	}
}

