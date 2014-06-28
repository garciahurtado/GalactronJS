/**
 * This action acts as a enemy wave spawn event
 *
 * @author Garcia Hurtado
 */
class SpawnWaveAction extends Action {
	constructor(x = 0, y = 0, enemyClass, waveSize = 1, delay = 0) {
		super(null);
		this.enemyClass = enemyClass;
		this.x = x;
		this.y = y;
		this.waveSize = waveSize;
		this.delay = delay;
	}

	start() {
		super.start();
		var state = this.game.state.getCurrentState();
		this.wave = state.addWave(this.x, this.y, this.enemyClass, this.waveSize, this.delay);
	}

	update() {
		super.update();
		if (this.wave.spawnCounter >= this.waveSize) {
			this.finish();
		}
	}
}