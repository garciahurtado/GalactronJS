/**
 * Cannon Drone: Small spaceship that is impossible to kill before it opens up to reveal
 * its laser eye, which shoots a large constant laser beam
 * @author Garcia
 */
import {Enemy} from './enemy';
import {BlueLaserBeam} from '../fx/blue-laser-beam';
import {TweenAction} from '../actions/tween-action';
import {StopMotionAction} from '../actions/stop-motion-action';
import {AnimationAction} from '../actions/animation-action';
import {WaitAction} from '../actions/wait-action';
import {GoToAction} from '../actions/go-to-action';
import {MethodAction} from '../actions/method-action';
import {TweenAction} from '../actions/tween-action';

export class CannonDrone extends Enemy {
	constructor(game, x = 0, y = 0) {
		super(game, x, y, 'cannon_drone');
    this.animations.add('open', [0, 1, 2], 3, false);
		this.animations.add('close', [2, 1, 0], 3, false);
		this.animations.add('stop', [0], 0, false);
		this.play('stop');

    this.sounds.laser = game.add.audio('large_beam');
    this.sounds.laser.loop = true;
    this.laser = this.createBullet(BlueLaserBeam);
    this.laser.x = -533;
    this.laser.y = -1000; 

    // this.laser.x = -533;
    // this.laser.y = -1000; // effectively invisible

		this.actions
			.add(new TweenAction(this, {x : 310}, 1000, Phaser.Easing.Sinusoidal.Out )) 	// slow down
			.then(new WaitAction(0.5))
			.then(new StopMotionAction())
			.then(new AnimationAction("open"), "openLaser")
			.then(new WaitAction(0.5))
			.then(new MethodAction(this.laserOn))									// Fire!
			.then(new WaitAction(2))
			.then(new MethodAction(this.laserOff))
			.then(new AnimationAction("close"), "close")
			.then(new WaitAction(1))
			.then(new GoToAction("openLaser", 2)) // repeat a second time
			.then(new TweenAction(this, {x : -50}, 2000, Phaser.Easing.Sinusoidal.In)) 	// speed up
			;
	}

	init() {
		super.init();

		this.health = 50;
		this.score = 300;
		this.speed = 30;
	}

	/**
	 * Turns the laser weapon on, which remains active until turned off
	 */
	laserOn() {
		this.sounds.laser.play();
		this.laser.play('on');
		this.laser.y = this.y;
		this.laser.x = this.x - 532;
	}

	/**
	 * Turns the laser weapon off, which remains active until turned off
	 */
	laserOff() {
		this.sounds.laser.stop();
		this.laser.y = -1000;
	}

	update(){
		super.update();
	}

	kill(){
		super.kill();
		this.laserOff();
		this.laser.kill();
	}
}
