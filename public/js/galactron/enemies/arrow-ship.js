/**
 * Arrow Ship base
 *
 * @author Garcia
 */
import {Enemy} from './enemy';

export class ArrowShip extends Enemy
{
	constructor(game, x, y, sprite) {
		super(game, x, y, sprite);
		this.sounds.laser = game.add.audio('bullet_shot');
	}
	
	init() 
	{
		super.init();
		this.bulletSpeed = 100;
		this.score = 250;
		this.health = 20;
		
		this.body.velocity.x = -180;

		var chain = this.actions;

		this.actions
				.wait(0.1)
				.then(function(){
					this.turn(function(){
						return (Math.random() * 1) + Math.PI - 0.6; // random angle in radians
					}());
				})
				.then(new TweenAction(this.body.velocity, {x : 0, y : 0}, 2500))
				.then(this.shoot)
				.then(new TweenAction(this.body.velocity, {x : 200, y : 0}, 1000))
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
