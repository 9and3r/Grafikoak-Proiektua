function Level4(){
	BaseLevel.call(this, 1, 'Level 1', getSound('uncharted-sink'));
}

Level4.prototype = Object.create(BaseLevel.prototype);
Level4.prototype.constructor = Level4;

Level4.prototype.onInit = function(){


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
	floor.position.z = 50;
	floor.position.y = -100;
	this.addSolidObject(floor);

	// Rock
	var rock = new THREE.Mesh(new THREE.BoxGeometry(100, 200, 100), getMaterial('rock'), 0);
	rock.position.z = 280;
	rock.position.y = -100;
	var plat = new FallPlatform(rock, 0.2);
	this.addMovingObject(plat);

	// Rock
	var rock = new THREE.Mesh(new THREE.BoxGeometry(100, 200, 100), getMaterial('rock'), 0);
	rock.position.z = 400;
	rock.position.y = -100;
	var plat = new FallPlatform(rock, 0.3);
	this.addMovingObject(plat);

	// Rock
	var rock = new THREE.Mesh(new THREE.BoxGeometry(100, 200, 100), getMaterial('rock'), 0);
	rock.position.z = 520;
	rock.position.y = -100;
	var plat = new FallPlatform(rock, 0.4);
	this.addMovingObject(plat);

	// Rock
	var rock = new THREE.Mesh(new THREE.BoxGeometry(100, 200, 100), getMaterial('rock'), 0);
	rock.position.z = 640;
	rock.position.y = -100;
	var plat = new FallPlatform(rock, 0.5);
	this.addMovingObject(plat);

	// Rock
	var rock = new THREE.Mesh(new THREE.BoxGeometry(100, 200, 100), getMaterial('rock'), 0);
	rock.position.z = 760;
	rock.position.y = -100;
	var plat = new FallPlatform(rock, 0.6);
	this.addMovingObject(plat);

	// Rock
	var rock = new THREE.Mesh(new THREE.BoxGeometry(100, 200, 100), getMaterial('rock'), 0);
	rock.position.z = 880;
	rock.position.y = -100;
	var plat = new FallPlatform(rock, 0.7);
	this.addMovingObject(plat);

	// Rock
	var rock = new THREE.Mesh(new THREE.BoxGeometry(100, 200, 100), getMaterial('rock'), 0);
	rock.position.z = 1000;
	rock.position.y = -100;
	var plat = new FallPlatform(rock, 0.8);
	this.addMovingObject(plat);

	// Rock
	var rock = new THREE.Mesh(new THREE.BoxGeometry(100, 200, 100), getMaterial('rock'), 0);
	rock.position.z = 1120;
	rock.position.y = -100;
	var plat = new FallPlatform(rock, 0.9);
	this.addMovingObject(plat);

	// Volcan
	var geometry = new THREE.CylinderGeometry(200, 2000, 900, 10);
	var cylinder = new THREE.Mesh(geometry, getMaterial('lava-rock'));
	cylinder.position.z = 2200;
	cylinder.position.y = -100;
	this.addSolidObject(cylinder);

	// Finish spawn
	var spawn = new Spawn(this, this.scene, true, true);
	spawn.setPosition(0, 350, 2200);
	this.addRenderObject(spawn);
}


Level4.prototype.onRender = function(camera){
	if (this.avatarControll.avatar.position.y < BaseLevel.dieY){
		this.avatarControll.targetScale.y = 0;
	}
	this.lava.material.map.offset.y -= 0.003;
}
