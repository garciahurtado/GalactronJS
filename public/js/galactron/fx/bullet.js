/**
 * Bullet sprite class. Extends Phaser.Sprite to provide damage variable
 *
 * @author Garcia Hurtado
 */
class Bullet extends Phaser.Sprite {
	constructor(game, x, y, sprite) {
		super(game, x, y, sprite);
		this.power = 1;
	}
}
