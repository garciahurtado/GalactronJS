/**
 * Represents a wave of enemies that will spawn enemies into the screen until it has created a preset 
 * number of them.
 * 
 * It uses a sprite factory to recycle sprites. One can be provided externally or the wave will create its own.
 * 
 * @author Garcia
 */

class EnemyWave extends Phaser.Sprite
{
	// enemyType;
	// waveSize; // number of enemies in this wave
	// spawnDelay; // number of seconds to wait between enemy spawns
	// spawnTimer; // keep track of the last time we spawned an enemy in this wave
	// spawnCounter; // how many enemies have spawned in this wave so far
	// player; // keep track of the player position so that we can aim and shoot at them
	// bullets; // all the bullets from all the enemies in the wave, to simplify collision
	// powerups; // the powerups that this wave drops
	// playState;
	// fx; // TODO: remove
	// enemies;
	
	EnemyWave(game, x = 0, y = 0, enemyType = null, waveSize = 1, spawnDelay = 0) 
	{
		super(game);
		this.x = x;
		this.y = y;
		this.enemyType = enemyType;
		this.waveSize = waveSize;
		this.spawnDelay = spawnDelay;
		this.enemies = new FlxGroup();
		this.bullets = new FlxGroup();
		this.powerups = new FlxGroup();
		this.fx = new FlxGroup();
	}
	
	reset(x, y)
	{
		super.reset(x, y);
		this.spawnTimer = 0;
		this.spawnCounter = 0;
		enemies.clear();
	}
	
	/**
	 * Check whether enough time has passed in order to spawn a new enemy
	 */
	update() {
		super.update();
		
		this.spawnTimer += FlxG.elapsed;
		if ((spawnTimer > spawnDelay) && (spawnCounter < waveSize)) {
			spawnEnemy();
		}			
	}
	
	/**
	 * Factory method for enemies part of this wave. It instantiates a new enemy, adds its bullets
	 * to the display list, and provides it with a reference to the player.
	 */
	spawnEnemy() {
		enemy = recycle(enemyType);
		
		enemy.spriteFactory = spriteFactory;
		
		// to avoid bullets diying with the enemy, we make the enemy use the bullet array in the wave
		enemy.bullets = this.bullets;
		
		enemy.reset(x, y);
		enemy.revive();
		enemy.player = player;
		enemy.wave = this;
		
		// FlxG.state.add(enemy.subSprites); // hack
		
		// check to make sure the enemy is not already part of this wave (ie: being recycled)
		if(enemies.members.indexOf(enemy) == -1){
			enemies.add(enemy);
		}
		
		spawnTimer = 0; 
		spawnCounter++;
	}
	
	/**
	 * this method to trigger an action when an enemy in this wave is killed, such as dropping
	 * power-ups when all the enemies in the wave have been killed
	 * @param	enemy
	 */
	onEnemyKill(enemy) {
		// remove enemy sprite from the group, so it doesn't continue to update after death
		enemies.remove(enemy); 
		bullets.remove(enemy.bullets); // same for bullets
		
		if(enemies.countLiving() <= 0){
			kill();
			dropPowerUp(enemy.x, enemy.y);
		}
	}
	
	/**
	 * Make sure we remove reference to this wave's FX sprites
	 */
	kill()
	{
		super.kill();
		if (playState) {
	//		playState.fx.remove(this.fx);
		}
	}
	
	dropPowerUp(x, y) {
		//return; // debug
		powerup = recycle(PowerUp);
		powerup.x = x;
		powerup.y = y;
		powerups.add(powerup);
	}
}
