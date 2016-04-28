function Level2(){
	BaseLevel.call(this, 1, 'Level 1', getSound('pyramid'));
}

Level2.prototype = Object.create(BaseLevel.prototype);
Level2.prototype.constructor = Level2;

Level2.prototype.onInit = function(){

	// Ambient light
	var light = new THREE.AmbientLight( 0xAAAAAA ); // soft white light
	this.scene.add(light);

	// Invisible wall
	var wall = new THREE.Mesh(new THREE.BoxGeometry(200, 400, 10), getMaterial('invisible'), 0);
	wall.position.z = -50;
	wall.position.y = 200;
	this.addSolidObject(wall);

	// First floor
	var floor = new THREE.Mesh(new THREE.BoxGeometry(200, 100, 350), getMaterial('rock'), 0);
	floor.position.y = -50;
	floor.position.z = 80;
	this.addSolidObject(floor);

	// Second floor
	var floor = new THREE.Mesh(new THREE.BoxGeometry(200, 300, 350), getMaterial('rock'), 0);
	floor.position.y = -150;
	floor.position.z = 480;
	this.addSolidObject(floor);

	// Vertical door
	var door = new THREE.Mesh(new THREE.BoxGeometry(200, 500, 10), getMaterial('rock'), 0);
	door.position.z = 470;
	var plat = new MobilePlatform(door, 200, 150, 1, 2, 1000);
	this.addMovingObject(plat);

	// Horizontal platform
	var platform = new THREE.Mesh(new THREE.BoxGeometry(70, 100, 70), getMaterial('rock'), 0);
	platform.position.y = -50;
	plat = new MobilePlatform(platform, 720, 150, 2, 2, 1000);
	this.addMovingObject(plat);

	// Third floor
	var floor = new THREE.Mesh(new THREE.BoxGeometry(200, 300, 350), getMaterial('rock'), 0);
	floor.position.y = -150;
	floor.position.z = 1100;
	this.addSolidObject(floor);

	// Finish spawn
	var spawn = new Spawn(this, this.scene, true, true);
	spawn.setPosition(0, 0, 1200);
	this.addRenderObject(spawn);

	//Wall right
	var wall = new THREE.Mesh(new THREE.BoxGeometry(10, 600, 1450), getMaterial('rock'), 0);
	wall.position.x = -100
	wall.position.z = 550;
	this.addSolidObject(wall);

	//Wall left
	var wall = new THREE.Mesh(new THREE.BoxGeometry(10, 600, 1450), getMaterial('rock'), 0);
	wall.position.x = 100;
	wall.position.z = 550;
	this.addSolidObject(wall);

	//Wall finish
	var wall = new THREE.Mesh(new THREE.BoxGeometry(200, 400, 10), getMaterial('rock'), 0);
	wall.position.z = 1270;
	wall.position.y = 200;
	this.addSolidObject(wall);
}

Level2.prototype.onRender = function(){
	if (this.avatarControll.avatar.position.z > 600){
		//this.avatarControll.targetAngle = Math.PI * 3 / 2;
	}
}



