/**
 * Base Playstate class. Provides base functionality used by all "playable" levels in the game. It
 * is meant to be extended by individual levels to provide custom functionality and level content such as:
 *
 * - Level backgrounds and graphics
 * - Level specific enemies and waves
 * - Final boss for each level
 * 
 * @author Garcia Hurtado
 */
class PlayState {

	constructor(game){
		this.camera;
		this.player;
		this.playerLayer;
		this.playerBullets;
		this.fx;
		this.events;
		
		/**
		 * @var An enemy is simply something that the player can kill and which can kill the player
		 */
		this.enemies;
		this.waves;
		
		/**
		 * @var An enemy bullet is a sprite that can kill the player but cannot be hit by the player
		 */
		this.enemyBullets;
		this.powerups;
		this.background;

		this.isGameOver;
		this.score;
		
		// GUI sprites
		this.gui;
		this.lives;
		this.livesSprites;
		this.scoreDisplay;
		this.controls;

		this.game = game;
	}

	preload(){
		// [Embed(source = "../../../assets/sounds/music.mp3")] private var music;
		
		// Free font from http//mfs.sub.jp/font.html
		// [Embed(source = "../../../assets/firewire_black.ttf", fontFamily = "firewire_black", embedAsCFF="false")] private var firewireBlackFont;
		// [Embed(source = "../../../assets/firewire.ttf", fontFamily="firewire", embedAsCFF="false")] private var firewireFont;
	}

	create(){
		this.events = new ActionChain(this.game);
		
		// set start game configuration
		this.score = 0;
		this.scoreDisplay;
		this.lives = 3;
		this.isGameOver = false;
		
		// create sprite groups / layers in order of Z display (background layers first)
		// spriteFactory = new SpriteFactory();
		this.background = this.game.add.group();
		this.waves = this.game.add.group();

		this.enemies = this.game.add.group();
		this.enemyBullets = this.game.add.group();

		this.playerBullets = this.game.add.group();
		this.playerBullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.game.physics.arcade.enable(this.playerBullets);

		this.player;
		this.playerLayer = this.game.add.group();
		this.powerups = this.game.add.group();
		this.fx = this.game.add.group();
		this.gui = this.game.add.group();
		this.livesSprites = this.game.add.group();
		
		// camera = new FlxObject(0, 0);
		// camera.x = 160; // place the camera in the middle of the screen
		// camera.y = 120; 
		
		// // start at high speed and gradually slow down
		// //camera.velocity.x = 1000;
		// camera.velocity.x = 300;
		
	//		FlxG.bgColor = 0xff000000;
		
		// add(createBackground());
		// add(waves);
		// add(enemies);
		// add(playerBullets);
		// add(enemyBullets);
		// add(playerLayer);
		// add(fx);
		// add(powerups);
		// add(camera);
		//this.game.add(gui);
		
		this.spawnPlayer();
		this.createHud(); // creating the HUD at the end allows it to sit on the top layer
		
		// Add the FPS overlay
		//var fpsCounter = new FrameRateCounter(4, 200);
		//addStatic(fpsCounter);

		// create controls
	 	this.controls = this.game.input.keyboard.createCursorKeys();
	 	this.controls.fire = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
		// FlxG.play(music, 1, false);

 		this.game.physics.startSystem(Phaser.Physics.ARCADE);
	}
		
	/**
	 * Creates the lives / score display on the top layer of the screen
	 * @todo Bullets overlap the HUD but they should appear behind it
	 */
	createHud() {
		var offset = 0;
		
		// creates the "lives" display
		for (var i = 0; i < this.lives; i++) {
			var life = new Phaser.Sprite(this.game, 5 + offset, 5, 'player_life');
			this.livesSprites.add(life);
			offset += 18;
		}
		
		// creates the score display
		this.scoreDisplay = this.createText("00000000", 320, 5);
		this.addStatic(this.scoreDisplay);			
	}
		
	/**
	 * Adds a certain number of points to the current score
	 * @param	points
	 */
	addScore(points) {
		this.score += points;
		this.scoreDisplay.text = Utils.padString(this.score.toString(), 8, 0);
	}
		
