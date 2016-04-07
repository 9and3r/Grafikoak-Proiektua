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

var baseObjects = {};

function getModel(name){
	return models[modelNames[name]].clone();
}

function getObject(name){
	return new THREE.Mesh(baseObjects[name].geometry, baseObjects[name].material, 0);
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
}

function checkLoaded(){
	//console.log(loadedTextures)
	if (loadedTextures == texturesPaths.length && loadedModels == modelsPaths.length){
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
	console.log("Textura kargatzen")
	textureLoader.load(src, onTextureLoaded.bind(undefined, i));
}

function onTextureLoaded(i, texture){
	console.log("On texture loaded")
	console.log(i)
	console.log(texture)
	textures[i] = texture;
	loadedTextures++;
	checkLoaded();
}

function createBaseObjects(){
	var texture = textures[0];
	console.log(texture)
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 10, 10 );
	var planeGeometry = new THREE.BoxGeometry(200, 850, 1);
	var planeMaterial = new THREE.MeshLambertMaterial({map:texture});


	var plane = new THREE.Mesh(new THREE.BoxGeometry(10, 250, 500), planeMaterial, 0);
	plane.receiveShadow = true;
	baseObjects['wall'] = plane;
}