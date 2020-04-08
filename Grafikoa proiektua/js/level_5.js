function Level5(){
	BaseLevel.call(this, 5, 'Nivel 5', getSound('uncharted-4'));
}

Level5.prototype = Object.create(BaseLevel.prototype);
Level5.prototype.constructor = Level4;

Level5.prototype.onInit = function(){

	// Ambient light
	var light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
	this.scene.add(light);

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

	// Slap chop base
	var geometry = new THREE.CylinderGeometry(100, 120, 160, 32);
	var cylinder = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: 'white'}));
	cylinder.position.z = 600;
	cylinder.position.y = 100;
	this.addSolidObject(cylinder);

	var geometry2 = new THREE.CylinderGeometry(60, 100, 60, 32);
	var cylinder2 = new THREE.Mesh(geometry2, new THREE.MeshPhongMaterial({color: 'black'}));
	cylinder2.position.z = cylinder.position.z;
	cylinder2.position.y = cylinder.position.y + (geometry.parameters.height/2) + (geometry2.parameters.height/2);
	this.addSolidObject(cylinder2);

	var geometry3 = new THREE.CylinderGeometry(10, 60, 60, 32);
	var cylinder3 = new THREE.Mesh(geometry3, new THREE.MeshPhongMaterial({color: 'black'}));
	cylinder3.position.z = cylinder.position.z;
	cylinder3.position.y = cylinder2.position.y + (geometry2.parameters.height/2) + (geometry3.parameters.height/2) + 10;
	this.addSolidObject(cylinder2);
}


Level5.prototype.onRender = function(camera){
	if (this.avatarControll.avatar.position.y < BaseLevel.dieY){
		this.avatarControll.targetScale.y = 0;
	}
}
