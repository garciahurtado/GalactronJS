/**
 * @author Garcia Hurtado
 */
import {Bullet} from './bullet';

export class BlueLaser extends Bullet {
	constructor(game) {
		super(game, 0, 0, 'laser_blue');
		this.power = 10;
	}
}
