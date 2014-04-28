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
	  
		var alien = game.add.sprite(10, 10, 'alien', 4);
		game.physics.enable(alien, Phaser.Physics.ARCADE);
		alien.body.velocity.x = 1;

		anim = alien.animations.add('wiggle', [0, 1, 2, 3, 2], 6, true);
    anim.play('wiggle');

	  //  Then we tell Phaser that we want it to scale up to whatever the browser can handle, but to do it proportionally
	  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	 	game.scale.setScreenSize(true);

	  
	}
	 
	function update() {
	}
})();