/**
 * This action calls sets a specified property to a certain value immediately and without any transition.
 *
 * This is a zero duration action.
 *
 * @author Garcia Hurtado
 */
import {Action} from './action';

export class PropertyAction extends Action {
	// properties;

	constructor(target, properties) {
		super(target);
		this.target = target;
		this.properties = properties;
	}

	start() {
		super.start();

		for (var name in properties) {
			this.target[name] = properties[name];
		}
		//FlxG.log("In property action [" + name + "] = [" + properties[name] + "]");

		finish();
	}

}