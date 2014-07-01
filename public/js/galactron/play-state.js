
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
		this.game.load.script('abstracFilter', '/js/lib/pixi/abstract-filter.js');
		this.game.load.script('filter', '/js/lib/pixi/color-matrix-filter.js');
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
		this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.game.physics.arcade.enable(this.enemyBullets);

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
		
		// // start level at high speed and gradually slow down
		// //camera.velocity.x = 1000;
		// camera.velocity.x = 300;
		
	//		FlxG.bgColor = 0xff000000;
		
		// add(createBackground());
		// add(waves);
		// add(playerBullets);
		// add(enemyBullets);
		
		this.spawnPlayer();
		this.createHud(); // creating the HUD at the end allows it to sit on the top layer
		
		// Add the FPS overlay
		//var fpsCounter = new FrameRateCounter(4, 200);
		//addStatic(fpsCounter);

		this.enableInput();
				
		// FlxG.play(music, 1, false);

 		this.game.physics.startSystem(Phaser.Physics.ARCADE);
	}

	/**
	 * Wire up the keyboard controls 
	 */
	enableInput() {
		// create controls
	 	this.controls = this.game.input.keyboard.createCursorKeys();
	 	this.controls.fire = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
	 	this.controls.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

	 	// Add Pause key
	 	this.controls.pause = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
	 	this.controls.pause.onDown.add(function(){
		  this.game.paused = !this.game.paused;
		}, this);
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
		this.scoreDisplay = this.createText("00000000", 370, 16, 8, 'FirewireBlack', '#FFFFFF', 'right');
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
		
		this.events.update();
	//	FlxG.camera.follow(camera);
		
		// if the game is over, shortcut collissions checks
		if (this.isGameOver) {
			return;
		}
		
		// // did we pick up a powerup?
		// FlxG.overlap(player, powerups, powerUp);

		// check whether any player bullets hit an enemy
		// this.playerBullets.overlap(this.enemies, this.enemyHit, this);

		// TODO: figure out how to do collision detection with nested groups (this.enemies instead of this.enemies.children)
		this.game.physics.arcade.overlap(this.playerBullets, this.enemies.children, this.enemyHit, null, this);
		
		// check whether the player was hit by enemies or enemy bullets
		if(!this.player.flickering){ // player is not immune
			this.game.physics.arcade.overlap(this.enemies.children[0], this.player, this.playerHit, null, this);
			this.game.physics.arcade.overlap(this.enemyBullets.children[0], this.player, this.playerHit, null, this);
			console.log('Length of bullets: ' + this.enemyBullets.children[0].length);
			// FlxG.overlap(player, enemies, playerHit);
			// FlxG.overlap(player, enemyBullets, playerHit);
		}
	}

	/**
	 * Adds a new wave to the game, adds the wave's bullets to the collision array, and the wave's enemies
	 * and powerups to the playstate
	 * 
	 * @param	wave
	 */
	addWave(enemyType, spawnCoords, count, delay)	{
		// defaults
		delay = typeof delay !== 'undefined' ? delay : 0;
		count = typeof count !== 'undefined' ? count : 1;

		// TODO: Extract to SpriteFactory (also in enemy-wave.js) / add recycling
		var wave = this.waves.getFirstExists(false);
		if(!wave){
			wave = new EnemyWave(this.game, enemyType, spawnCoords, count, delay);
			this.waves.add(wave);
		}

		wave.init();

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
		
		if (!enemy.alive) { // the enemy was killed by the bullet
			this.addScore(enemy.score);
		}
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
		var lostLife = this.livesSprites.children[this.lives - 1];
		lostLife.kill();
		this.lives--;
		
		var sec = Phaser.Timer.SECOND;
		var self = this;
		if (this.lives > 0) {
    	this.game.time.events.add(sec * 2, function() {
				this.spawnPlayer(); // wait 2 seconds before respawn
			}, this); 
		} else {
			this.game.time.events.add(sec * 0.6, function() {
				this.gameOver();
			}, this);
		}
	}

	/**
	 * Handle the player input events and control the player sprite accordingly.
	 */
	playerInput(elapsed)	{
		var keys = this.controls;

		if (!this.isGameOver) {
			// Keys below are only valid when player is alive
			if(!this.player.exists){
				return false;
			}

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
			
			// if (FlxG.keys.justPressed("C")) {
			// 	player.cycleWeapon();
			// }

		} else { // Game Over state
			if(keys.enter.isDown) {
				this.game.state.start('Level1');
				return;
			}
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
		this.player.body.velocity.x = 100;
		this.player.flicker(3);

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
		this.isGameOver = true;

		var left = Math.floor(this.game.width / 2);
		var top = Math.floor(this.game.height / 2);

		// TODO: Text cuts off at the last pixel block
		var txt = this.createText("GAME OVER", -400, top, 24, 'Firewire', '#FFFFFF', 'center');
		var txt2 = this.createText("GAME OVER", -400, top, 24, 'FirewireBlack', '#FF0000', 'center');
		
	 	this.game.add.tween(txt).to( { x: left }, 200, Phaser.Easing.Linear.None, true, 0, false);
	 	this.game.add.tween(txt2).to( { x: left }, 200, Phaser.Easing.Linear.None, true, 0, false);
		
		var moreTxt = this.createText("PRESS ENTER TO RESTART", 500, 200);
	 	this.game.add.tween(moreTxt).to( { x: left }, 200, Phaser.Easing.Linear.None, true, 0, false);
		
		// var gradientColors = FlxGradient.createGradientArray(1, 20, [ 0xff0000ff, 0xffff00ff, 0xFFFFFF00, 0xFF00FF00 ], 1);
		// var gradientSprite = FlxGradient.createGradientFlxSprite(100, 100, [0xffff0000, 0xffffff00], 2 ); 
		// gradientSprite.scrollFactor.x = 0;
		// gradientSprite.scrollFactor.y = 0;
		// gradientSprite.x = 0;
		// gradientSprite.y = 0;
		//var grad = FlxGradient.overlayGradientOnBitmapData(txt.pixels, 50, 50, [0xFFFF0000, 0xFFFFFF00], 100);
		//txt2.pixels = grad;
		
		
		//	The final display
		// var maskedGradient = new FlxSprite(100, 100);
		// maskedGradient.scrollFactor = txt2.scrollFactor;
		//add(maskedGradient);

		//FlxDisplay.alphaMask(gradientSprite.pixels, txt.pixels, maskedGradient);
		//FlxGradient.overlayGradientOnBitmapData(this.player.pixels, 100, 100, gradientColors);
	}

	/**
	 * Add dynamic text to the screen in a specified position, and return it
	 */
	createText(text, x, y, size = 8, font = 'FirewireBlack', color = "#FFFFFF", align = 'center') {
		var style = { font: size + "px " + font, fill: color, align: align};
	  var txt = this.game.add.text(x, y, text, style);

		if(align == 'center'){
			txt.anchor.setTo(0.5, 0.5);
		} else if(align == 'right'){
			txt.anchor.setTo(1, 1);
		}

		return txt;
	}

	/**
	 * Convenience method that wraps Phaser.Timer
	 */
	doLater(millis, action, context){
		var context = context || this;
		this.game.time.events.add(millis, action, context);
  }
}
