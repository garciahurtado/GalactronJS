/**
 * @author Garcia Hurtado
 */
class BlueLaserBeam extends Bullet {
	constructor(game) {
		super(game, 0, 0, 'laser_blue_beam');
		this.animations.add('on', [0,1], 30, true);
		this.power = 10;
	}
}
