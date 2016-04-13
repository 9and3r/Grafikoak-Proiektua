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
				if (this.direction != 1){
					avatar.avatar.scale.x = 0.1;
					avatar.avatar.scale.z = 0.1;
				}else{
					var vector2 = vector.clone();
					vector2.setComponent(this.direction, moveTo);
					while(avatar.tryMoveAvatar(vector, this.speed, true) &&
							avatar.tryMoveAvatar(vector2, this.speed, true) &&
							avatar.avatar.scale.y > 0){
						avatar.boundingBox.update();
						avatar.avatar.scale.y -= 0.01;
					}
				}
				return true;
			}
		}else{
			if (avatar.floor && avatar.floor.object == this.object){
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