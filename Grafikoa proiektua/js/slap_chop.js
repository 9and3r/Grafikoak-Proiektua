SlapChop = function(level, x, y, z){
	var geometry = new THREE.CylinderGeometry(100, 120, 160, 32);
	var cylinder = new THREE.Mesh(geometry, getMaterial('slapchop'));
	cylinder.position.z = z;
	cylinder.position.y = y;
	cylinder.position.x = x;
	level.addSolidObject(cylinder);

	var geometryBlade = new THREE.CylinderGeometry(110, 110, 60, 32);
	var cylinderBlade = new THREE.Mesh(geometryBlade, new THREE.MeshStandardMaterial({color: '#FFFFFF', roughness: 0.5, metalness: 0.5}));
	cylinderBlade.position.z = z;
	cylinderBlade.position.y = y-100;
	cylinderBlade.position.x = x;

	var platBlade = new MobilePlatform(cylinderBlade, cylinderBlade.position.y, 50, 1, 2, 2000);
	level.addMovingObject(platBlade);

	var geometry2 = new THREE.CylinderGeometry(60, 100, 60, 32);
	var cylinder2 = new THREE.Mesh(geometry2, new THREE.MeshPhongMaterial({color: 'black'}));
	cylinder2.position.z = cylinder.position.z;
	cylinder2.position.y = cylinder.position.y + (geometry.parameters.height/2) + (geometry2.parameters.height/2);
	cylinder2.position.x = x;
	level.addSolidObject(cylinder2);

	var geometry3 = new THREE.CylinderGeometry(10, 60, 60, 32);
	var cylinder3 = new THREE.Mesh(geometry3, new THREE.MeshPhongMaterial({color: 'black'}));
	cylinder3.position.z = cylinder.position.z;
	cylinder3.position.y = cylinder2.position.y + (geometry2.parameters.height/2) + (geometry3.parameters.height/2) + 10;
	cylinder3.position.x = x;



	var geometry4 = new THREE.SphereBufferGeometry(50, 8, 6, 0, 2*Math.PI, 0, 0.5 * Math.PI);
	var cylinder4 = new THREE.Mesh(geometry4, new THREE.MeshPhongMaterial({color: 'black'}));
	cylinder4.position.z = cylinder.position.z;
	cylinder4.position.y = cylinder3.position.y + 10;
	cylinder4.position.x = x;
	cylinder4.material.side = THREE.DoubleSide;

	var plat = new MobilePlatform(cylinder4, cylinder3.position.y - 40, 50, 1, 2, 2000);
	level.addMovingObject(plat);

	var geometry5 = new THREE.CylinderGeometry(10, 10, 100, 16);
	var cylinder5 = new THREE.Mesh(geometry5, new THREE.MeshStandardMaterial({color: '#FFFFFF', roughness: 0.5, metalness: 0.5}));
	cylinder5.position.z = cylinder.position.z;
	cylinder5.position.y = cylinder3.position.y + 10;
	cylinder5.position.x = x;

	var plat = new MobilePlatform(cylinder5, cylinder3.position.y -40, 50, 1, 2, 2000);
	level.addMovingObject(plat);
}