			var renderer;
			var scene;
			var camera;
			var personaje;
			var personajeColision;
			var personajePosCentro;
			var pressedKeys = [false, false, false, false];
			var angle = 0;
			var targetAngle = 0;

			/**
			 * Inicializacion Three.js
		     *
		     * Inicializa la escena, la camara y las luces
			 * Se llama cuando se carga la ventana mediante la funcion window.onload
		     **/

		     function init(){
		     	loadAll();
		     	scene = new THREE.Scene({ antialias: true });
		     	renderer = new THREE.WebGLRenderer();

		     	// Inicializamos el color del fondo y el tamano
				renderer.setClearColor(0x000000, 1.0);
				renderer.setSize(window.innerWidth, window.innerHeight);
				renderer.shadowMapEnabled = true;

				// Creamos la camara
				camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
				// Posicionamos la camara en el centro de la escena

		     	// Incluimos la salida del render al elemento html
				document.body.appendChild(renderer.domElement);

				window.addEventListener("keydown", onKeyDown, false);
				window.addEventListener("keyup", onKeyUp, false);

				requestAnimationFrame(render);
		     }

			function onGameLoaded() {
				loadLevel();
			}

			function onKeyDown(e){
				var i = getPressedKeyPos(e.keyCode);
				if (i != -1){
					pressedKeys[i] = true;
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
						personaje.translateZ(1);
					}
					if (pressedKeys[1]){
						personaje.translateZ(-1);
					}
					if (pressedKeys[2]){
						personaje.translateX(1);
					}
					if (pressedKeys[3]){
						personaje.translateX(-1);
					}
				}
				//personaje.position = personajeColision.position;
				rotarPersonaje(keyCount, rotation);
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


			/**
			 * Funcion para visualizar la escena
			 * El intervalo viene dado por requestAnimationFrame
			 **/
			function render() {
				// render utilizando requestAnimationFrame
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
					
				}
				requestAnimationFrame(render);
				renderer.render(scene, camera);
			}


			/**
	     	 * Funcion que controla el tamano y asegura que la camara y el render
		 	 * se adaptan en el instante correcto
	     	 **/
	    	function handleResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
	    	}

			// Llama a la funcion init() cuando se carga la ventana 
    		window.onload = init;

    		// Llama a la funcion handleResize() cuando se cambia el tamano de la ventana
    		window.addEventListener('resize', handleResize, false);