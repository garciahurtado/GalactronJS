/**
 * ...
 * @author Garcia Hurtado
 */
class StopMotionAction extends Action 
{
	StopMotionAction() 
	{
		super();
	}
	
	start()
	{
		target.velocity.x = 0;
		target.velocity.y = 0;
		finish();
	}
	
}
