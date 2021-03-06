﻿/**
 * Represents a wave of enemies that will spawn enemies into the screen until it has created a 
 * preset number of them.
 *
 * It uses a sprite factory to recycle sprites. One can be provided externally or the wave will 
 * create its own.
 *
 * @param game - Instance of the Phaser game
 * @param spawnCoords {x: 0, y: 0} - Object - Array of starting X,Y coordinates for new enemies spawned.
 *  If the array has a single element, this element will be used for all enemy spawns.
 * @param enemyType = null - Class of the enemy that this wave will Spawn. Can also be an array of
 *  classes (TODO)
 * @param waveSize = 1 - Total number of enemies to spawn
 * @param spawnDelay = 0 - Number of seconds to wait between enemy spawns. Zero will spawn all 
 *  enemies instantly
 *
 * @author Garcia Hurtado <ghurtado@gmail.com>
 */
import {GalactronSprite} from '../galactron-sprite';

export class EnemyWave extends GalactronSprite {
	// spawnDelay; // number of seconds to wait between enemy spawns
	// spawnTimer; // keep track of the last time we spawned an enemy in this wave
	// spawnCounter; // how many enemies have spawned in this wave so far
	// player; // keep track of the player position so that we can aim and shoot at them
	// bullets; // all the bullets from all the enemies in the wave, to simplify collision
	// powerups; // the powerups that this wave drops
	// playState;
	// fx; // TODO: remove
	// enemies;

	constructor(game, enemyType, spawnCoords, waveSize = 1, spawnDelay = 0) {
		super(game);
		this.playState = game.state.getCurrentState();

		// Physics
	  game.physics.enable(this, Phaser.Physics.ARCADE);

		this.game = game;
		this.spawnCoords = spawnCoords;
		this.init();

		this.enemyType = enemyType;
		this.waveSize = waveSize;
		this.spawnDelay = spawnDelay;
		this.onSpawnEnemy = false; // callback to use when enemies are spawned

		this.debugSprite = false;
		this.debugColor = '#FF6600';

		this.powerups = game.add.group();
		this.fx = game.add.group();
	}

	/**
	 * Resets the spawn timer, counter and the index of x, y coordinate lists
	 */
	init() {
		this.spawnTimer = 0;
		this.spawnCounter = 0;
		this.spawnCoordsIndex = 0;
	}

	/**
	 * Check whether enough time has passed in order to spawn a new enemy
	 */
	update() {
		super.update();
		this.spawnTimer += this.game.time.elapsed / 1000; // time.elapsed is in ms, convert to seconds

		if ((this.spawnTimer > this.spawnDelay) && (this.spawnCounter < this.waveSize)) {
			this.spawnEnemy();

			// Since this wave has no delay, continue spawning until all enemies have been created
			if(this.spawnDelay == 0){
				this.update();
			}
		}
	}

	/**
	 * Factory method for enemies part of this wave. It instantiates a new enemy, adds its bullets
	 * to the display list, and provides it with a reference to the player.
	 */
	spawnEnemy() {
		//var enemy = this.enemies.getFirstDead(false);
		var enemy = false;

		if (!enemy) {
			enemy = new this.enemyType(this.game, 0, 0);
			if(this.onSpawnEnemy){
				this.onSpawnEnemy(enemy);
			}
		}
		var current = this.spawnCoords[this.spawnCoordsIndex];
		enemy.reset(current.x, current.y);

		// Increment the coordinate index, or reset to zero if we reach the end of the coords list
		if(++this.spawnCoordsIndex >= this.spawnCoords.length){
			this.spawnCoordsIndex = 0;
		}

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
		if (this.playState) {
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