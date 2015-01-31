/**
 * Segmented white snake type enemy
 */
import {Snake} from './snake';
import {WhiteSnakeHead} from './white-snake-head';
import {WhiteSnakeBody} from './white-snake-body';

export class WhiteSnake extends Snake {
	createHead(x, y){
		return new WhiteSnakeHead(this.game, x, y);
	}

	createBody(x, y){
		return new WhiteSnakeBody(this.game, x, y);
	}
}