
var personaje;
var personajeColision;
var personajePosCentro;
var pressedKeys = [false, false, false, false];
var angle = 0;
var targetAngle = 0;
var cameraHideObjects = [];

var suelo = false;
var verticalSpeed = 0;
var verticalAceleration = 0;


function moveCamaraAndPersonaje(){
	if (personaje != undefined){
					//personajeColision.rotation.y = angle;
					movePersonaje();
					camera.position.copy(personaje.position);
					camera.rotation.y = angle;
					camera.rotation.x = 0;
					camera.rotation.z = 0;
					camera.translateY(60);
					camera.translateZ(-100);
					personajePosCentro.x = personaje.position.x;
					personajePosCentro.y = personaje.position.y + 30;
					personajePosCentro.z = personaje.position.z;
					camera.lookAt(personajePosCentro);
					changeRotation();
					if (personaje.position.z > 150){
						targetAngle = Math.PI*3/2;
					}else{
						targetAngle = 0;
					}
					/*
					raycaster.set(camera.position, camera.rotation);
					raycaster.near = 0;
					raycaster.far = camera.position.distanceTo(personajePosCentro);
					objects = raycaster.intersectObjects(solidObjects);

					for (var i=0; i< cameraHideObjects.length; i++){
						var current = cameraHideObjects[i];
						current['object'].material.transparent = current['transparent'];
						current['object'].material.opacity = current['opacity'];
					}
					
					for (i=0; i< objects.length; i++){
						var currentObject = objects[i].object;
						cameraHideObjects.push({'object': currentObject, 'transparent': currentObject.material.transparent, 'opacity': currentObject.material.alpha});
						currentObject.material.transparent = true;
						currentObject.material.opacity = 0.15;
					}
					*/
					

				}
			}

			function onKeyDown(e){
				var i = getPressedKeyPos(e.keyCode);
				if (i != -1){
					pressedKeys[i] = true;
				}else if(e.keyCode == 32){
					if(suelo){
						verticalSpeed = 5;
					}
				}
			}

			function onKeyUp(e){
				var i = getPressedKeyPos(e.keyCode);
				if (i != -1){
					pressedKeys[i] = false;
				}
			}

			function getPressedKeyPos(keyCode){
				switch(keyCode){
					case 87:
						return 0;
					case 83:
						return 1;
					case 65:
						return 2;
					case 68:
						return 3;
				}
				return -1;
			}


			function movePersonaje(){
				var keyCount = 0;
				var rotation = personaje.rotation.y;
				personaje.rotation.y = angle;
				for (pushed in pressedKeys){
					if (pressedKeys[pushed]){
						keyCount ++;
					}
				}
				if (keyCount > 0 && keyCount < 3){
					if (pressedKeys[0]){
						tryMovePersonaje(new THREE.Vector3(0, 0, 1), 1);
						//personaje.translateZ(1);
					}
					if (pressedKeys[1]){
						tryMovePersonaje(new THREE.Vector3(0, 0, -1), 1);
						//personaje.translateZ(-1);
					}
					if (pressedKeys[2]){
						tryMovePersonaje(new THREE.Vector3(1, 0, 0), 1);
						//personaje.translateX(1);
					}
					if (pressedKeys[3]){
						tryMovePersonaje(new THREE.Vector3(-1, 0, 0), 1);
						//personaje.translateX(-1);
					}
				}
				//personaje.position = personajeColision.position;
				calculateVerticalSpeed();
				if (verticalSpeed != 0){
					tryMovePersonaje(new THREE.Vector3(0, 1, 0), verticalSpeed);
				}

				if (!tryMovePersonaje(new THREE.Vector3(0, -1, 0), 1)){
					suelo = true;
				}else{
					suelo = false;
				}
				rotarPersonaje(keyCount, rotation);
			}

			function calculateVerticalSpeed(){
				if (verticalSpeed > 0){
					verticalSpeed -= 0.3;
				}else{
					verticalSpeed = 0;
				}
			}

			function tryMovePersonaje(direction, distance){
				worldDirection = direction.clone();
				worldDirection.applyAxisAngle( new THREE.Vector3(0, 1, 0), angle );
				raycaster.set(personaje.position, worldDirection);
				raycaster.near = 0;
				raycaster.far = distance;
				objects = raycaster.intersectObjects(solidObjects);
				if (objects.length == 0) {
					personaje.translateX(direction.x * distance);
					personaje.translateY(direction.y * distance);
					personaje.translateZ(direction.z * distance);
					return true;
				}else{
					return false;
				}
			}

			function rotarPersonaje(keyCount, previousRotation){
				if (keyCount == 1){
					if (pressedKeys[0]){
						personaje.rotation.y = 0 + angle;
					}
					if (pressedKeys[1]){
						personaje.rotation.y = Math.PI + angle;
					}
					if (pressedKeys[2]){
						personaje.rotation.y = Math.PI/2 + angle;
					}
					if (pressedKeys[3]){
						personaje.rotation.y = Math.PI*3/2 + angle;
					}
				}else if (keyCount == 2){
					if (pressedKeys[0] && pressedKeys[2]){
						personaje.rotation.y = Math.PI/4 + angle;
					}else if (pressedKeys[0] && pressedKeys[3]){
						personaje.rotation.y = Math.PI*7/4 + angle;
					}else if (pressedKeys[1] && pressedKeys[2]){
						personaje.rotation.y = Math.PI*3/4 + angle;
					}else if (pressedKeys[1] && pressedKeys[3]){
						personaje.rotation.y = Math.PI*5/4 + angle;
					}

				}else{
					personaje.rotation.y = previousRotation;
				}
			}

			function changeRotation(){
				var changAngle = 0.03;
				if (Math.abs(targetAngle - angle) > changAngle){
					difference = targetAngle - angle;
					if (difference > 0){
						if (difference > Math.PI){
							angle -= changAngle;
						}else{
							angle += changAngle;
						}
					}else{
						if (-difference > Math.PI){
							angle += changAngle;
						}else{
							angle -= changAngle;
						}
					}

					// Comprobar que el angle esta entre 0 y Math.PI*2
					while(angle < 0){
						angle += Math.PI*2;
					}

					while(angle >= Math.PI*2){
						angle -= Math.PI*2;
					}
				}
			}