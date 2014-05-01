(function () {
	var game = new Phaser.Game(380, 260, Phaser.CANVAS, 'canvasWrapper', { preload: preload, create: create, update: update });
	 
	function preload() {
		 game.load.spritesheet('alien', 'galactron/images/alien.png', 20, 20, 4);
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
    			alien2.body.velocity.x = +10;
    		} else {
    			alien2.body.velocity.x = -10;
    		}

		    game.add.existing(alien2);	  
		}
	}
	 
	function update() {
	}
})();