			var renderer;
			var scene;
			var camera;
			var raycaster;
			var solidObjects = [];
			var currentLevel;
			var stats;

			var cameraTest = false;
			var camControls;
			var clock;

			/**
			 * Inicializacion Three.js
		     *
		     * Inicializa la escena, la camara y las luces
			 * Se llama cuando se carga la ventana mediante la funcion window.onload
		     **/
		     function init(){
		     	clock = new THREE.Clock();
		     	loadAll();
		     	
		     	renderer = new THREE.WebGLRenderer();

		     	// Inicializamos el color del fondo y el tamano
				
				renderer.setSize(window.innerWidth, window.innerHeight);
				renderer.shadowMapEnabled = true;

				raycaster = new THREE.Raycaster();

				// Creamos la camara
				camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
				// Posicionamos la camara en el centro de la escena

		     	// Incluimos la salida del render al elemento html
				document.body.appendChild(renderer.domElement);

				currentLevel = new Level2();

				window.addEventListener("keydown", onKeyDown, false);
				window.addEventListener("keyup", onKeyUp, false);

				if (cameraTest){
					window.addEventListener("keypress", onKeyPress, false);
				}
				

				//showLoading();
				
				stats = new Stats();
				stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
				document.body.appendChild( stats.dom );
				stats.dom.style.display = 'block'
				
				requestAnimationFrame(render);
		     }

		     function onKeyDown(e){
		     	currentLevel.onKeyDown(e);
		     }

		     function onKeyUp(e){
		     	currentLevel.onKeyUp(e);
		     }

		     var cameraSpeed = 3;
		     var cameraRotationSpeed = 0.1;
		     function onKeyPress(e){
		     	console.log(e.keyCode)
		     	switch(e.keyCode){
		     		case 56:
		     			camera.translateZ(-cameraSpeed);
		     			break;
		     		case 53:
		     			camera.translateZ(cameraSpeed);
		     			break;
		     		case 52:
		     			camera.translateX(-cameraSpeed);
		     			break;
		     		case 54:
		     			camera.translateX(cameraSpeed);
		     			break;
		     		case 241:
		     			camera.rotation.y -= cameraRotationSpeed;
		     			break;
		     		case 107:
		     			camera.rotation.y += cameraRotationSpeed;
		     			break;
		     		case 111:
		     			camera.translateY(cameraSpeed);
		     			break;
		     		case 108:
		     			camera.translateY(-cameraSpeed);
		     			break;
		     	}
		     }

			function onGameLoaded() {
				document.getElementById('loading').style.display = 'none'
				currentLevel.init();
			}

			/**
			 * Funcion para visualizar la escena
			 * El intervalo viene dado por requestAnimationFrame
			 **/
			function render() {
				// render utilizando requestAnimationFrame
				//moveCamaraAndPersonaje();
				stats.begin();

				onRenderLoader();
				if (currentLevel.ready){
					currentLevel.render(renderer, camera)
				}
				stats.end();

				if (cameraTest){
					
				}

				requestAnimationFrame(render);
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