	/**
	 * Adds a sprite to the display list which is not meant to scroll, such as interface 
	 * elements, player lives, score, etc...
	 * 
	 * @param	FlxSprite
	 */
	addStatic(sprite) {
		// sprite.scrollFactor.x = 0;
		// sprite.scrollFactor.y = 0;
		this.gui.add(sprite);
	}
		
	/**
	 * The main update loop. Does collision checks between player and enemies and viceversa.
	 */
	update()	{
		this.playerInput(this.game.time.elapsed);
		
		// if (FlxG.paused) {
		// 	return;
		// }
		
		// super.update();
	//	events.update();
	//	FlxG.camera.follow(camera);
		
		// if the game is over there is no need to check for collissions
		if (this.isGameOver) {
			return;
		}
		
		// // did we pick up a powerup?
		// FlxG.overlap(player, powerups, powerUp);

		// check whether any player bullets hit an enemy
		// this.playerBullets.overlap(this.enemies, this.enemyHit, this);

		// TODO: figure out how to do collision detection with nested groups
		this.game.physics.arcade.overlap(this.playerBullets, this.enemies.children[0], this.enemyHit, null, this);
		
		if(this.player.flickering == false){ // player is not immune
			// check whether the player was hit by enemies or enemy bullets
			// FlxG.overlap(player, enemies, playerHit);
			// FlxG.overlap(player, enemyBullets, playerHit);
		}
	}

	/**
	 * Handle the player input events and control the player sprite accordingly.
	 */
	playerInput(elapsed)	{
		var keys = this.controls;

		if (!this.isGameOver) {
			// up & down
		if (keys.up.isDown){
			this.player.moveUp(elapsed);
		} else if(keys.down.isDown){
			this.player.moveDown(elapsed);
		} else {
			this.player.stopMovement();
		}

		// left & right
		if(keys.left.isDown){
			this.player.moveLeft(elapsed);
		} else if(keys.right.isDown) {
			this.player.moveRight(elapsed);
		}

		if(keys.fire.isDown){
			this.player.fire();
		}
			
			// if (FlxG.keys.SPACE) {
			// 	player.shoot();
			// }
			// if (FlxG.keys.justPressed("C")) {
			// 	player.cycleWeapon();
			// }
			// // Pause game
			// if (FlxG.keys.justPressed("P")) {
			// 	FlxG.paused = !FlxG.paused;
			// }
		} else { // Game Over state
			// if(FlxG.keys.ENTER) {
			// 	FlxG.switchState( new Level1() );
			// 	return;
			// }
		}
	}

	/**
	 * Adds a new wave to the game, adds the wave's bullets to the collision array, and the wave's enemies
	 * and powerups to the playstate
	 * 
	 * @param	wave
	 */
	addWave(x, y, enemyType, count, delay)	{
		// defaults
		delay = typeof delay !== 'undefined' ? delay : 0;
		count = typeof count !== 'undefined' ? count : 1;

		// TODO: Extract to SpriteFactory (also in enemy-wave.js)
		var wave = this.waves.getFirstExists(false);
		if(!wave){
			wave = new EnemyWave(this.game, x, y, enemyType, count, delay);
			this.waves.add(wave);
		}

		wave.reset(x, y);
		// wave.enemyType = enemyType;
		// wave.waveSize = count;
		// wave.spawnDelay = delay;
		
		wave.player = this.player;
//		wave.spriteFactory = spriteFactory;
		// add(wave.fx);
		
		this.enemies.add(wave.enemies);
		this.enemyBullets.add(wave.bullets);

	
	// powerups.add(wave.powerups);

		return wave;
	}

	/**
	 * A player bullet hits an enemy
	 * @param	bullet
	 * @param	enemy
	 */
	enemyHit(bullet, enemy) {
		bullet.kill();
		enemy.damage(bullet.power);
		
		// if (!enemy.alive) { // the enemy was killed by the bullet
		// 	this.addScore(enemy.score);
		// }
	}

	/**
	 * Called when any enemies, enemy bullets or objects hit the player
	 * 
	 * @param	player
	 * @param	enemy
	 */
	playerHit(player, enemy) {
		this.player.kill();
		
		// update the lives counter in the HUD
			var lostLife = this.livesSprites.members[this.lives - 1];
		lostLife.kill();
		this.lives--;
		
		if (this.lives > 0) {
			Utils.doLater(2000, function() {
				this.spawnPlayer(); // wait 2 seconds before respawn
			}); 
		} else {
			Utils.doLater(600, function() {
				this.gameOver();
			});
		}
	}

