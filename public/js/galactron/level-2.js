/**
 * Level 2. Contains custom level content:
 * - Backgrounds
 * - Enemies and waves
 * - Level boss
 *
 * @author Garcia Hurtado
 */
import {PlayState} from './play-state';
import {SlidingBackground} from './sliding-background';
import {WaitAction} from './actions/wait-action';
import {SpawnWaveAction} from './actions/spawn-wave-action';
import {CannonDrone} from './enemies/cannon-drone';

export class Level2 extends PlayState {
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
		this.game.load.image('big_blue_world', '/images/galactron/background/big_blue_world.png');
		this.game.load.image('green_saturn', '/images/galactron/background/green_saturn.png');
		this.game.load.image('small_jupiter', '/images/galactron/background/small_jupiter.png');
		this.game.load.image('small_mars', '/images/galactron/background/small_mars.png');
	}

	create() {
		super.create();
		this.createBackground();

		var width = this.game.width;

		this.events.add(new WaitAction(0.5))
			.then( new SpawnWaveAction(CannonDrone, [
				{x:width, y:100}, 
				{x:width, y:120}, 
				{x:width, y:140}, 
				{x:width, y:160}, 
				{x:width, y:180}, 
				{x:width, y:200}], 6, 0))

		// .then( new SpawnWaveAction(this, Scorpion1, width, 150, 3, 5))
		// .then( new WaitAction(10) )
		// .then( new SpawnWaveAction(this, ArrowShipGreen, width, 150, 12, 0.3))
		// .then( new WaitAction(5) )
		// .then( new SpawnWaveAction(this, ArrowShipRed1, width, 150, 12, 0.5))
		// .then( new WaitAction(10) )
		// .then( new SpawnWaveAction(this, CannonDrone1, width, 40, 1, 0))
		// .then( new WaitAction(1) )
		// .then( new SpawnWaveAction(this, CannonDrone1, width, 80, 1, 0))
		// .then( new WaitAction(1) )
		// .then( new SpawnWaveAction(this, CannonDrone1, width, 120, 1, 0))
		// .then( new WaitAction(1) )
		// .then( new SpawnWaveAction(this, CannonDrone1, width, 160, 1, 0))
		// .then( new SpawnWaveAction(this, Freighter1, width - 50, -30, 1, 0))
		// .then( new WaitAction(3) )
		// .then( new SpawnWaveAction(this, Scorpion1, width, 100, 4, 2))
		// .then( new WaitAction(2))
		.start();
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
				starfield1.autoScroll(-70, 0);
		var starfield2 = this.game.add.tileSprite(0, 0, width, height, 'starfield2');
				starfield2.autoScroll(-90, 0);
		var starfield3 = this.game.add.tileSprite(0, 0, width, height, 'starfield3');
				starfield3.autoScroll(-110, 0);

		var greenSaturn = new SlidingBackground(this.game, 500, 50, 'green_saturn', -45);
		var smallMars = new SlidingBackground(this.game, 1300, 150, 'small_mars', -45);
		var smallJupiter = new SlidingBackground(this.game, 2500, 30, 'small_jupiter', -45);
			
		this.background.add(starfield1);
		this.background.add(starfield2);
		this.background.add(starfield3);

		this.background.add(greenSaturn);
		this.background.add(smallMars);
		this.background.add(smallJupiter);
	}
}