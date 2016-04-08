			var renderer;
			var scene;
			var camera;
			var raycaster;
			var solidObjects = [];

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

				raycaster = new THREE.Raycaster();

				// Creamos la camara
				camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
				// Posicionamos la camara en el centro de la escena

		     	// Incluimos la salida del render al elemento html
				document.body.appendChild(renderer.domElement);

				window.addEventListener("keydown", onKeyDown, false);
				window.addEventListener("keyup", onKeyUp, false);

				//showLoading();

				requestAnimationFrame(render);
		     }

			function onGameLoaded() {
				loadLevel();
			}

			


			/**
			 * Funcion para visualizar la escena
			 * El intervalo viene dado por requestAnimationFrame
			 **/
			function render() {
				// render utilizando requestAnimationFrame
				moveCamaraAndPersonaje();
				//onRenderLoader();
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