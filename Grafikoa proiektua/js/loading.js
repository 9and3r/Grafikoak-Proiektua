var coin;

function showLoading(){
	
	var light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
	scene.add(light);

	//var texture = new THREE.TextureLoader().load('images/ring/ring_COLOR.png');
	//var normal = new THREE.TextureLoader().load('images/ring/coin_NRM.png');
	//var bump = new THREE.TextureLoader().load('images/ring/coin_OCC.png');
	//var material = new THREE.MeshLambertMaterial({map:texture, specular: 0x111111});
	
	//material.normalMap = normal;
	//material.bumpMap = bump;


	//material =  new THREE.LineBasicMaterial({color: 0xFF0000});
	//coinGeometry = new THREE.TorusGeometry( 10, 3, 16, 100 );(0, 20, 20);
	//coin = new THREE.Mesh(coinGeometry, material);

	var loader = new THREE.STLLoader();
	loader.load( 'Uncharted_Ring.stl', function ( geometry ) {
		console.log(geometry);
		coin = new THREE.Mesh( geometry );
     	scene.add( coin );
 	});

	//coin.receiveShadow = true;
	camera.position.x = 0;
	camera.position.y = 10;
	camera.position.z = -100;
	

	var light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
	light.position.y = 45;
	scene.add( light );
	camera.lookAt(new THREE.Vector3(0,0,0));
}

function onRenderLoader(){
	//camera.lookAt(coin);
	if (coin){
		coin.rotation.y += 0.01;
	}
	
}