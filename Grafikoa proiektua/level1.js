function loadLevel(){
	personajePosCentro = new THREE.Vector3( 0, 0, 0 );

	var waterGeometry = new THREE.BoxGeometry( 200, 500, 1);
	var waterMaterial = new THREE.MeshBasicMaterial( {color: 0x1A7A3A, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending} );
	var agua = new THREE.Mesh(waterGeometry, waterMaterial);
	agua.rotation.x = -0.5 * Math.PI;
	agua.position.y = -10;
	scene.add(agua);
	solidObjects.push(agua);
	//var audio = new Audio('uncharted.mp3');
	//audio.loop = true;
	//audio.play();

	var light = new THREE.AmbientLight( 0x0A0A0A ); // soft white light
	scene.add( light );


	//light = new THREE.PointLight( 0xff0000, 1, 100 );
	//light.position.set(0, 10, 0);
	// Incluimos la luz a la escena
	//scene.add(light);

	// Creamos una luz de tipo spot
	spotLight = new THREE.PointLight( 0xffffff, 1, 200 );
	spotLight.position.set(0, 15, 0);
	//Incluimos la luz a la escena
	scene.add(spotLight);

	personaje = getModel('nathan');
	scene.add(personaje);

	var geometry = new THREE.CylinderGeometry( 10, 10, 50, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	personajeColision = new THREE.Mesh( geometry, material );
	personajeColision.applyMatrix(new THREE.Matrix4().makeTranslation(0,25,0));
	personaje.add(personajeColision);

	wall = getObject('wall');
	wall.position.x = 100;
	scene.add(wall);
	solidObjects.push(wall);

	wall = getObject('wall');
	wall.position.z = -100;
	wall.position.x = -100;
	scene.add(wall);
	solidObjects.push(wall);

	wall = getObject('wall');
	wall.position.z = 250;
	wall.rotation.y = Math.PI/2;
	scene.add(wall);
	solidObjects.push(wall);

	song = getSound('pyramid');
	//song.play();
}