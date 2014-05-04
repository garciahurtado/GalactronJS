	
	/**
	 * A looping tilemap gives the illusion of an infinite map that endlessly scrolls
	 * with the player, by creating a copy of itself and placing it after the original 
	 * map. When the map copy reaches a certain point, the original map "leaps" and 
	 * is placed behind the copy in the queue, so that it seems as if the same map
	 * is looping over and over.
	 * 
	 * For now it only works for side scrolling tilemaps (moving on the X axis).
	 * 
	 * @author Garcia
	 */
	class LoopingTilemap extends FlxTilemap
	{
		var copy;
		var wasVisible;
		var wasCopyVisible;
		
		this.LoopingTilemap = function() 
		{
			super();
			this.copy = new FlxTilemap();
			FlxG.state.add(this.copy); // temporary hack
			copy.x = this.x;
			copy.y = this.y;
			copy.velocity = this.velocity;
			copy.scrollFactor = this.scrollFactor;
		}
		
		/**
		 * Right after updating the parent, we have to compare the current X coordinate to the previous X to determine if 
		 * we have crossed the center of the screen with the visible map, and therefore must "leap" the invisible map
		 * over to the other side.
		 */
		this.update = function():void {
			super.update();
			
			var now;
			if (wasVisible && !onScreen()) { // original tilemap just disappeared
				now = getScreenXY();
				if (now.x < 0) { // disappeared off the left edge
					x += width * 2; // we "leap" the just disappeared tilemap over the visible tilemap
				} else { // disappeared off the right edge
					x -= width * 2; 
				}
			}
			
			if (wasCopyVisible && !copy.onScreen()) { // copy tilemap just disappeared
				now = copy.getScreenXY();
				if (now.x < 0) { // disappeared off the left edge
					copy.x += width * 2; // we "leap" the just disappeared tilemap over the visible tilemap 
				} else { // disappeared off the right edge
					copy.x -= width * 2; 
				}
			}
			
			wasVisible = onScreen();
			wasCopyVisible = copy.onScreen();
		}
		
		/**
		 * Overrides parent method so that the map copy also receives the tilemap data and sprite parameters
		 * @param	MapData
		 * @param	TileGraphic
		 * @param	TileWidth
		 * @param	TileHeight
		 * @return
		 */
		this.loadMap = function(MapData:String, TileGraphic:Class, TileWidth:uint=0, TileHeight:uint=0,  AutoTile:uint=OFF, StartingIndex:uint=0, DrawIndex:uint=1, CollideIndex:uint=1):FlxTilemap {
			super.loadMap(MapData, TileGraphic, TileWidth, TileHeight);
			copy.loadMap(MapData, TileGraphic, TileWidth, TileHeight);
			copy.x = this.x + this.width; // move the copy to the right, next to the original map
			return this;
		}
		
		/**
		 * so we may render the tilemap copy as well, since it is not registered with the top level game object
		 */
	/*	this.render = function():void {
			super.render();
			copy.render();
		}*/
		
	}

