var modelLoader;
var textureLoader;

// Texturas
var texturesPaths = ['wall.jpg'];
var textures = [];
var loadedTextures = 0;


// Modelos
var modelsPaths = ['Drake/drake'];
var modelNames = {'nathan':0}
var models = [];
var loadedModels = 0;

// Musica
var soundsPath = ['music/pyramid.mp3'];
var soundNames = {'pyramid':0};
var sounds = [];
var loadedSounds = 0;



var baseObjects = {};

function getModel(name){
	return models[modelNames[name]].clone();
}

function getObject(name){
	return new THREE.Mesh(baseObjects[name].geometry, baseObjects[name].material, 0);
}

function getSound(name){
	return sounds[soundNames[name]];
}

function loadAll(){
	modelLoader = new THREE.OBJMTLLoader();
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
	modelLoader.load(src+'.obj', src+'.mtl', onModelLoaded.bind(null, i));
}

function onModelLoaded(i, object){
	models[i] = object;
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
	console.log("Song loaded");
	loadedSounds++;
	checkLoaded();
}

function createBaseObjects(){
	var texture = textures[0];
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 10, 10 );

	var planeGeometry = new THREE.BoxGeometry(200, 850, 1);
	var planeMaterial = new THREE.MeshLambertMaterial({map:texture});


	var plane = new THREE.Mesh(new THREE.BoxGeometry(10, 250, 500), planeMaterial, 0);
	plane.receiveShadow = true;
	baseObjects['wall'] = plane;
}

