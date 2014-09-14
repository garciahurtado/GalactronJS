/**
 * @author Garcia Hurtado
 */
class OvalBullet extends Bullet {
	constructor(game) {
		super(game, 0, 0, 'oval_bullet');
		this.animations.add('on', [0, 1, 2, 3], 15, true);
		this.play('on');
		this.power = 10;
	}
}
