/**
 * First level of the game. Contains custom level code:
 * - Backgrounds
 * - Enemies and waves
 * - Level boss
 * 
 * @author Garcia Hurtado
 */
function Level1(game){
	this.game = game;

	// extends PlayState 
	PlayState.call(this, game);

	var starfield1;
	var starfield2;
	var starfield3;
	var ground;
	
}

Level1.prototype = Object.create(PlayState.prototype);
Level1.prototype.constructor = Level1;

Level1.prototype.preload = function(){
	// [Embed(source = "../../../assets/terrain.png")] var groundSprite;
	// [Embed(source = "../../../assets/data/level1_ground.csv", mimeType="application/octet-stream")] var groundTilemap;

	this.game.load.image('starfield1', 'images/galactron/starfield1.png');
	this.game.load.image('starfield2', 'images/galactron/starfield2.png');
	this.game.load.image('starfield3', 'images/galactron/starfield3.png');
}

Level1.prototype.create = function()
{
	PlayState.prototype.create.call(this);
	this.createBackground();
		console.log("Created starfield");
	// cheat :)
	//player.changeWeapon(new LaserGunQuad());
	
	// configure level content and events -------------------------------------------
	// var scorpion = new Scorpion1();
	// scorpion.x = 100;
	// scorpion.y = 100;
	
	// add(scorpion);
	
	// events.addAction( new WaitAction(0.5) )
	// 	//.chainAction( new SpawnWaveAction(this, AlienRedWave, FlxG.width, 150, 20, 0.2))
	// 	//.chainAction( new WaitAction(5) )
	// 	.chainAction( new SpawnWaveAction(this, Scorpion1, FlxG.width, 150, 3, 5))
	// 	.chainAction( new WaitAction(10) )
	// 	.chainAction( new SpawnWaveAction(this, ArrowShipGreen, FlxG.width, 150, 12, 0.3))
	// 	.chainAction( new WaitAction(5) )
	// 	.chainAction( new SpawnWaveAction(this, ArrowShipRed1, FlxG.width, 150, 12, 0.5))
	// 	.chainAction( new WaitAction(10) )
	// 	.chainAction( new SpawnWaveAction(this, CannonDrone1, FlxG.width, 40, 1, 0))
	// 	.chainAction( new WaitAction(1) )
	// 	.chainAction( new SpawnWaveAction(this, CannonDrone1, FlxG.width, 80, 1, 0))
	// 	.chainAction( new WaitAction(1) )
	// 	.chainAction( new SpawnWaveAction(this, CannonDrone1, FlxG.width, 120, 1, 0))
	// 	.chainAction( new WaitAction(1) )
	// 	.chainAction( new SpawnWaveAction(this, CannonDrone1, FlxG.width, 160, 1, 0))
	// 	.chainAction( new SpawnWaveAction(this, Freighter1, FlxG.width - 50, -30, 1, 0))
	// 	.chainAction( new WaitAction(3) )
	// 	.chainAction( new SpawnWaveAction(this, Scorpion1, FlxG.width, 100, 4, 2))
	// 	.chainAction( new WaitAction(2))
	// 	.start();
}

/**
 * Custom level background and terrain layers
 * 
 * @return
 */
Level1.prototype.createBackground = function()
{
	// we will use several starfield sprites to create a parallax effect
	//var background = this.game.add.group();
	var starfield1 = this.game.add.tileSprite(0, 0, 1280, 240, 'starfield1');
	starfield1.autoScroll(-10, 0);

	console.log("Created starfield");

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

