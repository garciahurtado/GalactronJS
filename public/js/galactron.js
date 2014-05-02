(function () {
	var game = new Phaser.Game(380, 260, Phaser.CANVAS, 'canvasWrapper', { preload: preload, create: create, update: update });
	var cursors; // keep track of the cursor keys
	var player; // the main player sprite
	 
	function preload() {
		 game.load.spritesheet('alien', 'galactron/images/alien.png', 20, 20, 4);
		 game.load.spritesheet('player', 'galactron/images/player_ship.png', 33, 24, 3);
	}
	 
	function create() {

		// Scale to 2x pixels --------------
		game.stage.scale.set(2);
		game.stage.scale.minWidth = 760;
		game.stage.scale.minHeight = 520;
		game.scale.maxWidth = 760;
	  game.scale.maxHeight = 520;
		game.stage.smoothed = false;
	  

	  //  Then we tell Phaser that we want it to scale up to whatever the browser can handle, but to do it proportionally
	  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	 	game.scale.setScreenSize(true);

	 	player = createPlayer();
	 	//createAliens();

	 	cursors = game.input.keyboard.createCursorKeys();
	}

	/**
	 * Creates and returns the player sprite
	 */
	function createPlayer() {
		player = new Player(game, 50, 50);
 		game.physics.enable(player, Phaser.Physics.ARCADE);
    game.add.existing(player);	
    return player;
	}

	function createAliens() {
		// add Aliens
		var alien = new Alien(game, 20, 10);
		game.add.existing(alien, 10, 10);	
		game.physics.enable(alien, Phaser.Physics.ARCADE);
		alien.body.velocity.x = 3;

		var alien2;

		// Create 3000 aliens
		for (var i = 0; i < 3000; i++) {
    		alien2 = new Alien(game, game.world.randomX, game.world.randomY);
    		game.physics.enable(alien2, Phaser.Physics.ARCADE);
    		if(Math.random() > 0.5){
    			alien2.body.velocity.x = +30;
    		} else {
    			alien2.body.velocity.x = -30;
    		}

		    game.add.existing(alien2);	  
		}
	}
	 
	function update(game) {
		handleInput(game.time.elapsed);
	}

	/**
	 * Process user input (using the arrow keys)
	 */
	function handleInput(elapsed){
		// up & down
		if (cursors.up.isDown){
			player.moveUp(elapsed);
		} else if(cursors.down.isDown){
			player.moveDown(elapsed);
		} else {
			player.stopMovement();
		}

		// left & right
		if(cursors.left.isDown){
			player.moveLeft(elapsed);
		} else if(cursors.right.isDown) {
			player.moveRight(elapsed);
		}
	}
})();