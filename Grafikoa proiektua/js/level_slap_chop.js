function LevelSlapChop(){
	BaseLevel.call(this, 1, 'Nivel 1', getSound('uncharted'));
}

LevelSlapChop.prototype = Object.create(BaseLevel.prototype);
LevelSlapChop.prototype.constructor = LevelSlapChop;

LevelSlapChop.prototype.onInit = function(){

	// Cielo
	var geometry = new THREE.SphereGeometry(3000, 10, 10);
	var sky = new THREE.Mesh(geometry, getMaterial('sky'));
	this.scene.add(sky);
	// Poner la textura por dentro de la geometria
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

	// Mobile platform
	var door = new THREE.Mesh(new THREE.BoxGeometry(200, 100, 100), getMaterial('rock'), 0);
	door.position.z = 600;
	var plat = new MobilePlatform(door, -50, 50, 1, 2, 1000);
	this.addMovingObject(plat);

	// 2 Floor
	var floor = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 700), getMaterial('tierra'), 0);
	floor.position.y = -100;
	floor.position.z = 1050;
	floor.material.map.repeat.set(3, 7);
	this.addSolidObject(floor);

	// Finish spawn
	var spawn = new Spawn(this, this.scene, true, true);
	spawn.setPosition(0, 0, 1200);
	this.addRenderObject(spawn);

	


	// Slap chop
	var geometry = new THREE.CylinderBufferGeometry(20, 25, 50, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF} );
	var cylinder = new THREE.Mesh( geometry, material );
	cylinder.position.z = 50;
	cylinder.position.y = 50;
	this.addSolidObject(cylinder);

	var geometry = new THREE.CylinderBufferGeometry(10, 20, 15, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0x000000} );
	var cylinder = new THREE.Mesh( geometry, material );
	cylinder.position.z = 50;
	cylinder.position.y = 83;
	this.addSolidObject(cylinder);



	var geometry = new THREE.CylinderBufferGeometry(3, 3, 60, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0x999999} );
	var cylinder = new THREE.Mesh( geometry, material );
	cylinder.position.y = 120;
	cylinder.position.z = 50;

	var plat = new MobilePlatform(cylinder, 70, 50, 1, 2, 1000);
	this.addMovingObject(plat);

	var geometry = new THREE.SphereBufferGeometry(15, 200, 200, Math.PI, Math.PI, 3*Math.PI/2);
	var material = new THREE.MeshBasicMaterial( {color: 0x000000} );
	var sphere = new THREE.Mesh( geometry, material );
	sphere.position.y = 150;
	sphere.position.z = 50;

	var plat = new MobilePlatform(sphere, 100, 50, 1, 2, 1000);
	this.addMovingObject(plat);


}




