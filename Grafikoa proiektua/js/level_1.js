function Level1(){
	BaseLevel.call(this, 1, 'Level 1', getSound('uncharted'));
}

Level1.prototype = Object.create(BaseLevel.prototype);
Level1.prototype.constructor = Level1;

Level1.prototype.onInit = function(){

	var geometry = new THREE.SphereGeometry(3000, 10, 10);
	var sky = new THREE.Mesh(geometry, getMaterial('proba'));
	this.scene.add(sky);
	sky.material.side = THREE.BackSide;

	// Ambient light
	var light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
	this.scene.add(light);

	// Invisible wall
	var wall = new THREE.Mesh(new THREE.BoxGeometry(200, 400, 10), getMaterial('invisible'), 0);
	wall.position.z = -50;
	wall.position.y = 200;
	this.addSolidObject(wall);

	// Grass
	var floor = new THREE.Mesh(new THREE.BoxGeometry(5000, 200, 10000), getMaterial('grass'), 0);
	floor.position.y = -100;
	floor.position.z = 4900;
	floor.position.x = -2600;
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
	this.addSolidObject(floor);

	// Mobile platform
	var door = new THREE.Mesh(new THREE.BoxGeometry(200, 100, 100), getMaterial('rock'), 0);
	door.position.z = 600;
	var plat = new MobilePlatform(door, -50, 50, 1, 2, 1000);
	this.addMovingObject(plat);

	// 2 Floor
	var floor = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 700), getMaterial('tierra'), 0);
	floor.position.y = -100;
	floor.position.z = 1050;
	this.addSolidObject(floor);



	// Piramide izquierda
	var wall = new THREE.Mesh(new THREE.CylinderGeometry(1, 350, 300, 3), getMaterial('rock'), 0);
	wall.position.z = 1200;
	wall.position.y = 150;
	wall.position.x = -200;
	wall.rotation.y = - Math.PI / 2;
	this.addSolidObject(wall);

	// Piramide derecha
	var wall = new THREE.Mesh(new THREE.CylinderGeometry(1, 350, 300, 3), getMaterial('rock'), 0);
	wall.position.z = 1200;
	wall.position.y = 150;
	wall.position.x = 200;
	wall.rotation.y = Math.PI / 2;
	this.addSolidObject(wall);

	// Piramide grande
	var wall = new THREE.Mesh(new THREE.CylinderGeometry(1, 500, 500, 3), getMaterial('rock'), 0);
	wall.position.z = 1500;
	wall.position.y = 250;
	wall.position.x = 0;
	this.addSolidObject(wall);


	// TODO HAU KENDU
	//this.avatarControll.avatar.position.z = 1300;

	// Finish spawn
	var spawn = new Spawn(this, this.scene, true, true);
	spawn.setPosition(0, 0, 1200);
	this.addRenderObject(spawn);

	// Trees
		var numberOftrees = 40;
		for (var i=0; i<numberOftrees; i++){
			var z = 1000/numberOftrees * i;

			// Arboles de la derecha
			var model = getObject('tree');
			model.position.x = 120 + Math.random() * 300;
			model.position.z = z + Math.random()*20;
			model.position.y = model.scale.y / 2;
			this.scene.add(model);

			// Bush izquierda
			var model = getObject('bush');
			model.position.x = -150 - Math.random() * 300;
			model.position.z = z;
			model.position.y = model.scale.y / 2;
			this.scene.add(model);

			// Bush derecha
			var model = getObject('bush');
			model.position.x = 150 + Math.random() * 300;
			model.position.z = z;
			model.position.y = model.scale.y / 2;
			this.scene.add(model);

			// Arboles de la izquierda
			var model = getObject('tree');
			model.position.x = -120 - Math.random() * 300;
			model.position.z = z;
			model.position.y = model.scale.y / 2;
			this.scene.add(model);
	}
	

	// Side wals
	var wall = new THREE.Mesh(new THREE.BoxGeometry(10, 600, 10000), getMaterial('invisible'), 0);
	wall.position.z = 0;
	wall.position.y = 300;
	wall.position.x = 105;
	this.addSolidObject(wall);

	var wall = new THREE.Mesh(new THREE.BoxGeometry(10, 600, 10000), getMaterial('invisible'), 0);
	wall.position.z = 0;
	wall.position.y = 300;
	wall.position.x = -105;
	this.addSolidObject(wall);

	var wall = new THREE.Mesh(new THREE.BoxGeometry(600, 600, 10), getMaterial('invisible'), 0);
	wall.position.z = 1400;
	wall.position.y = 300;
	wall.position.x = 0;
	this.addSolidObject(wall);

	

}



