

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
					 'lava/lava_COLOR.png', 'lava/lava_NRM.png', 'lava/lava_OCC.png', // 9, 10, 11
					 'slapchop/slapchop.png', // 12
					  ]; 
var textures = [];
var loadedTextures = 0;


// Materiales
var materials = [];
var materialsNames = {'invisible': 0, 'rock': 1, 'sky': 2, 'grass': 3, 'tierra': 4, 'lava-1': 5, 'lava-2': 6, 'lava-3':7, 'lava-rock': 8, 'slapchop': 9};


// Modelos
var modelsPaths = ['Shrek/Shrek.glb', 'harry/scene.gltf'];
var modelNames = {'nathan':0, 'harry': 1}
var models = [];
var loadedModels = 0;

// Musica
var soundsPath = ['pyramid.mp3', 'die.mp3', 'warp.mp3', 'finish.mp3', 'uncharted.mp3', 'uncharted-sink.mp3', 'uncharted-4.mp3', 'shrek_menu.mp3'];
var soundNames = {'pyramid':0, 'die':1, 'warp':2, 'finish': 3, 'uncharted': 4, 'uncharted-sink': 5, 'uncharted-4': 6, 'shrek-1': 7};
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
	return materials[materialsNames[name]].clone();
}

function loadAll(){
	document.getElementById('loading').style.display = 'block'
	modelLoader = new THREE.GLTFLoader();
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
	fontLoader.load('/js/lib/font.js', onFontLoaded);
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

function onModelLoaded(i, scene){
	models[i] = scene.scene.children[0];
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
	var planeMaterial = new THREE.MeshLambertMaterial({map:textures[3]});
	materials.push(planeMaterial);

	// Grass material
	textures[4].wrapS = THREE.RepeatWrapping;
	textures[4].wrapT = THREE.RepeatWrapping;
	var planeMaterial = new THREE.MeshLambertMaterial({map:textures[4]});
	materials.push(planeMaterial);


	// Material tierra
	textures[5].wrapS = THREE.RepeatWrapping;
	textures[5].wrapT = THREE.RepeatWrapping;
	var planeMaterial = new THREE.MeshLambertMaterial({map:textures[5]});
	materials.push(planeMaterial);

	// Material lava
	textures[8].wrapS = THREE.RepeatWrapping;
	textures[8].wrapT = THREE.RepeatWrapping;
	var planeMaterial = new THREE.MeshLambertMaterial({map:textures[8]});
	materials.push(planeMaterial);

	// Material lava 2
	var textureLava2 = textures[8].clone();
	// Despues de clonar es necesario poner la variable a true
	// http://stackoverflow.com/a/16707284
	textureLava2.needsUpdate = true;
	var planeMaterial = new THREE.MeshLambertMaterial({map:textureLava2});
	materials.push(planeMaterial);

	// Material lava 3
	var textureLava2 = textures[8].clone();
	// Despues de clonar es necesario poner la variable a true
	// http://stackoverflow.com/a/16707284
	textureLava2.needsUpdate = true;
	var planeMaterial = new THREE.MeshLambertMaterial({map:textureLava2});
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

	// Rock material
	var planeMaterial = new THREE.MeshPhongMaterial({map:textures[12]});
	materials.push(planeMaterial);
}

