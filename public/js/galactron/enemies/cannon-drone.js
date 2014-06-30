/**
 * Cannon Drone: Small spaceship that is impossible to kill before it opens up to reveal
 * its laser eye, which shoots a large constant laser beam
 * @author Garcia
 */
class CannonDrone extends Enemy {
	constructor(game, x = 0, y = 0) {
		super(game, x, y, 'cannon_drone');
    this.animations.add('open', [0, 1, 2], 3, false);
		this.animations.add('close', [2, 1, 0], 3, false);
		this.animations.add('stop', [0], 0, false);
		this.play('stop');

    this.sounds.laser = game.add.audio('large_beam');
    this.sounds.laser.loop = true;
    this.laser = new BlueLaserBeam(game, x, y);
    this.laser.x = -534;
    this.laser.y = -1000; // effectively invisible
    this.addChild(this.laser);
    // this.bullets.add(this.laser);
	}

	init() {
		super.init();

		this.lastShot = 3;
		this.health = 50;
		this.score = 300;
		this.speed = 30;

		this.actions
			.addAction(new TweenAction(this.velocity, {x : 310}, 1000, Phaser.Easing.Sinusoidal.Out )) 	// slow down
			.chainAction(new WaitAction(0.5))
			.chainAction(new StopMotionAction())
			.chainAction(new AnimationAction("open"), "open")
			.chainAction(new WaitAction(0.5))
			.chainAction(new MethodAction(this.laserOn))									// Fire!
			.chainAction(new WaitAction(2))
			.chainAction(new MethodAction(this.laserOff))
			.chainAction(new AnimationAction("close"), "close")
			.chainAction(new WaitAction(1))
			.chainAction(new GoToAction("open", 2)) // repeat twice
			.chainAction(new TweenAction(this.velocity, {x : -30}, 1000, Phaser.Easing.Sinusoidal.In)) 	// speed up
			;
		this.actions.start();
	}

	/**
	 * Turns the laser weapon on, which remains active until turned off
	 */
	laserOn() {
		this.sounds.laser.play();
		this.laser.play('on');
		this.laser.y = 0;
	}

	/**
	 * Turns the laser weapon off, which remains active until turned off
	 */
	laserOff() {
		this.sounds.laser.stop();
		this.laser.y = -1000;
	}
}