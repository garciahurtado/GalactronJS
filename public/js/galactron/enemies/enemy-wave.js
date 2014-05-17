/**
 * Represents a wave of enemies that will spawn enemies into the screen until it has created a preset
 * number of them.
 *
 * It uses a sprite factory to recycle sprites. One can be provided externally or the wave will create its own.
 *
 * @author Garcia
 */

class EnemyWave extends Phaser.Sprite {
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

	constructor(game, x = 0, y = 0, enemyType = null, waveSize = 1, spawnDelay = 0) {
		super(game);

		// Physics
	  this.enableBody = true;
	  game.physics.enable(this, Phaser.Physics.ARCADE);

		this.game = game;
		this.x = x;
		this.y = y;
		this.enemyType = enemyType;
		this.waveSize = waveSize;
		this.spawnDelay = spawnDelay;

		this.enemies = game.add.group();
		this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
		this.enemies.enableBody = true;
		//this.enemies.createMultiple(10, enemyType);

		this.bullets = game.add.group();
		this.powerups = game.add.group();
		this.fx = game.add.group();
	}

	reset(x, y) {
		super.reset(x, y);
		this.spawnTimer = 0;
		this.spawnCounter = 0;
		//this.enemies.removeAll(true);
	}

	/**
	 * Check whether enough time has passed in order to spawn a new enemy
	 */
	update() {
		super.update();
		this.spawnTimer += this.game.time.elapsed / 1000; // time.elapsed is in ms, convert to seconds
		if ((this.spawnTimer > this.spawnDelay) && (this.spawnCounter < this.waveSize)) {
			this.spawnEnemy();
		}
	}

	/**
	 * Factory method for enemies part of this wave. It instantiates a new enemy, adds its bullets
	 * to the display list, and provides it with a reference to the player.
	 */
	spawnEnemy() {
		var enemy = this.enemies.getFirstExists(false);
		
		if (!enemy) {
			enemy = new this.enemyType(this.game, 0, 0);
			this.enemies.add(enemy);
		}
		enemy.reset(this.x, this.y);

		// to avoid bullets diying with the enemy, we make the enemy use the bullet array in the wave
		// TODO: refactor
		enemy.bullets = this.bullets;

		enemy.player = this.player;
		enemy.wave = this;

		this.spawnTimer = 0;
		this.spawnCounter++;
	}

	/**
	 * this method to trigger an action when an enemy in this wave is killed, such as dropping
	 * power-ups when all the enemies in the wave have been killed
	 * @param	enemy
	 */
	onEnemyKill(enemy) {
		// remove enemy sprite from the group, so it doesn't continue to update after death
		// enemies.remove(enemy);
		// bullets.remove(enemy.bullets); // same for bullets

		// if (enemies.countLiving() <= 0) {
		// 	kill();
		// 	dropPowerUp(enemy.x, enemy.y);
		// }
	}

	/**
	 * Make sure we remove reference to this wave's FX sprites
	 */
	kill() {
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