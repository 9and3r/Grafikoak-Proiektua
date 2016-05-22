function Level3(){
	BaseLevel.call(this, 3, 'Nivel 3', getSound('uncharted-sink'));
}

Level3.prototype = Object.create(BaseLevel.prototype);
Level3.prototype.constructor = Level3;

Level3.prototype.onInit = function(){

	// Ambient light
	var light = new THREE.AmbientLight(0xFFAAAA);
	this.scene.add(light);

	// Invisible wall
	var wall = new THREE.Mesh(new THREE.BoxGeometry(200, 400, 10), getMaterial('invisible'), 0);
	wall.position.z = -50;
	wall.position.y = 200;
	this.addSolidObject(wall);

	// Lava
	this.lava = new THREE.Mesh(new THREE.BoxGeometry(5000, 200, 10000), getMaterial('lava-1'), 0);
	this.lava.position.y = -150;
	this.lava.position.z = 0;
	this.lava.position.x = 0;
	this.lava.material.map.repeat.set(30, 30);
	this.scene.add(this.lava);

	// Wall
	var wall = new THREE.Mesh(new THREE.BoxGeometry(1000, 500, 10), getMaterial('lava-rock'), 0);
	wall.position.y = 200;
	wall.position.x = -100;
	wall.position.z = 855;
	this.scene.add(wall);

	// Wall
	var wall = new THREE.Mesh(new THREE.BoxGeometry(500, 300, 10), getMaterial('lava-rock'), 0);
	wall.position.y = 100;
	wall.position.x = 650;
	wall.position.z = 855;
	this.scene.add(wall);

	// Wall
	var wall = new THREE.Mesh(new THREE.BoxGeometry(1000, 800, 10), getMaterial('lava-rock'), 0);
	wall.position.y = 300;
	wall.position.x = -1100;
	wall.position.z = 855;
	this.scene.add(wall);

	// Wall
	var wall = new THREE.Mesh(new THREE.BoxGeometry(600, 800, 10), getMaterial('lava-rock'), 0);
	wall.position.y = 300;
	wall.position.x = -1400;
	wall.position.z = 195;
	this.scene.add(wall);

	// Wall
	var wall = new THREE.Mesh(new THREE.BoxGeometry(1000, 300, 200), getMaterial('lava-rock'), 0);
	wall.position.y = 100;
	wall.position.x = -600;
	wall.position.z = 100;
	this.scene.add(wall);



	// Fuentes de lava
	this.lavaFallMaterial = getMaterial('lava-2');
	this.lavaFallMaterial.map.repeat.set(1, 5);
	for (var i=0; i<14; i++){
		var lava = new THREE.Mesh(new THREE.BoxGeometry(85, 500, 10), this.lavaFallMaterial, 0);
		lava.position.y = 200;
		lava.position.z = 850;
		lava.position.x = -i * 150 + 600;
		this.scene.add(lava);
	}

	for (var i=0; i<9; i++){
		var lava = new THREE.Mesh(new THREE.BoxGeometry(85, 500, 10), this.lavaFallMaterial, 0);
		lava.position.y = 200;
		lava.position.z = 200;
		lava.position.x = -i * 150 - 150;
		this.scene.add(lava);
	}

	// Lava fondo
	this.lavaFallMaterial2 = getMaterial('lava-3');
	this.lavaFallMaterial2.map.repeat.set(5, 3);
	var lava = new THREE.Mesh(new THREE.BoxGeometry(10, 700, 800), this.lavaFallMaterial2, 0);
	lava.position.y = 300;
	lava.position.z = 500;
	lava.position.x = -1500;
	this.scene.add(lava);
	

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
	this.door1 = new MobilePlatform(door, 50, 50, 0, 1, 1000);
	this.door1.moving = false;
	this.addMovingObject(this.door1);

	// Mobile platform
	var door = new THREE.Mesh(new THREE.BoxGeometry(100, 80, 30), getMaterial('rock'), 0);
	door.position.z = 170;
	door.position.y = 40;
	this.door2 = new MobilePlatform(door, -100, 50, 0, 1, 1000);
	this.door2.moving = false;
	this.door2.reverse = true;
	this.door2.moved = 50;
	this.addMovingObject(this.door2);

	this.doorOpen = false;

	// 2 Floor
	var floor = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 400), getMaterial('rock'), 0);
	floor.position.y = -100;
	floor.position.z = 400;
	this.addSolidObject(floor);

	// 2 Floor
	var floor = new THREE.Mesh(new THREE.BoxGeometry(400, 200, 200), getMaterial('rock'), 0);
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

	// 3 Floor
	var floor = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), getMaterial('lava-rock'), 0);
	floor.position.y = -100;
	floor.position.z = 500;
	floor.position.x = -1250;
	this.addSolidObject(floor);

	// Finish spawn
	var spawn = new Spawn(this, this.scene, true, true);
	spawn.setPosition(-1250, 0, 500);
	this.addRenderObject(spawn);
}


Level3.prototype.onRender = function(camera){
	if (this.avatarControll.avatar.position.z > 50 && !this.doorOpen){
		this.door1.moving = true;
		this.door2.moving = true;
		this.doorOpen = true;
	}

	if (this.avatarControll.avatar.position.z > 350){
		this.avatarControll.targetAngle = Math.PI * 3 / 2;
	}else{
		this.avatarControll.targetAngle = 0;
	}

	if (this.avatarControll.avatar.position.y < BaseLevel.dieY){
		this.avatarControll.targetScale.y = 0;
	}

	this.lava.material.map.offset.x -= 0.02;

	this.lavaFallMaterial.map.offset.y += 0.04;
	this.lavaFallMaterial2.map.offset.y += 0.02;
	
}


