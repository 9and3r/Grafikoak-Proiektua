BaseLevel = function(number, name, music){
	this.number = number;
	this.name = name;
	this.scene = null;
	this.avatarControll = null;
	this.ready = false;
	this.playing = false;
	this.movingObjects = [];
	this.renderObjects = [];
	this.sceneMusic = music;
}

BaseLevel.prototype.init = function(){
	
	this.initScene();
	this.initAvatarAndSpawn();
	this.initMusic();
	this.onInit();

	var axisHelper = new THREE.AxisHelper(300);
	this.scene.add( axisHelper );

	this.ready = true;
	this.playing = true;
}

BaseLevel.prototype.initScene = function(){
	this.scene = new THREE.Scene({ antialias: true });
	document.getElementById('game-over').style.display = 'none'
	document.getElementById('level-text').style.display = 'block'
	window.setTimeout(function(){
		document.getElementById('level-text').style.display = 'none'
	}, 100);
}

BaseLevel.prototype.initAvatarAndSpawn = function(){
	this.avatarControll = new AvatarControll(getModel('nathan'));
	this.avatarControll.avatar.position.y = 150;
	this.scene.add(this.avatarControll.avatar);

	var spawn = new Spawn(this, this.scene, false, false);
	this.addRenderObject(spawn);

	getSound('warp').play();
}

BaseLevel.prototype.initMusic = function(){
	if (this.sceneMusic){
		this.sceneMusic.currentTime = 0;
		this.sceneMusic.loop = true;
		this.sceneMusic.play();
	}
}

BaseLevel.prototype.onInit = function(){

}

BaseLevel.prototype.finish = function(){
	if (this.sceneMusic){
		this.sceneMusic.pause();
	}
	this.onFinish();
}

BaseLevel.prototype.onFinish = function(){

}



BaseLevel.prototype.render = function(renderer, camera){




	this.onRender(camera);

	if(this.avatarControll){
		this.avatarControll.moveCameraAndAvatar(this.playing, camera);

		if (this.avatarControll.avatar.position.y < -100 && this.playing){
			this.die(true);
		}
	}
	for (var i = 0; i < this.movingObjects.length; i++){
		if (this.movingObjects[i].move(this.avatarControll)){
			this.die(false);
			break;
		}
	}


	for (var i = 0; i < this.renderObjects.length; i++){
		this.renderObjects[i].render();
	}


	if (this.avatarControll){
		this.avatarControll.render(this, camera);
	}

	renderer.render(this.scene, camera);

}

BaseLevel.prototype.onRender = function(camera){

}

BaseLevel.prototype.onKeyDown = function(e){
	if (this.avatarControll){
		this.avatarControll.onKeyDown(e);
	}
}

BaseLevel.prototype.onKeyUp = function(e){
	if (this.avatarControll){
		this.avatarControll.onKeyUp(e);
	}
}

BaseLevel.prototype.die = function(showDie){
	if (this.playing){
		this.playing = false;
		this.finish();
		getSound('die').play();
		if (showDie){
			this.showDie();
		}else{
			window.setTimeout(this.init.bind(this), 7000);
		}
	}
}

BaseLevel.prototype.showDie = function(){
	document.getElementById('game-over').style.display = 'block'
	window.setTimeout(this.init.bind(this), 7000);
}

BaseLevel.prototype.addSolidObject = function(object){
	this.scene.add(object);
	this.avatarControll.solidObjects.push(object);
}

BaseLevel.prototype.addMovingObject = function(object){
	this.movingObjects.push(object);
	this.addSolidObject(object.object);
}

BaseLevel.prototype.addRenderObject = function(object){
	//this.scene.add(object)
	this.renderObjects.push(object);
}