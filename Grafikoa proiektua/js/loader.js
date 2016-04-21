var modelLoader;
var textureLoader;

// Texturas
var texturesPaths = ['images/rock/rock_COLOR.png', 'images/rock/rock_NRM.png', 'images/rock/rock_OCC.png', 'images/sky.jpg'];
var textures = [];
var loadedTextures = 0;


// Modelos
var modelsPaths = ['Drake/drake.json', 'respawn/respawn.json'];
var modelNames = {'nathan':0, 'respawn': 1}
var models = [];
var loadedModels = 0;

// Musica
var soundsPath = ['music/pyramid.mp3', 'music/die.mp3', 'music/warp.mp3'];
var soundNames = {'pyramid':0, 'die':1, 'warp':2};
var sounds = [];
var loadedSounds = 0;



var baseObjects = {};

function getModel(name){
	return models[modelNames[name]].clone();
}

function getObject(name){
	return new THREE.Mesh(baseObjects[name].geometry, baseObjects[name].material.clone(), 0);
}

function getSound(name){
	return sounds[soundNames[name]];
}

function loadAll(){
	document.getElementById('loading').style.display = 'block'
	modelLoader = new THREE.JSONLoader();
	textureLoader = new THREE.TextureLoader();
	for (i=0; i<texturesPaths.length; i++){
		loadTexture(texturesPaths[i], i);
	}
	for(i=0; i<modelsPaths.length; i++){
		loadModel(modelsPaths[i], i);
	}
	for(i=0; i<soundsPath.length; i++){
		loadSound(soundsPath[i], i);
	}
}

function checkLoaded(){
	//console.log(loadedTextures)
	if (loadedTextures == texturesPaths.length && loadedModels == modelsPaths.length && loadedSounds == soundsPath.length){
		createBaseObjects();
		// Todo esta cargado. Empezar el juego!
		onGameLoaded();
	}
}

function loadModel(src, i){
	modelLoader.load(src, onModelLoaded.bind(null, i));
}

function onModelLoaded(i, geometry, materials){
	models[i] = new THREE.Mesh( geometry, new THREE.MultiMaterial( materials ) );;
	loadedModels++;
	checkLoaded();
}

function loadTexture(src, i){
	textureLoader.load(src, onTextureLoaded.bind(undefined, i));
}

function onTextureLoaded(i, texture){
	textures[i] = texture;
	loadedTextures++;
	checkLoaded();
}

function loadSound(src, i){
	sounds[i] = new Audio(src);
	sounds[i].load();
	sounds[i].oncanplaythrough = onSoundLoaded;
	
}

function onSoundLoaded(){
	loadedSounds++;
	checkLoaded();
}

function createBaseObjects(){
	var texture = textures[0];
	//texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	//texture.repeat.set( 10, 10 );

	var planeGeometry = new THREE.BoxGeometry(200, 850, 1);
	var planeMaterial = new THREE.MeshPhongMaterial({map:texture, specular: 0x111111});
	planeMaterial.normalMap = textures[1];
	planeMaterial.bumpMap = textures[2];
	//planeMaterial.bumpScale = 100;
	//planeMaterial.normalScale = 3;


	var plane = new THREE.Mesh(new THREE.BoxGeometry(10, 550, 500), planeMaterial, 0);
	plane.receiveShadow = true;
	baseObjects['wall'] = plane;

	var plane = new THREE.Mesh(new THREE.BoxGeometry(250, 250, 200), planeMaterial, 0);
	plane.rotation.z = 0.5 * Math.PI;
	plane.receiveShadow = true;
	baseObjects['floor'] = plane;

	var plane = new THREE.Mesh(new THREE.BoxGeometry(80, 250, 80), planeMaterial, 0);
	plane.receiveShadow = true;
	baseObjects['platform-h'] = plane;

	var plane = new THREE.Mesh(new THREE.BoxGeometry(250, 250, 40), planeMaterial, 0);
	plane.receiveShadow = true;
	baseObjects['platform-v'] = plane;

	console.log(textures[2])
	var skyMaterial = new THREE.MeshPhongMaterial({map:textures[3], specular: 0x111111});
	var plane = new THREE.Mesh(new THREE.BoxGeometry(1000, 1000, 0), skyMaterial, 0);
	plane.receiveShadow = true;
	baseObjects['sky'] = plane;
}

