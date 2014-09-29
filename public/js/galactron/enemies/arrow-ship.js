﻿/**
 * Arrow Ship base
 *
 * @author Garcia
 */
class ArrowShip extends Enemy
{
	constructor(game, x, y, sprite) {
		super(game, x, y, sprite);
		this.sounds.laser = game.add.audio('bullet_shot');
	}
	
	init() 
	{
		super();
		this.bulletSpeed = 150;
		this.score = 250;
		this.health = 20;
		
		this.body.velocity.x = -100;

		var chain = this.actions;

		this.actions
				.wait(0.4)
				.then(this.shoot)
				.loop(4)
				.then(function(){
					this.body.velocity.x = 50;
					this.body.velocity.y = -10;
				})
			.start();
	}
	
	/**
	 * Shoot a bullet towards the player
	 */
	shoot()  {
		this.sounds.laser.play();
		var bullet = this.createBullet(OvalBullet);
		bullet.body.velocity.x = -this.bulletSpeed;
		
		if (this.player) { // aim the bullet at the player
			this.game.physics.arcade.moveToObject(bullet, this.player, this.bulletSpeed);
		}
	}
}
