/**
 * First level of the game. Contains custom level code:
 * - Backgrounds
 * - Enemies and waves
 * - Level boss
 *
 * @author Garcia Hurtado
 */
class Level1 extends PlayState {
	constructor(game) {
		super(game);

		this.starfield1;
		this.starfield2;
		this.starfield3;
		this.ground;
	}

	preload() {
		super();

		// [Embed(source = "../../../assets/terrain.png")] var groundSprite;
		// [Embed(source = "../../../assets/data/level1_ground.csv", mimeType="application/octet-stream")] var groundTilemap;

		this.game.load.spritesheet('starfield1', 'images/galactron/starfield1.png', 1920, 240);
		this.game.load.spritesheet('starfield2', 'images/galactron/starfield2.png', 960, 240);
		this.game.load.spritesheet('starfield3', 'images/galactron/starfield3.png', 960, 240);
	}

	create() {
		super();
		this.createBackground();

		// var alien = new Alien(this.game, 20, 10);
		// this.game.add.existing(alien, 10, 10);	
		// alien.body.velocity.x = 3;

		var wave = this.addWave(this.game.width, 150, Alien1, 20, 0.3);
		this.enemies.add(wave.enemies);

		//wave.body.velocity.x = -20;

		// cheat :)
		//player.changeWeapon(new LaserGunQuad());

		// configure level content and events -------------------------------------------
		// var scorpion = new Scorpion1();
		// scorpion.x = 100;
		// scorpion.y = 100;

		// add(scorpion);

		var width = this.game.stage.bounds.width;

		//this.events.addAction(new WaitAction(0.5))
			// .chainAction(new SpawnWaveAction(this, Alien1, width, 150, 20, 0.2))
			// .chainAction(new WaitAction(2))
		// .chainAction( new SpawnWaveAction(this, AlienRedWave, width, 150, 20, 0.2))
		// .chainAction( new WaitAction(5) )
		// .chainAction( new SpawnWaveAction(this, Scorpion1, width, 150, 3, 5))
		// .chainAction( new WaitAction(10) )
		// .chainAction( new SpawnWaveAction(this, ArrowShipGreen, width, 150, 12, 0.3))
		// .chainAction( new WaitAction(5) )
		// .chainAction( new SpawnWaveAction(this, ArrowShipRed1, width, 150, 12, 0.5))
		// .chainAction( new WaitAction(10) )
		// .chainAction( new SpawnWaveAction(this, CannonDrone1, width, 40, 1, 0))
		// .chainAction( new WaitAction(1) )
		// .chainAction( new SpawnWaveAction(this, CannonDrone1, width, 80, 1, 0))
		// .chainAction( new WaitAction(1) )
		// .chainAction( new SpawnWaveAction(this, CannonDrone1, width, 120, 1, 0))
		// .chainAction( new WaitAction(1) )
		// .chainAction( new SpawnWaveAction(this, CannonDrone1, width, 160, 1, 0))
		// .chainAction( new SpawnWaveAction(this, Freighter1, width - 50, -30, 1, 0))
		// .chainAction( new WaitAction(3) )
		// .chainAction( new SpawnWaveAction(this, Scorpion1, width, 100, 4, 2))
		// .chainAction( new WaitAction(2))
		//.start();
	}

	/**
	 * Custom level background and terrain layers
	 *
	 * @return
	 */
	createBackground() {
		var width = this.game.stage.bounds.width;
		var height = this.game.stage.bounds.height;

		// we will use several starfield sprites to create a parallax effect
		var starfield1 = this.game.add.tileSprite(0, 0, width, height, 'starfield1');
		var starfield2 = this.game.add.tileSprite(0, 0, width, height, 'starfield2');
		var starfield3 = this.game.add.tileSprite(0, 0, width, height, 'starfield3');

		this.background.add(starfield1);
		this.background.add(starfield2);
		this.background.add(starfield3);

		starfield1.autoScroll(-110, 0);
		starfield2.autoScroll(-125, 0);
		starfield3.autoScroll(-140, 0);

		// var starfield1 = new LoopingTilemap(); 
		// starfield1.loadMap("1,2,3,2,1,4", starfieldSprite1, 320, 240);
		// starfield1.scrollFactor.x = 0.17;

		// var starfield2 = new LoopingTilemap(); 
		// starfield2.loadMap("2,1,2,1,3", starfieldSprite2, 320, 240);
		// starfield2.scrollFactor.x = 0.2;

		// var starfield3 = new LoopingTilemap(); 
		// starfield3.loadMap("1,2,3", starfieldSprite3, 320, 240);
		// starfield3.scrollFactor.x = 0.23;

		// // Add the ground tilemap
		// ground = new FlxTilemap();
		// ground.solid = true;
		// ground.x = 400;
		// ground.y = 0;
		// ground.loadMap( new groundTilemap, groundSprite, 32, 32, FlxTilemap.OFF, 0, 1, 1 );
		// ground.scrollFactor.x = 0.25;

		// background.add(starfield1);
		// background.add(starfield2);
		// background.add(starfield3);
		// background.add(ground);
		// return background;
	}
}