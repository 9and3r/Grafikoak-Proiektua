MobilePlatform = function(object, startPos, distance, direction, speed, waitTime){
	this.object = object;
	this.startPos = startPos;
	this.distance = distance;
	this.direction = direction;
	this.reverse = false;
	this.moved = 0;
	this.speed = speed;
	this.moving = true;
	this.waitTime = waitTime; 
}

MobilePlatform.prototype.move = function(avatar){
	if (this.moving){
		if (this.reverse){
			this.moved -= this.speed;
			if (this.moved < 0){
				this.reverse = false;
				this.moving = false;
				window.setTimeout(this.startMoving.bind(this), this.waitTime);
			}
			var moveTo = -1;
		}else{
			this.moved += this.speed;
			if (this.moved > this.distance){
				this.reverse = true;
				this.moving = false;
				window.setTimeout(this.startMoving.bind(this), this.waitTime);
			}
			moveTo = 1;
		}
		this.object.position.setComponent(this.direction, this.startPos + this.moved);
		var vector = new THREE.Vector3();
		vector.setComponent(this.direction, moveTo*-1);
		var colision = avatar.checkIfCanMove(vector, this.speed, true);
		if (colision && colision.object == this.object){
			vector.setComponent(this.direction, moveTo);
			if (avatar.tryMoveAvatar(vector, this.speed, true)){
				if (this.direction == 1){
					avatar.targetScale.y = 0.1;
				}else{
					avatar.targetScale.x = 0.1;
					avatar.targetScale.z = 0.1;
				}
				return true;
			}
		}else{
			if (avatar.floor && avatar.floor == this.object){
				vector.setComponent(this.direction, moveTo);
				avatar.tryMoveAvatar(vector, this.speed, true);
			}
		}
	}
	return false;
}

MobilePlatform.prototype.startMoving = function(){
	this.moving = true;
}