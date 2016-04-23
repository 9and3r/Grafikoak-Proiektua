function Level2(){
	BaseLevel.call(this, 1, 'Level 1', getSound('pyramid'));
}

Level2.prototype = Object.create(BaseLevel.prototype);
Level2.prototype.constructor = Level2;

Level2.prototype.onInit = function(){

	// Ambient light
	var light = new THREE.AmbientLight( 0xAAAAAA ); // soft white light
	this.scene.add(light);

	// Finish spawn
	var spawn = new Spawn(this, this.scene, true, true);
	spawn.setPosition(0, 0, 250);
	this.addRenderObject(spawn);


	// First floor
	var floor = new THREE.Mesh(new THREE.BoxGeometry(500, 10, 500), getMaterial('rock'), 0);
	floor.position.y = -5;
	this.addSolidObject(floor);

	// Vertical door
	var door = new THREE.Mesh(new THREE.BoxGeometry(500, 500, 10), getMaterial('rock'), 0);
	door.position.z = 250;
	var plat = new MobilePlatform(door, 100, 150, 1, 2, 1000);
	//this.addMovingObject(plat);
	plat.object.position.z = 100;
}



