/**
 * Body part of the Snake type enemy. There should be several of these.
 */
import {Enemy} from './enemy';

export class SnakeBody extends Enemy {
	constructor(game, x, y, sprite) {
		sprite = sprite || 'red_snake_body';
		super(game, x, y, sprite);
		this.leader; // target sprite to follow
		this.trackingDist = 10; // max distance to trail the leader sprite by
		this.lastLeaderPos;
		this.lastElapsed;
		this.game.physics.enable(this, Phaser.Physics.ARCADE);
		//this.anchor.setTo(0.5, 0.5);
	}

	update(){
		super.update();

		// ensure we keep within the max distance of the leader
		if(this.leader && (this.distanceTo(this.leader) > this.trackingDist)){
			// bring it closer
			var distance = new Phaser.Point(this.x - this.leader.x, this.y - this.leader.y);
			distance.setMagnitude(this.trackingDist);
			this.x = this.leader.x + distance.x;
			this.y = this.leader.y + distance.y;
		}
	}
}