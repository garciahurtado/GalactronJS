/**
 * Control flow action which repeats actions in a loop the specified number of times.
 *
 * @author Garcia Hurtado
 */
import {Action} from './action';

export class LoopAction extends Action {

	constructor(limit, label = null) {
		super();
		this.limit = limit;
		this.loops = 0;
		this.label = label;
	}

	start() {

		// Check whether we have exceeded the number of loops
		if(this.limit != 0){
			if(this.loops++ >= this.limit){
				this.finish();
				return;
			}
		} 

		this.target.actions.start();
	}
}