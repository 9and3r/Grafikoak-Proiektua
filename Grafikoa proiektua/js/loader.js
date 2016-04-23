// Cargadores
var modelLoader;
var textureLoader;

// Texturas
var texturesPaths = ['images/rock/rock_COLOR.png', 'images/rock/rock_NRM.png', 'images/rock/rock_OCC.png',
					 'images/sky.jpg',
					 'images/neon/neon_COLOR.png', 'images/neon/neon_NRM.png', 'images/neon/neon_OCC.png'];
var textures = [];
var loadedTextures = 0;


// Materiales
var materials = [];
var materialsNames = {'invisible': 0, 'rock': 1};


// Modelos
var modelsPaths = ['Drake/drake.json', 'respawn/respawn.json'];
var modelNames = {'nathan':0, 'respawn': 1}
var models = [];
var loadedModels = 0;

// Musica
var soundsPath = ['music/pyramid.mp3', 'music/die.mp3', 'music/warp.mp3', 'music/finish.mp3'];
var soundNames = {'pyramid':0, 'die':1, 'warp':2, 'finish': 3};
var sounds = [];
var loadedSounds = 0;


function getModel(name){
	return models[modelNames[name]].clone();
}

function getSound(name){
	return sounds[soundNames[name]];
}

function getMaterial(name){
	return materials[materialsNames[name]]
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

	// Material invisible
	var invisibleMaterial = new THREE.MeshBasicMaterial();
	invisibleMaterial.visible = false;
	materials.push(invisibleMaterial);

	// Rock material
	var planeMaterial = new THREE.MeshPhongMaterial({map:textures[0], specular: 0x111111});
	planeMaterial.normalMap = textures[1];
	planeMaterial.bumpMap = textures[2];
	materials.push(planeMaterial);
}

