(function () {
	var game = new Phaser.Game(
		380,
		260,
		Phaser.WEBGL, // needed for filters
		'canvasWrapper',
		{ preload: preload, create: create, update: update }
	);

	var controls; // keep track of the cursor keys

	var player; // the main player sprite
	var bullets; // player bullets
	var enemies; // anything that can kill the player
	 
	function preload() {
		// Load graphics
		game.load.image('player_life', 'images/galactron/player_life.png');
		game.load.spritesheet('player', 'images/galactron/player_ship.png', 34, 25, 3);
		game.load.spritesheet('player_flame', 'images/galactron/fx/player_ship_flame.png', 12, 25, 2);
		game.load.spritesheet('laser_blue', 'images/galactron/fx/laser_blue.png', 16, 3, 1);
		game.load.spritesheet('laser_blue_beam', 'images/galactron/fx/laser_blue_beam.png', 530, 20);
		game.load.spritesheet('explosion', 'images/galactron/fx/explosion.png', 35, 35, 6);
		game.load.spritesheet('alien', 'images/galactron/enemies/alien.png', 20, 20);
		game.load.spritesheet('alien_red', 'images/galactron/enemies/alien_red.png', 20, 20);
		game.load.spritesheet('cannon_drone', 'images/galactron/enemies/cannon_drone.png', 12, 20);
		game.load.spritesheet('floating_mine', 'images/galactron/enemies/floating_mine.png', 21, 21);
		game.load.spritesheet('floating_mine_spike', 'images/galactron/enemies/floating_mine_spike.png', 5, 5);
		game.load.spritesheet('red_snake_head', 'images/galactron/enemies/red_snake_head.png', 19, 24);
		game.load.spritesheet('red_snake_body', 'images/galactron/enemies/red_snake_body.png', 16, 16);
		game.load.spritesheet('white_snake_head', 'images/galactron/enemies/white_snake_head.png', 19, 24);
		game.load.spritesheet('white_snake_body', 'images/galactron/enemies/white_snake_body.png', 16, 16);

		// Load sounds
		game.load.audio('explosion1', 'sounds/explosion1.mp3');
		game.load.audio('explosion2', 'sounds/explosion2.mp3');
		game.load.audio('laser', 'sounds/laser.mp3');
		game.load.audio('dent', 'sounds/dent.mp3');
		game.load.audio('large_beam', 'sounds/large_beam.mp3');
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
		game.state.add('MenuState', MenuState);
		game.state.add('Level1', Level1);
		game.state.add('Level2', Level2);

	 	game.state.start('MenuState');
	}

	/**
	 * Adds a previously created sprite to the game
	 */
	function addSprite(sprite) {
		game.add.existing(sprite);
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