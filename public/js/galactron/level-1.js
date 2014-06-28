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

		// Starfields
		this.game.load.spritesheet('starfield1', 'images/galactron/background/starfield1.png', 1920, 240);
		this.game.load.spritesheet('starfield2', 'images/galactron/background/starfield2.png', 960, 240);
		this.game.load.spritesheet('starfield3', 'images/galactron/background/starfield3.png', 960, 240);

		// Planets
		this.game.load.image('big_blue_world', 'images/galactron/background/big_blue_world.png');
		this.game.load.image('green_saturn', 'images/galactron/background/green_saturn.png');
		this.game.load.image('small_jupiter', 'images/galactron/background/small_jupiter.png');
		this.game.load.image('small_mars', 'images/galactron/background/small_mars.png');
	}

	create() {
		super();
		this.createBackground();

		var width = this.game.width;

		// Define enemy waves and game events chain
		this.events.addAction(new WaitAction(2))
			.chainAction(new SpawnWaveAction(width, 150, Alien1,  20, 0.3))
			.chainAction(new WaitAction(5))
			.chainAction(new SpawnWaveAction(width, 100, AlienRed,  20, 0.3))
			.chainAction(new WaitAction(15))
			.chainAction(new SpawnWaveAction(width, 100, Snake, 1))
			.chainAction(new SpawnWaveAction(width, 180, Snake, 1))
			.chainAction(new WaitAction(10))
			.chainAction(new SpawnWaveAction(width, 100, WhiteSnake, 1))
			.chainAction(new SpawnWaveAction(width, 150, WhiteSnake, 1))
			.chainAction(new SpawnWaveAction(width, 200, WhiteSnake, 1))
			.start();
		

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

		// we will use several starfield tileSprites to create a parallax effect
		var starfield1 = this.game.add.tileSprite(0, 0, width, height, 'starfield1');
				starfield1.autoScroll(-70, 0);
		var starfield2 = this.game.add.tileSprite(0, 0, width, height, 'starfield2');
				starfield2.autoScroll(-90, 0);
		var starfield3 = this.game.add.tileSprite(0, 0, width, height, 'starfield3');
				starfield3.autoScroll(-110, 0);

		var greenSaturn = new SlidingBackground(this.game, 600, 50, 'green_saturn', -45);
		var smallMars = new SlidingBackground(this.game, 1300, 150, 'small_mars', -45);
		var smallJupiter = new SlidingBackground(this.game, 2500, 30, 'small_jupiter', -45);
		var bigBlueWorld = new SlidingBackground(this.game, 500, 0, 'big_blue_world', -45);
			
		this.background.add(starfield1);
		this.background.add(starfield2);
		this.background.add(starfield3);

		// this.background.add(greenSaturn);
		this.background.add(smallMars);
		this.background.add(smallJupiter);
		this.background.add(bigBlueWorld);

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