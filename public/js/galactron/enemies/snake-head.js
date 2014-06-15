/**
 * Head sprite of the Snake type enemy. There should only be one.
 */
class SnakeHead extends Enemy {
	constructor(game, x, y) {
		super(game, x, y, 'white_snake_head');
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