Spawn = function(level, scene, active, directionUp){

	this.base = new THREE.Object3D();
	this.active = active;
	this.directionUp = directionUp;

	var geometry = new THREE.CylinderGeometry(15, 17, 5, 32);
	this.cylinder = new THREE.Mesh(geometry, undefined);
	this.cylinder.position.y = 2.5;
	this.base.add(this.cylinder);
	this.cylinder.controller = this;
	level.addSolidObject(this.cylinder);

	this.particleCount = 3800;

    this.particles = new THREE.Geometry();
    this.particleMaterial = new THREE.ParticleBasicMaterial({size: 1});


 	this.currentColor = [Math.random(), Math.random(), Math.random()];
 	this.targetColor = [Math.random(), Math.random(), Math.random()];

 	this.light = new THREE.PointLight( 0xff0000, 5, 100 );
 	this.light.position.y = 30;
	this.base.add(this.light);

	// now create the individual particles
	for (var p = 0; p < this.particleCount; p++) {

		var distance = Math.random() * Spawn.radious;
		var angle = Math.random() * Math.PI * 2;
      	var particle = new THREE.Vector3(distance*Math.cos(angle), Math.random()*Spawn.maxY, distance*Math.sin(angle));
  		this.particles.vertices.push(particle);
	}

	// create the particle system
 	this.particleSystem = new THREE.Points(this.particles, this.particleMaterial);
 	this.particleSystem.sortParticles = true;
 	this.base.add(this.particleSystem);

 	scene.add(this.base);
}

Spawn.prototype.setPosition = function(x, y, z){
	this.cylinder.position.x = x;
	this.cylinder.position.y = y + 2.5;
	this.cylinder.position.z = z;
	this.base.position.x = x;
	this.base.position.y = y;
	this.base.position.z = z;
}

Spawn.radious = 15;
Spawn.maxY = 400;
Spawn.colorChange = 0.01;
Spawn.speed = 0.5;
Spawn.nearMax = 5;

Spawn.prototype.render = function(avatar){
	this.particleSystem.rotation.y += 0.02;
	for (var i=0; i<this.particles.vertices.length; i++){
		var particle = this.particles.vertices[i];
		if (this.directionUp){
			particle.y += Spawn.speed;
			if (particle.y > Spawn.maxY){
				particle.y = 0;
			}
		}else{
			particle.y -= Spawn.speed;
			if (particle.y < 0){
				particle.y = Spawn.maxY;
			}
		}
	}
	this.calculateColor();
	this.particles.verticesNeedUpdate = true;
}

Spawn.prototype.calculateColor = function(){
	for (var i=0; i<3; i++){
		if (this.currentColor[i] - this.targetColor[i] > Spawn.colorChange){
			this.currentColor[i] -= Spawn.colorChange;
		}else if (this.targetColor[i] - this.currentColor[i] > Spawn.colorChange){
			this.currentColor[i] += Spawn.colorChange;
		}else{
			this.targetColor[i] = Math.random();
		}
	}
	this.particleMaterial.color.r = this.currentColor[0];
	this.particleMaterial.color.g = this.currentColor[1];
	this.particleMaterial.color.b = this.currentColor[2];
	this.light.color = this.particleMaterial.color;
	this.cylinder.material.color = this.particleMaterial.color;
}

Spawn.prototype.onFloor = function(avatarControll){
	if (this.active && Math.abs(avatarControll.avatar.position.x - this.cylinder.position.x) < Spawn.nearMax && Math.abs(avatarControll.avatar.position.z - this.cylinder.position.z) < Spawn.nearMax){
		var sound = getSound('finish');
		sound.play();
		avatarControll.upAnimation = true;
		avatarControll.targetCameraZ = -300;
		avatarControll.targetCameraY = 10;
		window.setTimeout(nextLevel, 5000);
	}
}

