import {SnakeHead} from './snake-head';

export class WhiteSnakeHead extends SnakeHead {
	constructor(game, x, y) {
		super(game, x, y, 'white_snake_head');
	}
}