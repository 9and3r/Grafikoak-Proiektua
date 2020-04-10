function Level5(){
	BaseLevel.call(this, 5, 'Nivel 5', getSound('shrek-1'));
}

Level5.prototype = Object.create(BaseLevel.prototype);
Level5.prototype.constructor = Level4;

Level5.prototype.onInit = function(){

	// Ambient light
	var light = new THREE.AmbientLight( 0xFFFFFF); // soft white light
	this.scene.add(light);

	var harry = getModel('nathan');
	harry.scale.setComponent(0, 20);
	harry.scale.setComponent(1, 20);
	harry.scale.setComponent(2, 20);
	console.log(harry);
	this.scene.add(harry);

	// Cielo
	var geometry = new THREE.SphereGeometry(3000, 10, 10);
	var sky = new THREE.Mesh(geometry, getMaterial('sky'));
	this.scene.add(sky);
	// Poner la textura por dentro de la geometria
	sky.material.side = THREE.BackSide;

	// Grass
	var floor = new THREE.Mesh(new THREE.BoxGeometry(5000, 200, 10000), getMaterial('grass'), 0);
	floor.position.y = -100;
	floor.position.z = 4900;
	floor.position.x = -2600;
	floor.material.map.repeat.set(50, 50);
	this.addSolidObject(floor);

	// Grass 2
	var floor = new THREE.Mesh(new THREE.BoxGeometry(5000, 200, 10000), getMaterial('grass'), 0);
	floor.position.y = -100;
	floor.position.z = 4900;
	floor.position.x = 2600;
	this.addSolidObject(floor);

	// Floor
	var floor = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 600), getMaterial('tierra'), 0);
	floor.position.y = -100;
	floor.position.z = 200;
	floor.material.map.repeat.set(3, 7);
	this.addSolidObject(floor);

	// Finish spawn
	var spawn = new Spawn(this, this.scene, true, true);
	spawn.setPosition(0, 350, 1000);
	this.addRenderObject(spawn);


	var slap = new SlapChop(this, 0, 170, 1000);



	//cylinder3.position.z = cylinder.position.z;
	//cylinder3.position.y = cylinder2.position.y + (geometry2.parameters.height/2) + (geometry3.parameters.height/2) + 10;
}

