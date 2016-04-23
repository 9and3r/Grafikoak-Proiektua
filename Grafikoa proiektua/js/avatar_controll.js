AvatarControll = function(avatar){
	this.pressedKeys = [false, false, false, false];
	this.targetAngle = 0;
	this.angle = 0;
	this.floor = null;
	this.verticalSpeed = 0;
	this.verticalAceleration = 0;
	this.avatar = avatar;
	this.avatarCenterPos = new THREE.Vector3();
	this.raycaster = new THREE.Raycaster();
	this.solidObjects = [];

	this.boundingBox = new THREE.BoundingBoxHelper(avatar);
	this.boundingBox.update();
	this.hidden = [];

	this.avatar.scale.x = 0;
	this.avatar.scale.y = 0;
	this.avatar.scale.z = 1;

	this.targetScale = new THREE.Vector3(1, 1, 1);

	this.upAnimation = false;
}

AvatarControll.speed = 2;
AvatarControll.gravity = 0.4;
AvatarControll.minGravity = -1;
AvatarControll.upAnimationSpeed = 0.7;
AvatarControll.upAnimationRotationSpeed = 0.03;
AvatarControll.cameraY = 60;
AvatarControll.cameraZ = -100;
AvatarControll.camaraRotationSpeed = 0.03;
AvatarControll.scaleSpeed = 0.03;

AvatarControll.prototype.moveCameraAndAvatar = function(canmove, camera){
	this.moveAvatar(canmove);
	this.avatarCenterPos.x = this.avatar.position.x;
	this.avatarCenterPos.y = this.avatar.position.y + 30;
	this.avatarCenterPos.z = this.avatar.position.z;
	if (!cameraTest){
		camera.position.copy(this.avatar.position);
		camera.rotation.y = this.angle;
		camera.rotation.x = 0;
		camera.rotation.z = 0;
		camera.translateY(AvatarControll.cameraY);
		camera.translateZ(AvatarControll.cameraZ);
		camera.lookAt(this.avatarCenterPos);
	}
	this.calculateScale();
}

AvatarControll.prototype.calculateScale = function(){
	for(var i=0; i<3; i++){
		var scale = this.avatar.scale.getComponent(i);
		if (scale - this.targetScale.getComponent(i) > AvatarControll.scaleSpeed){
			this.avatar.scale.setComponent(i, scale - AvatarControll.scaleSpeed);
		}else if (this.targetScale.getComponent(i) - scale > AvatarControll.scaleSpeed){
			this.avatar.scale.setComponent(i, scale + AvatarControll.scaleSpeed);
		}
	}
}

AvatarControll.getPressedKeyPos = function(keyCode){
	switch(keyCode){
		case 87:
			return 0;
		case 83:
			return 1;
		case 65:
			return 2;
		case 68:
			return 3;
		default:
			return -1;
	}
}

AvatarControll.prototype.onKeyDown = function(e){
	var i = AvatarControll.getPressedKeyPos(e.keyCode);
	if (i != -1){
		this.pressedKeys[i] = true;
	}else if(e.keyCode == 32){
		if(this.floor){
			this.verticalSpeed = 8;
		}
	}
}

AvatarControll.prototype.onKeyUp = function(e){
	var i = AvatarControll.getPressedKeyPos(e.keyCode);
	if (i != -1){
		this.pressedKeys[i] = false;
	}
}

AvatarControll.prototype.moveAvatar = function(canmove){

	if (!this.upAnimation){
		// Rotar el avatar para moverlo en la direccion correcta
		var rotation = this.avatar.rotation.y;
		this.avatar.rotation.y = this.angle;

		// Comprobar cuantas teclas de movimientos estan pulsadas
		var keyCount = 0;
		for (pushed in this.pressedKeys){
			if (this.pressedKeys[pushed]){
				keyCount ++;
			}
		}
		this.moveVertical(keyCount, rotation, canmove);
		if (canmove){
			this.moveHorizontal(keyCount, rotation);
			this.rotateAvatar(keyCount, rotation);
		}else{
			this.avatar.rotation.y = rotation;
		}
	
		// Si es necesario cambiar el giro de la camara para el siguiente frame
		if (this.targetAngle != this.angle){
			this.changeRotation();
		}
	}else{
		this.avatar.position.y += AvatarControll.upAnimationSpeed;
		this.avatar.rotation.y += AvatarControll.upAnimationRotationSpeed;
	}
	
}

