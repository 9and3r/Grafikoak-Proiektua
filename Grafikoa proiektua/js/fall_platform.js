FallPlatform = function(object, speed){
	MobilePlatform.call(this, object, 0, 0, undefined, speed, 0);
	this.moving = false;
}

FallPlatform.prototype = Object.create(MobilePlatform.prototype);
FallPlatform.prototype.constructor = FallPlatform;

FallPlatform.prototype.move = function(avatar){
	if (!this.moving){
		if (avatar.floor && avatar.floor == this.object){
			this.moving = true;
		}
	}else{
		this.object.position.y -= this.speed;
		if (avatar.floor && avatar.floor == this.object){
			var vector = new THREE.Vector3();
			vector.y = -1;
			avatar.tryMoveAvatar(vector, this.speed, true);
		}
	}
}