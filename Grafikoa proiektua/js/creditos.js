function LevelCreditos(){
	BaseLevel.call(this, 1, 'Level 1', getSound('uncharted'));
}

LevelCreditos.prototype = Object.create(BaseLevel.prototype);
LevelCreditos.prototype.constructor = LevelCreditos;

LevelCreditos.prototype.init = function(){
	this.initScene();
	//this.initAvatarAndSpawn();
	this.initMusic();
	this.onInit();

	this.ready = true;
	this.playing = false;
}

LevelCreditos.prototype.onInit = function(){
	// Ambient light
	var light = new THREE.AmbientLight( 0xFFFFFF );
	this.scene.add(light);

	this.creditsText = new THREE.Object3D();

	var texts = ["kaixo", "Proba 2"];

	var material = getMaterial('rock')
	for (var i=0; i<texts.length; i++){
		var textGeometry = new THREE.TextGeometry(texts[i], {font: font, size: 10, height: 5});
		var mesh = new THREE.Mesh(textGeometry, material);
		mesh.position.y = -15 * i;
		this.creditsText.add(mesh);
	}

	

	this.creditsText.position.z = 0;
	this.scene.add(this.creditsText);
}

LevelCreditos.prototype.onRender = function(camera){
	//camera.lookAt(this.creditsText);
	this.creditsText.position.y += 0.1;
	camera.position.z = 100;
}



