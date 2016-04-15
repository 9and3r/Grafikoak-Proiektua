BaseLevel = function(number, name){
	this.number = number;
	this.name = name;
	this.scene = null;
	this.avatarControll = null;
	this.ready = false;
	this.playing = false;
	this.movingObjects = [];
}

BaseLevel.prototype.init = function(){
	this.scene = new THREE.Scene({ antialias: true });
	document.getElementById('game-over').style.display = 'none'
	this.onInit();
	getSound('warp').play();
	this.ready = true;
	this.playing = true;
}

BaseLevel.prototype.onInit = function(){

}

BaseLevel.prototype.render = function(renderer, camera){
	this.onRender();
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
	renderer.render(this.scene, camera);
}

BaseLevel.prototype.onRender = function(){

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
		getSound('die').play();
		if (showDie){
			this.showDie();
		}else{
			window.setTimeout(this.init.bind(this), 8000);
		}
	}
}

BaseLevel.prototype.showDie = function(){
	document.getElementById('game-over').style.display = 'block'
	window.setTimeout(this.init.bind(this), 8000);
}

BaseLevel.prototype.addSolidObject = function(object){
	this.scene.add(object);
	this.avatarControll.solidObjects.push(object);
}

BaseLevel.prototype.addMovingObject = function(object){
	this.movingObjects.push(object);
	this.addSolidObject(object.object);
}