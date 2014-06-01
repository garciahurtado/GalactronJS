(function () {
	var game = new Phaser.Game(
		380,
		260,
		Phaser.CANVAS,
		'canvasWrapper',
		{ preload: preload, create: create, update: update }
	);

	var controls; // keep track of the cursor keys

	var player; // the main player sprite
	var bullets; // player bullets
	var enemies; // anything that can kill the player
	 
	function preload() {
		game.load.image('player_life', 'images/galactron/player_life.png', 13, 10, 1);
		game.load.spritesheet('player', 'images/galactron/player_ship.png', 33, 24, 3);
		game.load.spritesheet('laser_blue', 'images/galactron/laser_blue.png', 16, 3, 1);
		game.load.spritesheet('explosion', 'images/galactron/explosion.png', 35, 35, 6);
		game.load.spritesheet('alien', 'images/galactron/enemies/alien.png', 20, 20);
		game.load.spritesheet('white_snake_head', 'images/galactron/enemies/white_snake_head.png', 19, 24);
		game.load.spritesheet('white_snake_body', 'images/galactron/enemies/white_snake_body.png', 16, 16);
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

	 	// Add game states
		game.state.add('Level1', Level1);
	 	game.state.start('Level1');
	}

	/**
	 * Adds a previously created sprite, its subsprites and bullets, to the game
	 */
	function addSprite(sprite) {
		game.add.existing(sprite);
		//game.add.existing(sprite.subSprites);
	}

	function createRandomAliens() {
		// add Aliens
		var alien = new Alien(game, 20, 10);
		game.add.existing(alien, 10, 10);	
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
		// Nothing actually happens here
	}
})();