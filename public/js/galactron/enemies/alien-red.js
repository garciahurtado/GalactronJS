/**
 * Red alien enemy with the wiggly tentacles and twinkly eyes
 */
import {Alien2} from './alien2';

export class AlienRed extends Alien2 {
	constructor(game, x, y) {
		super(game, x, y, 'alien_red');

		this.x = x;
		this.y = y;

//		this.animations.add('wiggle', [0, 1, 2, 3, 2], 6, true);
		this.animations.add('wiggle', [4, 5, 6, 7], 6, true);
		this.animations.add('charge', [4, 5, 6, 7], 6, true);

		this.init();
	}
}