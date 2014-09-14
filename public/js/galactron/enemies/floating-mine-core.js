/**
 * Core of the proximity mine which explodes upon contact
 */
class FloatingMineCore extends Enemy {
	constructor(game, x, y, sprite) {
		sprite = sprite || 'floating_mine';
		super(game, x, y, sprite);

    // When the core dies, it must notify its parent sprite, to allow it to self destruct properly
		this.events.onKilled.add(function() {
			if(this.parent){
				this.parent.explode();
			}
		}.bind(this));

		this.init();
	}
}