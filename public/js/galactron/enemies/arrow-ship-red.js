﻿/**
 * ...
 * @author Garcia
 */
import {ArrowShip} from './arrow-ship';

export class ArrowShipRed extends ArrowShip
{
	constructor(game, x, y)	{
		super(game, x, y, 'arrow_ship_red');
		this.animations.add('spin', [0,1,2,3,4,5,6,7,8,9], 12, true);
	}
	
	init() {
		super.init();
		this.play('spin');
	}
}
