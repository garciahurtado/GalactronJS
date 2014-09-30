/**
 * ...
 * @author Garcia
 */
class ArrowShipGreen extends ArrowShip	{
	constructor(game, x, y) {
		super(game, x, y, 'arrow_ship_green');
		this.animations.add('spin', [9,8,7,6,5,4,3,2,1,0], 12, true);
		this.play('spin');
	}
}
