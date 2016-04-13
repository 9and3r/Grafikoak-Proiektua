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

}

AvatarControll.speed = 2;
AvatarControll.gravity = 0.7;
AvatarControll.cameraY = 60;
AvatarControll.cameraZ = -100;
AvatarControll.camaraRotationSpeed = 0.03;
AvatarControll.height = 

AvatarControll.prototype.moveCameraAndAvatar = function(canmove, camera){
	this.moveAvatar(canmove);
	camera.position.copy(this.avatar.position);
	camera.rotation.y = this.angle;
	camera.rotation.x = 0;
	camera.rotation.z = 0;
	camera.translateY(AvatarControll.cameraY);
	camera.translateZ(AvatarControll.cameraZ);
	this.avatarCenterPos.x = this.avatar.position.x;
	this.avatarCenterPos.y = this.avatar.position.y + 30;
	this.avatarCenterPos.z = this.avatar.position.z;
	camera.lookAt(this.avatarCenterPos);
	//this.changeRotation();
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
	this.moveVertical(keyCount, rotation);
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



AvatarControll.prototype.moveVertical = function(keyCount, rotation){
	// Calcular la nueva velocidad vertical
	this.calculateVerticalSpeed();

	// Mover el personaje con el valor de verticalSpeed
	if (this.verticalSpeed != 0){
		this.floor = this.tryMoveAvatar(new THREE.Vector3(0, 1, 0), this.verticalSpeed);
	}else{
		// Intentar mover el personaje hacia abajo y comprobar si esta en el suelo
		this.floor = this.tryMoveAvatar(new THREE.Vector3(0, -1, 0), 1);
	}
	
}

AvatarControll.prototype.calculateVerticalSpeed = function(){
	if (this.verticalSpeed > 0){
		this.verticalSpeed -= AvatarControll.gravity;
	}else{
		this.verticalSpeed = 0;
	}
}

AvatarControll.prototype.getCheckPositions = function(){
	var positions = [];
	for (var i=0; i<3; i++){
		var y;
		switch(i){
			case 0:
				y = 0;
				break;
			case 1:
				y = this.boundingBox.box.max.y / 2;
				break;
			case 2:
				y = this.boundingBox.box.max.y;
		}

		// Posicion central
		currentPos = this.avatar.position.clone();
		currentPos.y += y;
		positions.push(currentPos);

		// 4 extremos
		currentPos = this.avatar.position.clone();
		currentPos.y += y;
		currentPos.x += this.boundingBox.box.max.x;
		positions.push(currentPos);

		currentPos = this.avatar.position.clone();
		currentPos.y += y;
		currentPos.x += this.boundingBox.box.min.x;
		positions.push(currentPos);

		currentPos = this.avatar.position.clone();
		currentPos.y += y;
		currentPos.z += this.boundingBox.box.max.z;
		positions.push(currentPos);

		currentPos = this.avatar.position.clone();
		currentPos.y += y;
		currentPos.z += this.boundingBox.box.min.z;
		positions.push(currentPos);
	}
	return positions;
}

AvatarControll.prototype.checkIfCanMove = function(direction, distance, checkAngle){
	if (checkAngle){
		worldDirection = direction.clone();
		worldDirection.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.angle);
	}else{
		worldDirection = direction;
	}
	var colision = null;
	var positions = this.getCheckPositions();
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