AvatarControll.prototype.moveHorizontal = function(keyCount, rotation){

	// Si el usuario esta pulsando mas de dos teclas de movimiento se ignorara
	// Tratar de mover el avatar en la direccion correspondiente
	if (keyCount > 0 && keyCount < 3){
		if (this.pressedKeys[0]){
			this.tryMoveAvatar(new THREE.Vector3(0, 0, 1), AvatarControll.speed);
		}
		if (this.pressedKeys[1]){
			this.tryMoveAvatar(new THREE.Vector3(0, 0, -1), AvatarControll.speed);
		}
		if (this.pressedKeys[2]){
			this.tryMoveAvatar(new THREE.Vector3(1, 0, 0), AvatarControll.speed);
		}
		if (this.pressedKeys[3]){
			this.tryMoveAvatar(new THREE.Vector3(-1, 0, 0), AvatarControll.speed);
		}
	}
}

var a = true;

AvatarControll.prototype.moveVertical = function(keyCount, rotation, canmove){
	// Calcular la nueva velocidad vertical
	this.calculateVerticalSpeed();

	// Mover el personaje con el valor de verticalSpeed
	if (this.verticalSpeed > 0 && canmove){
		this.tryMoveAvatar(new THREE.Vector3(0, 1, 0), this.verticalSpeed);
		this.floor = null;
	}else if(this.verticalSpeed < 0){

		// Intentar mover el personaje hacia abajo y comprobar si esta en el suelo
		this.floor = this.tryMoveAvatar(new THREE.Vector3(0, -1, 0), this.verticalSpeed * -1);
		if (this.floor){
			this.floor = this.floor.object;
			this.verticalSpeed = 0;
			if (this.floor.controller && canmove){
				this.floor.controller.onFloor(this);
			}
		}
	}
}

AvatarControll.prototype.render = function(level, camera){
	/*
	// http://stackoverflow.com/a/31819161
	for (var i=0; i<this.hidden.length; i++){
   		this.hidden[i].material.opacity = 1;
   	}
	var vector = new THREE.Vector3();
	vector.set(0, 0, 1);
	vector.unproject(camera);
   	this.raycaster.set(camera.position, vector.sub(camera.position).normalize());
   	this.raycaster.near = 0;
   	this.raycaster.far = camera.position.distanceTo(this.avatarCenterPos) - 30;
   	var intersects = this.raycaster.intersectObjects(this.solidObjects);
   	for (i=0; i<intersects.length; i++){
   		this.hidden.push(intersects[i].object);
   		intersects[i].object.material.opacity = 0.5;
   		intersects[i].object.material.trasparent = true;
   	}
   	*/
}

AvatarControll.prototype.calculateVerticalSpeed = function(){
	this.verticalSpeed -= AvatarControll.gravity;
	if (this.verticalSpeed < 0 && this.verticalSpeed > AvatarControll.minGravity){
		this.verticalSpeed = AvatarControll.minGravity;
	}
}

AvatarControll.prototype.getCheckPositions = function(direction){
	var positions = [];

	

	var rotation = this.avatar.rotation.y;
	this.avatar.rotation.y = 0;

	this.boundingBox.update();
	var max = this.boundingBox.box.max.sub(this.avatar.position);
	var min = this.boundingBox.box.min.sub(this.avatar.position);
	var distance;
	if (max.x - min.x > max.z - min.z){
		distance = max.z - min.z;
	}else{
		distance = max.x - min.x;
	}

	this.avatar.rotation.y = rotation;

	var start;
	var finish;
	if (direction.y < 0){
		start = 0;
		finish = 15;
	}else if (direction.y > 0){
		start = 30;
		finish = 35;
	}else{
		start = 0;
		finish = 35;
	}
	for (var i=start; i<finish; i++){
		var y = (max.y-min.y) / 34 * i;
		AvatarControll.getCheckPosition(y, this.avatar.position, distance, direction, positions);
	}		
	return positions;
}

