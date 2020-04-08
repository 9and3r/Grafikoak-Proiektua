function Level4(){
	BaseLevel.call(this, 4, 'Nivel 4', getSound('uncharted-4'));
}

Level4.prototype = Object.create(BaseLevel.prototype);
Level4.prototype.constructor = Level4;

Level4.prototype.onInit = function(){


	// Ambient light
	var light = new THREE.AmbientLight( 0xFFAAAA ); // soft white light
	this.scene.add(light);



	// Lava
	this.lava1 = new THREE.Mesh(new THREE.BoxGeometry(5000, 200, 10000), getMaterial('lava-1'), 0);
	this.lava1.material.map.repeat.set(30, 30);
	this.lava1.position.y = -160;
	this.lava1.position.z = 4500;
	this.lava1.position.x = -2500;
	this.scene.add(this.lava1);

	// Lava
	this.lava2 = new THREE.Mesh(new THREE.BoxGeometry(5000, 200, 10000), getMaterial('lava-2'), 0);
	this.lava2.material.map.repeat.set(30, 30);
	this.lava2.position.y = -160;
	this.lava2.position.z = 4500;
	this.lava2.position.x = 2500;
	this.scene.add(this.lava2);

	// Floor
	var floor = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 300), getMaterial('rock'), 0);
	floor.position.z = 50;
	floor.position.y = -100;
	this.addSolidObject(floor);

	for (var i=0; i<15; i++){
		// Rock
		var rock = new THREE.Mesh(new THREE.BoxGeometry(100, 200, 100), getMaterial('rock'), 0);
		rock.position.z = 280 + i*140;
		rock.position.y = -100;
		var plat = new FallPlatform(rock, i*0.08 + 0.1);
		this.addMovingObject(plat);
	}

	// Volcan
	var geometry = new THREE.CylinderGeometry(200, 1000, 400, 16);
	var cylinder = new THREE.Mesh(geometry, getMaterial('lava-rock'));
	cylinder.position.z = 3300;
	cylinder.position.y = 150;
	this.addSolidObject(cylinder);

	// Finish spawn
	var spawn = new Spawn(this, this.scene, true, true);
	spawn.setPosition(0, 350, cylinder.position.z);
	this.addRenderObject(spawn);


}


Level4.prototype.onRender = function(camera){
	if (this.avatarControll.avatar.position.y < BaseLevel.dieY){
		this.avatarControll.targetScale.y = 0;
	}
	this.lava1.material.map.offset.x += 0.003;
	this.lava1.material.map.offset.y -= 0.003;
	this.lava2.material.map.offset.x -= 0.003;
	this.lava2.material.map.offset.y -= 0.003;
}
