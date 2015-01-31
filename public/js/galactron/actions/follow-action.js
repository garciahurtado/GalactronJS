/**
 * Used to make a sprite follow another
 *
 * @author Garcia Hurtado
 */
import {Action} from './action';

export class FollowAction extends Action {
	//followed;minDist;maxDist;

	//followElapsed = 0;

	// time to wait between two trajectory adjustments (in seconds)followDelay = 0.2; 

	constructor(target, followed, minDist = 0, maxDist = 0) {
		this.target = target;
		this.followed = followed;
	}

	update() {
		// only turn every certain number of update cycles
		if (followElapsed < followDelay) {
			followElapsed += this.game.time.delta;
			return;
		}
		myTarget = target;

		if (myTarget.distanceTo(followed) < minDist) {
			//target.speed = 20;
		} else {
			//target.speed = 100;
			//target.velocity.y = followed.velocity.y;
			//target.x = followed.x + 10;
		}
		angleToTarget = target.angleTo(followed);
		maxTurn = target.maxAngular * this.game.time.delta;

		// always turn to face the sprite we are following
		if (maxTurn > angleToTarget) {
			target.turn(angleToTarget);
		} else {
			target.turn(maxTurn);
		}

		followElapsed = 0;
		return;
	}

	turnTarget() {
		angleToTarget = target.angleTo(followed);
		angleToTarget = angleToTarget % (2 * Math.PI); // limit angle to +PI / -turnAngle = target.maxAngular * this.game.time.delta;

		// do not modify the trajectory if the difference is too small, to avoid jitter
		if (Math.abs(turnAngle) < 0.1) {
			return;
		}

		if (angleToTarget > Math.PI) {
			//angleToTarget -= 2*Math.PI;
		} else if (angleToTarget < -Math.PI) {
			//angleToTarget += 2*Math.PI;
		}


		// avoid overshooting the turn
		if (turnAngle > Math.abs(angleToTarget)) {
			turnAngle = Math.abs(angleToTarget);
		}

		if (target.facingAngle > angleToTarget) { // we must increase the angle to face the target
			FlxG.log("facing angle > target");
			target.turn(target.facingAngle - turnAngle);
		} else { // we must decrease the angle to face the target
			FlxG.log("facing angle < target");
			target.turn(target.facingAngle + turnAngle);
		}

	}
}