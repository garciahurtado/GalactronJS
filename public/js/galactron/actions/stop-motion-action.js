/**
 * ...
 * @author Garcia Hurtado
 */
import {Action} from './action';

export class StopMotionAction extends Action {
	constructor() {
		super();
	}

	start() {
		this.target.body.velocity.x = 0;
		this.target.body.velocity.y = 0;
		this.finish();
	}

}