import {SnakeBody} from './snake-body';

export class WhiteSnakeBody extends SnakeBody {
	constructor(game, x, y) {
		super(game, x, y, 'white_snake_body');
	}
}