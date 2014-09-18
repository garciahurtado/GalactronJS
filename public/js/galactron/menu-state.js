/**
 * Home screen / menu for the game, with the opening title and level selection
 *
 * @author Garcia Hurtado
 */
class MenuState extends GameState {
	constructor(game){
		this.arrowIndex = 0;
		this.levelList = ['Level1', 'Level2',  'Level3'];
		game.plugins.add(new Phaser.Plugin.Flicker());
	}

	/**
	 * Lay out the text for the menus of the home screen
	 */
	create(){
		super();
		this.game.stage.smoothed = false;
		this.enableInput();

		this.createText("GALACTRON", 190, 60, 32, 'FirewireBlack', '#FFFFFF', 'center');

		this.createText("LEVEL 1", 160, 140, 8, 'FirewireBlack', '#FFFFFF', 'left');
		this.createText("LEVEL 2", 160, 160, 8, 'FirewireBlack', '#FFFFFF', 'left');
		this.createText("LEVEL 3", 160, 180, 8, 'FirewireBlack', '#FFFFFF', 'left');

		this.arrow = this.createText(">", 150, 140, 8, 'FirewireBlack', '#FFFFFF', 'left');
		this.arrow.flicker();

		this.pressEnter = this.createText("PRESS ENTER TO START", 190, 240, 8, 'FirewireBlack', '#FFFFFF', 'center');
		this.pressEnter.flicker(1.42);
		
		this.configInput();
	}

	/**
	 * Handle player input
	 */
	update(){
		if (this.controls.enter.isDown){
			var newLevel = this.levelList[this.arrowIndex];
			this.game.state.start(newLevel);
		}

			// {
			// 	FlxG.flash(0xffffffff, 0.2, function():void {
			// 		FlxG.switchState(new levelList[arrowIndex]());
			// 	});
			// }

	}

	configInput(){
			this.controls.down.onDown.add(function() {
				this.moveArrow(+1);
			}, this);
			this.controls.up.onDown.add(function(){
				this.moveArrow(-1);
			}, this);
	}

	/**
	 * Move the menu arrow one item at a time up or down
	 */
	moveArrow(offset){
		var newOffset = this.arrowIndex + offset;
			
		if (newOffset < 0 || newOffset >= this.levelList.length) {
			return false;
		} else {
			this.arrowIndex = newOffset;
			this.arrow.y += offset * 20;
		}
	}
}