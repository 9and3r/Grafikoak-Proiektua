function Level3(){
	BaseLevel.call(this, 1, 'Level 1', getSound('uncharted-sink'));
}

Level3.prototype = Object.create(BaseLevel.prototype);
Level3.prototype.constructor = Level3;

Level3.prototype.onInit = function(){

	var geometry = new THREE.SphereGeometry(3000, 10, 10);
	var sky = new THREE.Mesh(geometry, getMaterial('sky'));
	//this.scene.add(sky);
	//sky.material.side = THREE.BackSide;

	// Ambient light
	var light = new THREE.AmbientLight( 0xFFAAAA ); // soft white light
	this.scene.add(light);

	// Invisible wall
	var wall = new THREE.Mesh(new THREE.BoxGeometry(200, 400, 10), getMaterial('invisible'), 0);
	wall.position.z = -50;
	wall.position.y = 200;
	this.addSolidObject(wall);

	// Lava
	this.lava = new THREE.Mesh(new THREE.BoxGeometry(5000, 200, 10000), getMaterial('lava'), 0);
	this.lava.position.y = -160;
	this.lava.position.z = 0;
	this.lava.position.x = 0;
	this.scene.add(this.lava);

	// Floor
	var floor = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 300), getMaterial('rock'), 0);
	floor.position.y = -100;
	floor.position.z = 50;
	this.addSolidObject(floor);

	// Wall
	var wall = new THREE.Mesh(new THREE.BoxGeometry(10, 600, 300), getMaterial('rock'), 0);
	wall.position.y = 0;
	wall.position.x = -100;
	this.addSolidObject(wall);

	// Wall
	var wall = new THREE.Mesh(new THREE.BoxGeometry(10, 600, 300), getMaterial('rock'), 0);
	wall.position.y = 0;
	wall.position.x = 100;
	this.addSolidObject(wall);

	// Wall
	var wall = new THREE.Mesh(new THREE.BoxGeometry(200, 400, 50), getMaterial('rock'), 0);
	wall.position.y = 280;
	wall.position.x = 0;
	wall.position.z = 170;
	this.addSolidObject(wall);

	// Wall
	var wall = new THREE.Mesh(new THREE.BoxGeometry(50, 80, 10), getMaterial('rock'), 0);
	wall.position.y = 40;
	wall.position.x = 75;
	wall.position.z = 150;
	this.addSolidObject(wall);

	// Wall
	var wall = new THREE.Mesh(new THREE.BoxGeometry(50, 80, 10), getMaterial('rock'), 0);
	wall.position.y = 40;
	wall.position.x = -75;
	wall.position.z = 150;
	this.addSolidObject(wall);

	// Wall
	var wall = new THREE.Mesh(new THREE.BoxGeometry(50, 80, 10), getMaterial('rock'), 0);
	wall.position.y = 40;
	wall.position.x = 75;
	wall.position.z = 190;
	this.addSolidObject(wall);

	// Wall
	var wall = new THREE.Mesh(new THREE.BoxGeometry(50, 80, 10), getMaterial('rock'), 0);
	wall.position.y = 40;
	wall.position.x = -75;
	wall.position.z = 190;
	this.addSolidObject(wall);

	// Mobile platform
	var door = new THREE.Mesh(new THREE.BoxGeometry(100, 80, 30), getMaterial('rock'), 0);
	door.position.z = 170;
	door.position.y = 40;
	var plat = new MobilePlatform(door, 50, 50, 0, 1, 1000);
	this.addMovingObject(plat);

	// Mobile platform
	var door = new THREE.Mesh(new THREE.BoxGeometry(100, 80, 30), getMaterial('rock'), 0);
	door.position.z = 170;
	door.position.y = 40;
	var plat = new MobilePlatform(door, -100, 50, 0, 1, 1000);
	plat.reverse = true;
	plat.moved = 50;
	this.addMovingObject(plat);

	// 2 Floor
	var floor = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 400), getMaterial('lava-rock'), 0);
	floor.position.y = -100;
	floor.position.z = 400;
	this.addSolidObject(floor);

	// 2 Floor
	var floor = new THREE.Mesh(new THREE.BoxGeometry(400, 200, 200), getMaterial('lava-rock'), 0);
	floor.position.y = -100;
	floor.position.x = -300;
	floor.position.z = 500;
	this.addSolidObject(floor);

	// Mobile platform
	var door = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), getMaterial('lava-rock'), 0);
	door.position.z = 500;
	door.position.y = -50;
	var plat = new MobilePlatform(door, -900, 300, 0, 1, 1000);
	this.addMovingObject(plat);

	// Mobile platform
	var door = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), getMaterial('lava-rock'), 0);
	door.position.z = 500;
	door.position.x = -1050;
	var plat = new MobilePlatform(door, -150, 100, 1, 1, 1000);
	this.addMovingObject(plat);



}


Level3.prototype.onRender = function(camera){
	if (this.avatarControll.avatar.position.z > 350){
		this.avatarControll.targetAngle = Math.PI * 3 / 2;
	}else{
		this.avatarControll.targetAngle = 0;
	}

	if (this.avatarControll.avatar.position.y < BaseLevel.dieY){
		this.avatarControll.targetScale.y = 0;
	}

	this.lava.material.map.offset.x += Math.random() * 0.003;
	
}


