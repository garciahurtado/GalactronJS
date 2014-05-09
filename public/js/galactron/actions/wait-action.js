/**
 * This action simply waits for the seconds specified in the timeout parameter. If zero,
 * the action waits indefinitely.
 * 
 * @author Garcia Hurtado
 */
class WaitAction extends Action {
	// timer;
	// timeout;
	
	WaitAction(timeout = 0){
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
		timer += FlxG.elapsed;
		if (timer > timeout) { 
			finish();
		}
	}
	
}

