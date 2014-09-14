/**
 * Base Game State class intended to be extended by all the other states, whether playable or not (such as menus)
 */
class GameState {

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
	 * Override this in your child state to provide initialization code (create text, set up
	 * counters, create player, etc...)
	 */
	create(){
		// Nothing to do
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
}