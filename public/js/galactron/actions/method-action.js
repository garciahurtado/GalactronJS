/**
 * This action calls the specified method in the target sprite or an anonymous function.
 *
 * If used to execute an anonymous function, the target sprite is available via the 
 * "target" variable (see superclass "Action").
 *
 * Ex. 1 - Calling an existing method:
 *
 * 		var action = new MethodAction(sprite.shoot);
 *
 * Ex. 2 - Calling an anonymous function:
 *
 * 		var action = new MethodAction(function(){
 * 	   		target.velocity.x = 60;
 * 		});
 *
 * @author Garcia Hurtado
 */
import {Action} from './action';

export class MethodAction extends Action {
	// method;
	// params;

	constructor(method, params = null) {
		super();
		this.method = method;
		this.params = params;
	}

	start() {
		super.start();

		// Binding this actions' target object to the "this" ref used in the context of the 
		// callback allows us to refer to "this" within the callback and access the object that 
		// this action belongs to.
		this.method.apply(this.target, this.params);
		this.finish();
	}
}