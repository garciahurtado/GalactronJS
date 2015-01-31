import {GalactronSprite} from '../galactron-sprite';

/**
 * Bullet sprite class. Extends Phaser.Sprite to provide damage variable
 *
 * @author Garcia Hurtado
 */
export class Bullet extends GalactronSprite {
	constructor(game, x, y, sprite) {
		super(game, x, y, sprite);
		this.power = 1;
	}
}
