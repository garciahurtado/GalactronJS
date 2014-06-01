/**
 * Snake-like spaceship with several segments as subsprites
 */
class Snake extends Enemy {
	constructor(game, x, y) {
		super(game, x, y);

		this.partDistance = 11; // separation between the center of the segments
		this.createParts();
	}

	init() {
		super();

		this.score = 100;
		this.health = 10;
		this.body.velocity.x = -50;

		// actions
		this.actions
			.addAction(new WaveMotionAction(this, 1, 5))
			.start();
	}

	/**
	 * On update, we must make sure that all the parts of the snake follow the head.
	 * We implement this by storing the last position of each segment, to be used by the
	 * following segment to position itself during the next frame.
	 */
	update(){
		super.update();

		// if(this.prevPos && this.parts){
		// 	this.parts.getAt(0).x = this.prevPos.x;
		// 	this.parts.getAt(0).y = this.prevPos.y;
		// }

		// // record the current position
		// this.prevPos = {x: this.x, y: this.y}; 
		// console.log("Remembering " + this.prevPos);
	}

	kill(){
		super();
		var count = this.parts.length;
		while(i=0; i<count; i++){
			this.parts.getAt(i).kill();
			this.parts.getAt(i).destroy();
		}
	}

	/**
	 * This enemy is made up of multiple subprites representing the head and body parts.
	 * Create them all at once and add them to the same group in the reverse order that they 
	 * were created, to ensure correct layering
	 */
	createParts() {
		this.parts = this.game.add.group();

		var head = new SnakeHead(this.game, this.x-1, this.y); // offset the head a tiny bit respect to the other body parts
		head.leader = this;
		this.parts.add(head); 

		var num = 10;
		var nextLeader = head;

		for(var i = 0; i < num; i++){
			var part = new SnakeBody(this.game, head.x + (i+1) * this.partDistance, 20);
			part.leaderDist = this.partDistance;
			this.game.physics.enable(part, Phaser.Physics.ARCADE);
			part.leader = nextLeader;
			nextLeader = part;
			this.parts.add(part);
		}

		// Add each body part to the display list in reverse order they were created
		this.parts.forEach(function(part) {
			this.parts.sendToBack(part);
			part.reset(this.x, this.y);
		}, this);
	}

	/**
	 * Overrides parent
	 */
	reset(x, y){
		super(x, y);
		var part;
		for (var i = 0; i < this.parts.length; i++) {
			part = this.parts.getAt(i);
			part.reset(this.x, this.y);
		};
	}
}