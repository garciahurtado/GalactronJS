/**
 * First level of the game. Contains custom level code:
 * - Backgrounds
 * - Enemies and waves
 * - Level boss
 *
 * @author Garcia Hurtado
 */
import {PlayState} from './play-state';
import {SlidingBackground} from './sliding-background';
import {SpawnWaveAction} from './actions/spawn-wave-action';
import {Alien1} from './enemies/alien1';
import {Snake} from './enemies/snake';
import {WhiteSnake} from './enemies/white-snake';

export class Level1 extends PlayState {
	constructor(game) {
		super(game);

		this.starfield1;
		this.starfield2;
		this.starfield3;
		this.ground;
	}

	preload() {
		super.preload();

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
		super.create();
		this.createBackground();

		var width = this.game.width;

		// Define enemy waves and game events chain
		this.events
			// .wait(1)
			// .then(new SpawnWaveAction(
			// 	FloatingMine,[
			// 	{x: width, y: 30},
			// 	{x: width, y: 50},
			// 	{x: width, y: 70},
			// 	{x: width, y: 90},
			// 	{x: width, y: 110},
			// 	{x: width, y: 130},
			// 	{x: width, y: 150},
			// 	{x: width, y: 130},
			// 	{x: width, y: 110},
			// 	{x: width, y: 90},
			// 	{x: width, y: 70},
			// 	{x: width, y: 50}
			// 	],
			// 	10, 0.5))
			.then(new SpawnWaveAction(Alien1, [{x:width, y:130}], 30, 0.3))
			// .then(new SpawnWaveAction(Alien1, [{x:width, y:100}], 20, 0.3))
			// .then(new SpawnWaveAction(Alien1, [{x:width, y:150}], 20, 0.3))
			// .then(new SpawnWaveAction(Alien1, [{x:width, y:200}], 20, 0.3))
			// .wait(5)
			// .then(new SpawnWaveAction(AlienRed, [{x:width, y:150}], 20, 0.3))
			.wait(10)
			.then(new SpawnWaveAction(Snake, [{x:width, y:120}], 1))
			.then(new SpawnWaveAction(Snake, [{x:width, y:220}], 1))
			.wait(20)
			.then(new SpawnWaveAction(WhiteSnake, [{x:width, y:100}], 1))
			.then(new SpawnWaveAction(WhiteSnake, [{x:width, y:150}], 1))
			.then(new SpawnWaveAction(WhiteSnake, [{x:width, y:200}], 1))
			.start();
		

		// cheat :)
		//player.changeWeapon(new LaserGunQuad());

		// configure level content and events -------------------------------------------
		// var scorpion = new Scorpion1();
		// scorpion.x = 100;
		// scorpion.y = 100;

		// add(scorpion);
	}

	/**
	 * Custom level background and terrain layers
	 *
	 * @return
	 */
	createBackground() {
		var width = this.game.stage.width;
		var height = this.game.stage.height;

		// we will use several starfield tileSprites to create a parallax effect
		var starfield1 = this.game.add.tileSprite(0, 0, width, height, 'starfield1');
				starfield1.autoScroll(-120, 0);
		var starfield2 = this.game.add.tileSprite(0, 0, width, height, 'starfield2');
				starfield2.autoScroll(-130, 0);
		var starfield3 = this.game.add.tileSprite(0, 0, width, height, 'starfield3');
				starfield3.autoScroll(-160, 0);

		var greenSaturn = new SlidingBackground(this.game, 600, 50, 'green_saturn', -30);
		var smallMars = new SlidingBackground(this.game, 1300, 150, 'small_mars', -30);
		var smallJupiter = new SlidingBackground(this.game, 2500, 30, 'small_jupiter', -30);
		var bigBlueWorld = new SlidingBackground(this.game, 500, 0, 'big_blue_world', -30);
			
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