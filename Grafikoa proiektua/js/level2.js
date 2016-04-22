function Level2(){
	BaseLevel.call(this, 1, 'Level 1', getSound('pyramid'));
}

Level2.prototype = Object.create(BaseLevel.prototype);
Level2.prototype.constructor = Level2;

Level2.prototype.onInit = function(){

	

	//var waterGeometry = new THREE.BoxGeometry( 200, 500, 1);
	//var waterMaterial = new THREE.MeshBasicMaterial( {color: 0x1A7A3A, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending} );
	//var agua = new THREE.Mesh(waterGeometry, waterMaterial);
	//agua.rotation.x = -0.5 * Math.PI;
	//agua.position.y = -10;
	//scene.add(agua);
	//solidObjects.push(agua);

	var light = new THREE.AmbientLight( 0x0A0A0A ); // soft white light
	this.scene.add(light);

	

	var spawn = new Spawn(this, this.scene, true, true);
	spawn.setPosition(0, 0, 250);
	this.addRenderObject(spawn);


	//light = new THREE.PointLight( 0xff0000, 1, 100 );
	//light.position.set(0, 10, 0);
	// Incluimos la luz a la escena
	//scene.add(light);

	// Creamos una luz de tipo spot
	spotLight = new THREE.PointLight( 0xffFFFF, 1, 500 );
	spotLight.position.set(10, 30, 0);
	//Incluimos la luz a la escena
	this.scene.add(spotLight);

	var plat = new MobilePlatform(getObject('floor'), 10, 50, 0, 0.3, 1000);
	this.addMovingObject(plat);
	plat.object.position.y = -120;
	plat.object.position.z = 200;
	plat.object.scale.z = 0.3;
	plat.object.scale.x = 0.3;


	var plat = new MobilePlatform(getObject('platform-v'), 100, 150, 1, 2, 1000);
	this.addMovingObject(plat);
	plat.object.position.z = 100;

	

	var geometry = new THREE.CylinderGeometry( 10, 10, 50, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	personajeColision = new THREE.Mesh( geometry, material );
	personajeColision.applyMatrix(new THREE.Matrix4().makeTranslation(0,25,0));
	//personaje.add(personajeColision);

	wall = getObject('wall');
	wall.position.x = 100;
	this.scene.add(wall);
	this.avatarControll.solidObjects.push(wall);

	wall = getObject('wall');
	wall.position.z = -100;
	wall.position.x = -100;
	this.scene.add(wall);
	this.avatarControll.solidObjects.push(wall);



	wall = getObject('floor');
	wall.position.y = -130;
	wall.position.z = 0;
	this.scene.add(wall);
	this.avatarControll.solidObjects.push(wall);


	wall = getObject('floor');
	wall.position.z = 250;
	wall.position.y = -130;
	
	this.scene.add(wall);
	this.avatarControll.solidObjects.push(wall);

	var sky = getObject('sky');
	sky.position.z = 1000;
	this.scene.add(sky)

	song = getSound('pyramid');
	//song.play();
}



