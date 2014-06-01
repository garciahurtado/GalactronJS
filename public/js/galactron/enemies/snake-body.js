/**
 * Body part of the Snake type enemy. There should be several of these.
 */
class SnakeBody extends Enemy {
	constructor(game, x, y) {
		super(game, x, y, 'white_snake_body');
		this.leader; // target sprite to follow
		this.leaderDist = 10; // max distance to trail the leader sprite by
		this.anchor.setTo(0.5, 0.5);
	}

	update(){
		super();

		if(this.leaderLastVel){
			this.body.velocity = this.leaderLastVel;
		}

		// If this sprite is too far away from its leader, bring it closer
		if(this.leader && (this.distanceTo(this.leader) > this.leaderDist)){
			var deltaVector = new Phaser.Point(this.x - this.leader.x, this.y - this.leader.y);

			// limit the vector's length (magnitude) so that it is no longer than the maximum
			// distance between this sprite and its leader
			deltaVector.setMagnitude(this.leaderDist); 

			// Apply the delta vector to the position of the leader sprite, to move 
			// this sprite close to it
			this.x = this.leader.x + deltaVector.x; 
			this.y = this.leader.y + deltaVector.y;
		}
	}

	init(){
		super();

		if(this.leader){
			this.x = this.leader.x;
			this.y = this.leader.y;
		}
	}
}