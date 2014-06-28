/**
 * Segmented white snake type enemy
 */
class WhiteSnake extends Snake {
	createHead(x, y){
		return new WhiteSnakeHead(this.game, x, y);
	}

	createBody(x, y){
		return new WhiteSnakeBody(this.game, x, y);
	}
}