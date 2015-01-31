/**
 * Head sprite of the Snake type enemy. There should only be one.
 */
import {Enemy} from './enemy';

export class SnakeHead extends Enemy {
	constructor(game, x, y, sprite) {
		sprite = sprite || 'red_snake_head';
		super(game, x, y, sprite);
		this.game.physics.enable(this, Phaser.Physics.ARCADE);
		// this.anchor.setTo(0.5, 0.5);
	}

	update(){
		super.update();
		if(this.leader){
			this.body.velocity = this.leader.body.velocity;
			this.x = this.leader.x;
			this.y = this.leader.y;
		}
	}
}