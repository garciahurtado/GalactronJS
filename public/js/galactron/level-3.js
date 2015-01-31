/**
 * Level 3. Contains custom level content:
 * - Backgrounds (inherits from Level2, for now)
 * - Enemies and waves
 * - Level boss
 *
 * @author Garcia Hurtado
 */
import {Level2} from './level-2';
import {SlidingBackground} from './sliding-background';
import {SpawnWaveAction} from './actions/spawn-wave-action';
import {WaitAction} from './actions/wait-action';
import {ActionChain} from './actions/action-chain';
import {Alien1} from './enemies/alien1';
import {ArrowShipGreen} from './enemies/arrow-ship-green';
import {CannonDrone} from './enemies/cannon-drone';

export class Level3 extends Level2 {
	constructor(game) {
		super(game);
	}

	create() {
		super.create();

		var width = this.game.width;

		this.events = new ActionChain(this.game);
		this.events.add(new WaitAction(0.5))
			.then( new SpawnWaveAction(ArrowShipGreen, [{x:width, y:120}], 40, 0.4))
			.then( new WaitAction(20))
			.then( new SpawnWaveAction(CannonDrone, [
				{x:width, y:100}, 
				{x:width, y:120}, 
				{x:width, y:140}, 
				{x:width, y:160}, 
				{x:width, y:180}, 
				{x:width, y:200}], 6, 0))
		.start();
	}
}