AvatarControll.getCheckPosition = function(y, position, distance, direction, positions){
	if (direction.y != 0){
		// Posicion central
		currentPos = position.clone();
		currentPos.y += y;
		positions.push(currentPos);
	}
	if (direction.y != 0 || direction.x > 0 || true){
		currentPos = position.clone();
		currentPos.y += y;
		currentPos.x += distance;
		positions.push(currentPos);
	}
	if (direction.y != 0 || direction.x < 0|| true){
		currentPos = position.clone();
		currentPos.y += y;
		currentPos.x -= distance;
		positions.push(currentPos);
	}
	if (direction.y != 0 || direction.z > 0|| true){
		currentPos = position.clone();
		currentPos.y += y;
		currentPos.z += distance;
		positions.push(currentPos);
	}
	if (direction.y != 0 || direction.z < 0|| true){
		currentPos = position.clone();
		currentPos.y += y;
		currentPos.z -= distance;
		positions.push(currentPos);
	}
}

AvatarControll.prototype.checkIfCanMove = function(direction, distance, checkAngle){
	if (checkAngle){
		worldDirection = direction.clone();
		worldDirection.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.angle);
	}else{
		worldDirection = direction;
	}
	var colision = null;
	var positions = this.getCheckPositions(direction);
	var i = 0;
	while (!colision && i < positions.length){
		this.raycaster.set(positions[i], worldDirection);
		this.raycaster.near = 0;
		this.raycaster.far = distance;
		objects = this.raycaster.intersectObjects(this.solidObjects);
		if (objects.length == 0) {
			colision = null;
		}else{
			colision = objects[0];
		}
		i++;	
	}
	return colision;
	
}

AvatarControll.prototype.tryMoveAvatar = function(direction, distance, checkAngle){
	var object = this.checkIfCanMove(direction, distance);
	if (!object){
		if (checkAngle){
			this.avatar.position.x += direction.x * distance;
			this.avatar.position.y += direction.y * distance;
			this.avatar.position.z += direction.z * distance;
		}else{
			this.avatar.translateX(direction.x * distance);
			this.avatar.translateY(direction.y * distance);
			this.avatar.translateZ(direction.z * distance);
		}
		this.avatar.updateMatrix();
		this.avatar.updateMatrixWorld(true);
	}
	return object;
}

AvatarControll.prototype.rotateAvatar = function(keyCount, previousRotation){

	if (keyCount == 1){
		if (this.pressedKeys[0]){
			this.avatar.rotation.y = this.angle;
		}else if (this.pressedKeys[1]){
			this.avatar.rotation.y = Math.PI + this.angle;
		}else if (this.pressedKeys[2]){
			this.avatar.rotation.y = Math.PI/2 + this.angle;
		}else if (this.pressedKeys[3]){
			this.avatar.rotation.y = Math.PI*3/2 + this.angle;
		}
	}else if (keyCount == 2){
		if (this.pressedKeys[0] && this.pressedKeys[2]){
			this.avatar.rotation.y = Math.PI/4 + this.angle;
		}else if (this.pressedKeys[0] && this.pressedKeys[3]){
			this.avatar.rotation.y = Math.PI*7/4 + this.angle;
		}else if (this.pressedKeys[1] && this.pressedKeys[2]){
			this.avatar.rotation.y = Math.PI*3/4 + this.angle;
		}else if (this.pressedKeys[1] && this.pressedKeys[3]){
			this.avatar.rotation.y = Math.PI*5/4 + this.angle;
		}
	}else{
		this.avatar.rotation.y = previousRotation;
	}
}

AvatarControll.prototype.changeRotation = function(){
	if (Math.abs(this.targetAngle - this.angle) > AvatarControll.camaraRotationSpeed){
		targetAngle = AvatarControll.checkAngle(this.targetAngle);
		difference = this.targetAngle - this.angle;
		if (difference > 0){
			if (difference > Math.PI){
				this.angle -= AvatarControll.camaraRotationSpeed;
			}else{
				this.angle += AvatarControll.camaraRotationSpeed;
			}
		}else{
			if (-difference > Math.PI){
				this.angle += AvatarControll.camaraRotationSpeed;
			}else{
				this.angle -= AvatarControll.camaraRotationSpeed;
			}
		}
		this.angle = AvatarControll.checkAngle(this.angle);
	}
}

// Comprobar que el angle esta entre 0 y Math.PI*2
AvatarControll.checkAngle = function(angle){
	while(angle < 0){
		angle += Math.PI*2;
	}
	while(angle >= Math.PI*2){
		angle -= Math.PI*2;
	}
	return angle;
}