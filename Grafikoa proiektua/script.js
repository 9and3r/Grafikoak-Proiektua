			var renderer;
			var scene;
			var camera;
			var personaje;
			var personajeColision;
			var loader;
			var personajePosCentro;
			var pressedKeys = [false, false, false, false];
			var angle = 0;
			var targetAngle = Math.PI;

			/**
			 * Inicializacion Three.js
		     *
		     * Inicializa la escena, la camara y las luces
			 * Se llama cuando se carga la ventana mediante la funcion window.onload
		     **/
			function init() {
				// Creamos la escena que contiene todos los objetos, camaras y luces
				scene = new THREE.Scene({ antialias: true });

				// Creamos el Objeto render que usaremos para visualizar la escena
				renderer = new THREE.WebGLRenderer();

				personajePosCentro = new THREE.Vector3( 0, 0, 0 );

				var waterGeometry = new THREE.BoxGeometry( 200, 500, 1);
				var waterMaterial = new THREE.MeshBasicMaterial( {color: 0x1A7A3A, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending} );
				var agua = new THREE.Mesh(waterGeometry, waterMaterial);
				agua.rotation.x = -0.5 * Math.PI;
				agua.position.y = -10;
				scene.add(agua);


				// Inicializamos el color del fondo y el tamano
				renderer.setClearColor(0x000000, 1.0);
				renderer.setSize(window.innerWidth, window.innerHeight);
				renderer.shadowMapEnabled = true;

				// Creamos la camara
				camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
				// Posicionamos la camara en el centro de la escena
				

		

				texture = THREE.ImageUtils.loadTexture('wall.jpg', {}, function() {
					// Creamos un plano
					texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
					texture.repeat.set( 10, 10 );
					var planeGeometry = new THREE.BoxGeometry(200, 850, 1);
					var planeMaterial = new THREE.MeshLambertMaterial({map:texture});


					var plane = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 40), planeMaterial, 0);
					plane.receiveShadow = true;
					plane.rotation.x = -0.5 * Math.PI;
					plane.position.y = -20;
    				scene.add(plane);

    				var plane10 = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 40), planeMaterial, 0);
					plane10.receiveShadow = true;
					plane10.rotation.x = -0.5 * Math.PI;
					plane10.position.y = -20;
					plane10.position.z = 300;
    				scene.add(plane10);

    				var plane2 = new THREE.Mesh(planeGeometry, planeMaterial, 0);
    				plane2.rotation.y = -0.5 * Math.PI;
    				plane2.position.x = 100
    				plane2.rotation.z = 0.5 * Math.PI;
    				plane2.position.y = 60;
    				scene.add(plane2);

    				var plane3 = new THREE.Mesh(planeGeometry, planeMaterial, 0);
    				plane3.rotation.y = 0.5 * Math.PI;
    				plane3.position.x = -100
    				plane3.rotation.z = 0.5 * Math.PI;
    				plane3.position.y = 60;
    				scene.add(plane3);
				});


				// Incluimos el plano en la escena
				


				loader = new THREE.OBJMTLLoader();
				//loadModel('Grass/grass')
				loadModel('Drake/drake');
				//loadModel('portal/portalturret');
				//loadModel('Strider/Strider');
				// load an obj / mtl resource pair
				

				//var audio = new Audio('uncharted.mp3');
				//audio.loop = true;
				//audio.play();

				var light = new THREE.AmbientLight( 0x5F5F5F ); // soft white light
				scene.add( light );


				light = new THREE.PointLight( 0xff0000, 1, 100 );
				light.position.set(0, 10, 0);
				// Incluimos la luz a la escena
				scene.add(light);

				// Creamos una luz de tipo spot
				spotLight = new THREE.PointLight( 0xffffff, 1, 200 );
				spotLight.position.set(0, 15, 0);
				// Incluimos la luz a la escena
				scene.add(spotLight);

				// Incluimos la salida del render al elemento html
				document.body.appendChild(renderer.domElement);

				window.addEventListener("keydown", onKeyDown, false);
				window.addEventListener("keyup", onKeyUp, false);

				// Llamamos a la funcion de visualizacion 
				
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

			function loadModel(src){
					loader.load(
					// OBJ resource URL
					src+'.obj',
					// MTL resource URL
					src+'.mtl',
				// Function when both resources are loaded
				function (src, object) {
					console.log(src);
					personaje = object;
					console.log("personaje")
					console.log(personaje)
					scene.add(personaje);
					console.log(personaje)
					//Sortu kolisioendako
					planeGeometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
					var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
					personajeColision = new THREE.Mesh( planeGeometry, material );
					scene.add(personajeColision);
					render();
				}.bind(null, src),
				// Function called when downloads progress
				function ( xhr ) {
					console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
				},
				// Function called when downloads error
				function ( xhr ) {
					console.log( 'An error happened' );
				}
				);
			}

			function movePersonaje(){
				var keyCount = 0;
				for (pushed in pressedKeys){
					if (pressedKeys[pushed]){
						keyCount ++;
					}
				}
				if (keyCount > 0 && keyCount < 3){
					if (pressedKeys[0]){
						personajeColision.translateZ(1);
					}
					if (pressedKeys[1]){
						personajeColision.translateZ(-1);
					}
					if (pressedKeys[2]){
						personajeColision.translateX(1);
					}
					if (pressedKeys[3]){
						personajeColision.translateX(-1);
					}
				}
				personaje.position = personajeColision.position;
				rotarPersonaje(keyCount);
			}

			function rotarPersonaje(keyCount){
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

				}
			}

			function changeRotation(){
				var changAngle = 0.01;
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
					personajeColision.rotation.y = angle;
					movePersonaje();
					camera.position.copy(personajeColision.position);
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