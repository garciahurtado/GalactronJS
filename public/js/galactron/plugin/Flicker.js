/**
* A plugin to add a flicker effect to sprites and text by switching alpha very quickly
* (33hz by default, but configurable), for a configurable amount of time.
* 
* The sprite will be invulnerable while it is flickering.
*/
Phaser.Plugin.Flicker = function (game, parent) {

	Phaser.Plugin.call(this, game, parent);

	this.sprites = [];
	this.frequency = 33; // default frequency for sprites that don't specify it

	// Monkey patch base Phaser.Sprite and Phaser.Text a more convenient API
	var plugin = this;
	Phaser.Sprite.prototype.flicker = 
	Phaser.Text.prototype.flicker = function(frequency, duration){
		plugin.add(this, frequency, duration); // in this context, "this" should be the sprite
	};
};

Phaser.Plugin.Flicker.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.Flicker.prototype.constructor = Phaser.Plugin.Flicker;

/**
* Add a Sprite to the list managed by the plugin. This also makes the sprite immune (but you 
* have to check for this variable)
*
* @type {Phaser.Sprite}
* @param duration Duration of the flicker effect (in ms). Zero for infinite duration.
*/
Phaser.Plugin.Flicker.prototype.add = function (sprite, frequency, duration = 0) {
	sprite.flickerDuration = duration;
	sprite.flickerFreq = frequency || this.frequency; // flicker these many times per second
	sprite.flickerTimer = 0;
	sprite.immune = true;

	if(duration){ // stop flicker after specified time
		this.game.time.events.add(Phaser.Timer.SECOND * (duration / 1000), function() {
			this.stop(sprite);
		}, this);
	}

	this.sprites.push(sprite);
};

/**
* This is run when the plugins update during the core game loop.
*/
Phaser.Plugin.Flicker.prototype.update = function () {
	var elapsed = this.game.time.elapsed;

	this.sprites.forEach(function(sprite){
		sprite.flickerTimer += elapsed;

		if(sprite.flickerTimer > (1000 / sprite.flickerFreq)){
			sprite.alpha = sprite.alpha ? 0 : 1; // flip alpha between 0 and 1 every other frame
			sprite.flickerTimer = 0;
		}
	}, this);
};

/**
 * After a sprite is no longer supposed to flicker, we stop the effect by removing it from
 * the list of sprites to update and restoring its alpha and immune flag.
 */
Phaser.Plugin.Flicker.prototype.stop = function(sprite){
	sprite.alpha = 1;
	sprite.immune = false;

	// Remove from the array of sprites tracked
	for (var i = 0; i < this.sprites.length; i++) {
		if(this.sprites[i] == sprite){
			this.sprites.splice(i, 1);
		}
	};
};