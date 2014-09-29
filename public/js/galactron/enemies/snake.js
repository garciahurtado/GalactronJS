/**
 * Snake-like spaceship with several segments as subsprites
 */
class Snake extends Enemy {
	constructor(game, x, y) {
		super(game, x, y);

		this.partDistance = 5; // separation between the center of the segments
		this.createParts();
	}

	init() {
		super();

		this.score = 100;
		this.health = 10;
		this.body.velocity.x = -100;

		// actions
		this.actions
			.add(new WaveMotionAction(this, 1.5, 5, 2))
			.then(new CircleMotionAction(2, 1))
			.then(new CircleMotionAction(2, 0.5, -1))
			.then(new MethodAction(function(){
				this.body.velocity.x = 100;
				this.body.velocity.y = 0;
			}))
			.then(new WaitAction(1.5))
			.then(new CircleMotionAction(2, 0.25, -1))
			.then(new WaitAction(1))
			.then(new CircleMotionAction(2, 0.25))
			.start();
	}

	/**
	 * When the snake is killed, we need to destroy each of the segments one by one, 
	 * starting with the head.
	 */
	kill(){
		super.kill();
		var count = this.parts.length;
		var delay = Phaser.Timer.SECOND * 0.15;
		var part;
		var index;

		for(var i=0; i<count; i++){
			index = count - i - 1;  // reverse the order in which we destroy the parts
			part = this.parts.getAt(index);

			// Space out the explosion of each body part by a small amount to simulate a chain reaction
			this.game.time.events.add(delay * i, function() {
				this.kill();
			}, part);
		}
	}

	/**
	 * This enemy is made up of multiple subprites representing the head and body parts.
	 * Create them all at once and add them to the same group in the reverse order that they 
	 * were created, to ensure correct layering
	 */
	createParts() {
		this.parts = this.game.add.group();

		var head = this.createHead(this.x-1, this.y);  // offset the head a tiny bit respect to the other body parts
		head.leader = this;
		this.parts.add(head); 

		var num = 10;
		var nextLeader = head;

		for(var i = 0; i < num; i++){
			var x = head.x + (i+1) * this.partDistance;
			var part = this.createBody(x, 20);
			this.game.physics.enable(part, Phaser.Physics.ARCADE);
			part.leaderDist = this.partDistance;
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
	 * Separate creation of head piece to allow override in child class
	 */
	createHead(x, y){
		return new SnakeHead(this.game, x, y);
	}

	/**
	 * Separate creation of body pieces to allow override in child class
	 */
	createBody(x, y){
		return new SnakeBody(this.game, x, y);
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