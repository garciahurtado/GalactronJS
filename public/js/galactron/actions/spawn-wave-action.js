/**
 * This action acts as a enemy wave spawn event
 *
 * @author Garcia Hurtado
 */
import {Action} from './action';

export class SpawnWaveAction extends Action {
	constructor(enemyClass, spawnCoords, waveSize = 1, delay = 0) {
		super(null);
		this.enemyClass = enemyClass;
		this.spawnCoords = spawnCoords;
		this.waveSize = waveSize;
		this.delay = delay;
	}

	/**
	 * When this action starts, it will create a new enemy wave. We then need to add
	 * it to the current game state
	 */
	start() {
		super.start();
		var state = this.game.state.getCurrentState();
		this.wave = state.spawnWave(this.enemyClass, this.spawnCoords, this.waveSize, this.delay);
	}

	/**
	 * Checks to see whether the wave is finished spawing enemies, in order to trigger
	 * its finish() callback
	 */
	update() {
		super.update();
		if (this.wave.spawnCounter >= this.waveSize) {
			this.finish();
		}
	}
}