	/**
	 * Called when a powerup is picked up
	 * @param	bullet
	 * @param	enemy
	 */
	powerUp(ship, powerup) {
		// add a little FX to the powerup pickup
		var explosion = new LaserExplosion(powerup.x, powerup.y);
		explosion.velocity = powerup.velocity;
		// add(explosion);
		explosion.explode();
		
		powerup.kill();
		//powerup.destroy();
		
		var newWeapon = player.mainWeapon.powerUp();
		if(newWeapon){
			player.changeWeapon(newWeapon);
		}
	}

	/**
	 * Create the player spaceship and its initial weapons
	 */
	spawnPlayer() {
		this.player = new PlayerShip(this.game, 0, 100);
	//	player.flicker(3);
		this.player.body.velocity.x = 100;
		// player.enemies = enemies; 
		//player.spriteFactory = spriteFactory;
		
		//var missile1 = new MissileWeapon();
		//missile1.angle = Math.PI; // aim the missiles towards the back
		//player.changeMissileWeapon(missile1);
		//player.changeWeapon(new LaserGun());
		
		this.playerBullets = this.player.bullets;

			// prevent player from going outside the viewport bounds
		this.player.body.collideWorldBounds = true;
		this.playerLayer.add(this.player);
	}

	/**
	 * Draw the Game Over screen
	 */
	gameOver() {
		isGameOver = true;
		
		var txt = createText("GAME OVER", -400, Math.floor(FlxG.height / 2) - 20);
		txt.setFormat("firewire", 24);
		var txt2 = createText("GAME OVER", -400, Math.floor(FlxG.height / 2) - 20);
		txt2.setFormat("firewire_black", 24, 0xFFFF0000); 
		
		// Tweener.addTween(txt, { x, time.2, transition"linear" } );
		// Tweener.addTween(txt2, { x, time.2, transition"linear" } );
		
		var moreTxt = createText("PRESS ENTER TO RESTART", 300, 200);
	//		Tweener.addTween(moreTxt, { x, time.2, transition"linear" } );
		
		var gradientColors = FlxGradient.createGradientArray(1, 20, [ 0xff0000ff, 0xffff00ff, 0xFFFFFF00, 0xFF00FF00 ], 1);
		var gradientSprite = FlxGradient.createGradientFlxSprite(100, 100, [0xffff0000, 0xffffff00], 2 ); 
		gradientSprite.scrollFactor.x = 0;
		gradientSprite.scrollFactor.y = 0;
		gradientSprite.x = 0;
		gradientSprite.y = 0;
		//var grad = FlxGradient.overlayGradientOnBitmapData(txt.pixels, 50, 50, [0xFFFF0000, 0xFFFFFF00], 100);
		//txt2.pixels = grad;
		
		
		//	The final display
		var maskedGradient = new FlxSprite(100, 100);
		maskedGradient.scrollFactor = txt2.scrollFactor;
		//add(maskedGradient);

		//FlxDisplay.alphaMask(gradientSprite.pixels, txt.pixels, maskedGradient);
		FlxGradient.overlayGradientOnBitmapData(this.player.pixels, 100, 100, gradientColors);
	}

	/**
	 * Add dynamic text to the screen in a specified position, and return it
	 */
	createText(text, x, y, color, width) {
		x = typeof x !== 'undefined' ? x : 0;
		y = typeof y !== 'undefined' ? y : 0;
		color = typeof color !== 'undefined' ? color : 0xFFFFFFFF;
		width = typeof width !== 'undefined' ? width : this.game.world.width;
		
		//var txt = new FlxText(x, y, FlxG.width, text);
		var style = { font: "8px FirewireBlack", fill: "#FFFFFF", align: "center" };
	  var txt = this.game.add.text(x, y, text, style);
	  txt.align = 'right';

		// txt.scrollFactor.x = 0;
		// txt.scrollFactor.y = 0;
		return txt;
	}
}
