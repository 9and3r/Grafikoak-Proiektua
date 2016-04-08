var coin;

function showLoading(){
	//var texture = new THREE.TextureLoader().load('wall.jpg');
	//var material = new THREE.MeshLambertMaterial({map:texture});
	material =  new THREE.MeshLambertMaterial({color: 0x55B663});
	coin = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 10), material);
	//coin.receiveShadow = true;
	camera.position.set(0,100,0);
	coin.position.x = 0;
	coin.position.y = 0;
	coin.position.z = 0;
	scene.add(coin);

	var light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
	scene.add( light );
}

function onRenderLoader(){
	camera.lookAt(coin);
}