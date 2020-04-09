			var renderer;
			var scene;
			var camera;
			var raycaster;
			var solidObjects = [];
			var currentLevel;
			var stats;
			var clock;

			var levels;

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
				camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 30000);
				// Posicionamos la camara en el centro de la escena

		     	// Incluimos la salida del render al elemento html
				document.body.appendChild(renderer.domElement);


				currentLevel = -1;

				window.addEventListener("keydown", onKeyDown, false);
				window.addEventListener("keyup", onKeyUp, false);
				stats = new Stats();
				stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
				console.log(stats.dom);
				document.body.appendChild(stats.dom);
				stats.dom.style.display = 'block'
			}

			function nextLevel(){
				if (currentLevel+1 < levels.length){
					changeLevel(currentLevel+1);
				}else{
					document.getElementById('finish').style.display = 'block';
				}
			}

			function changeLevel(level){
				if (currentLevel >= 0){
					levels[currentLevel].finish();
				}
				currentLevel = level;
				document.getElementById('finish').style.display = 'none'
				levels[currentLevel].init();
			}

			function onKeyDown(e){
				if (currentLevel > -1){
					levels[currentLevel].onKeyDown(e);
				}
			}

			function onKeyUp(e){
				if (currentLevel > -1){
					levels[currentLevel].onKeyUp(e);
				}
			}

			function onGameLoaded() {
				levels = [new Level5(), new Level1(), new Level2(), new Level3(), new Level4()];
				document.getElementById('loading').style.display = 'none'
				changeLevel(0);
				requestAnimationFrame(render);
			}

			/**
			 * Funcion para visualizar la escena
			 * El intervalo viene dado por requestAnimationFrame
			 **/
			function render() {
				stats.begin();
				if (currentLevel > -1 && levels[currentLevel].ready){
					levels[currentLevel].render(renderer, camera);
				}
				stats.end();
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