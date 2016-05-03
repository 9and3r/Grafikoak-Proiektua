

// Cargadores
var modelLoader;
var textureLoader;

// Texturas
var texturesPaths = ['rock/rock_COLOR.png', 'rock/rock_NRM.png', 'rock/rock_OCC.png', // 0, 1, 2
					 'sky.jpg', // 3
					 'grass.png', // 4
					 'tierra.png', // 5
					 'tree.png', // 6
					 'bush.png', // 7
					 'lava.jpg', // 8
					 'lava/lava_COLOR.png', 'lava/lava_NRM.png', 'lava/lava_OCC.png' // 9, 10, 11
					  ]; 
var textures = [];
var texturesNames = {};
var loadedTextures = 0;


// Materiales
var materials = [];
var materialsNames = {'invisible': 0, 'rock': 1, 'proba': 2, 'grass': 3, 'tierra': 4, 'lava': 5, 'lava-rock': 6};


// Modelos
var modelsPaths = ['Drake/drake.json'];
var modelNames = {'nathan':0}
var models = [];
var loadedModels = 0;

// Musica
var soundsPath = ['pyramid.mp3', 'die.mp3', 'warp.mp3', 'finish.mp3', 'uncharted.mp3', 'uncharted-sink.mp3'];
var soundNames = {'pyramid':0, 'die':1, 'warp':2, 'finish': 3, 'uncharted': 4, 'uncharted-sink': 5};
var sounds = [];
var loadedSounds = 0;

// Objects
var objects = [];
var objectsNames = {'tree': 0, 'bush': 1};

// Font
var font;

function getObject(name){
	return objects[objectsNames[name]].clone();
}

function getModel(name){
	return models[modelNames[name]].clone();
}

function getSound(name){
	return sounds[soundNames[name]];
}

function getMaterial(name){
	return materials[materialsNames[name]]
}

function getTexture(name){
	return textures[texturesNames[name]]
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
	var fontLoader = new THREE.FontLoader();
	fontLoader.load('libs/besteak/font.js', onFontLoaded);
}

function checkLoaded(){
	if (loadedTextures == texturesPaths.length && loadedModels == modelsPaths.length && loadedSounds == soundsPath.length && font){
		createBaseObjects();
		// Todo esta cargado. Empezar el juego!
		onGameLoaded();
	}
}

function loadModel(src, i){
	modelLoader.load('recursos/' + src, onModelLoaded.bind(null, i));
}

function onFontLoaded(loadedFont){
	font = loadedFont;
	checkLoaded();
}

function onModelLoaded(i, geometry, materials){
	models[i] = new THREE.Mesh( geometry, new THREE.MultiMaterial( materials ) );;
	loadedModels++;
	checkLoaded();
}

function loadTexture(src, i){
	textureLoader.load('recursos/imagenes/' + src, onTextureLoaded.bind(undefined, i));
}

function onTextureLoaded(i, texture){
	textures[i] = texture;
	loadedTextures++;
	checkLoaded();
}

function loadSound(src, i){
	sounds[i] = new Audio('recursos/audio/' + src);
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

	// Sky material
	var planeMaterial = new THREE.MeshPhongMaterial({map:textures[3], specular: 0x111111});
	materials.push(planeMaterial);

	// Grass material
	textures[4].wrapS = THREE.RepeatWrapping;
	textures[4].wrapT = THREE.RepeatWrapping;
	textures[4].repeat.set(50, 50);
	var planeMaterial = new THREE.MeshPhongMaterial({map:textures[4]});
	materials.push(planeMaterial);


	// Material tierra
	textures[5].wrapS = THREE.RepeatWrapping;
	textures[5].wrapT = THREE.RepeatWrapping;
	textures[5].repeat.set(5, 15);
	var planeMaterial = new THREE.MeshPhongMaterial({map:textures[5], specular: 0x111111});
	materials.push(planeMaterial);

	// Material lava
	textures[8].wrapS = THREE.RepeatWrapping;
	textures[8].wrapT = THREE.RepeatWrapping;
	textures[8].repeat.set(20, 20);
	var planeMaterial = new THREE.MeshPhongMaterial({map:textures[8], specular: 0x111111});
	materials.push(planeMaterial);

	// Fake tree
	var material = new THREE.SpriteMaterial({ map : textures[6] });
	var tree = new THREE.Sprite(material);
	tree.scale.set(128, 140, 1);
	tree.position.y = 0;
	objects.push(tree);

	// Fake bush
	var material = new THREE.SpriteMaterial({ map : textures[7] });
	var object = new THREE.Sprite(material);
	object.scale.set(80, 30, 1);
	objects.push(object);

	// Rock material
	var planeMaterial = new THREE.MeshPhongMaterial({map:textures[9], specular: 0x111111});
	planeMaterial.normalMap = textures[10];
	planeMaterial.bumpMap = textures[11];
	materials.push(planeMaterial);
}

