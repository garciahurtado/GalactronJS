/**
 * This action acts as a enemy wave spawn event
 * 
 * @author Garcia Hurtado
 */
class SpawnWaveAction extends Action 
{
	constructor(playState,enemyClass,x = 0,y = 0,waveSize = 1,delay = 0){
		super(null);
		this.playState = playState;
		this.enemyClass = enemyClass;
		this.x = x;
		this.y = y;
		this.waveSize = waveSize;
		this.delay = delay;
	}
	
	start(){
		super.start();
		var wave = playState.spriteFactory.recycle(EnemyWave);
		playState.addWave(wave, x, y, enemyClass, waveSize, delay);
	}
	
	update(){
		super.update();
		if (wave.spawnCounter >= waveSize) {
			finish();
		}
	}
}