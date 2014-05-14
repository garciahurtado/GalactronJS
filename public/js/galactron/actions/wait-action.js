/**
 * This action simply waits for the seconds specified in the timeout parameter. If zero,
 * the action waits indefinitely.
 * 
 * @author Garcia Hurtado
 */
class WaitAction extends Action {
	// timer;
	// timeout;
	
	constructor(timeout = 0){
		super();
		this.timeout = timeout;
	}
	
	init()	{
		super.init();
		this.timer = 0;
	}
	
	start()	{
		super.start();
	}
	
	/**
	 * Check whether enough time has passed to finish the wait
	 */
	update()	{
		this.timer += this.game.time.elapsed / 1000;
		if (this.timer > this.timeout) { 
			this.finish();
		}
	}
	
}

